from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.storage_service import upload_travel_photo

router = APIRouter(prefix="/uploads", tags=["Uploads"])

@router.post("")
async def upload_file(file: UploadFile = File(...)):
    # Validate file format
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid image type. Please upload JPEG, PNG, or WEBP.")
        
    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024: # 10MB limit
        raise HTTPException(status_code=400, detail="Image size exceeds 10MB limit.")
        
    url = upload_travel_photo(contents, file.filename, file.content_type)
    return {"url": url, "filename": file.filename}
