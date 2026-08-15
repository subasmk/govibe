import os
import uuid
from app.config import settings

def upload_travel_photo(file_bytes: bytes, filename: str, content_type: str) -> str:
    """
    Uploads file to AWS S3 if credentials are set, else stores in local static folder.
    """
    file_ext = filename.split(".")[-1] if "." in filename else "jpg"
    unique_name = f"govibe_{uuid.uuid4().hex[:10]}.{file_ext}"
    
    # Check if AWS S3 is configured
    if settings.AWS_ACCESS_KEY_ID and settings.AWS_SECRET_ACCESS_KEY and settings.AWS_S3_BUCKET:
        try:
            import boto3
            s3 = boto3.client(
                's3',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_REGION
            )
            s3.put_object(
                Bucket=settings.AWS_S3_BUCKET,
                Key=f"posts/{unique_name}",
                Body=file_bytes,
                ContentType=content_type
            )
            return f"https://{settings.AWS_S3_BUCKET}.s3.{settings.AWS_REGION}.amazonaws.com/posts/{unique_name}"
        except Exception as e:
            print(f"[AWS S3 Upload Warning] {e} - falling back to local storage")
            
    # Local uploads fallback
    upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static", "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, unique_name)
    with open(file_path, "wb") as f:
        f.write(file_bytes)
        
    return f"/static/uploads/{unique_name}"
