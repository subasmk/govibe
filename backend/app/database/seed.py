import json
from app.database.session import SessionLocal, engine, Base
from app.models.models import (
    User, Destination, Place, Post, Comment, SafetyReport, Question, Answer, TripGroup, Notification
)

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if already seeded
    if db.query(Destination).first():
        print("Database already contains records. Skipping seed.")
        db.close()
        return

    print("Seeding GoVIBE database with South India destination communities...")

    # 1. Users
    users_data = [
        User(
            id="user_1",
            name="Rahul Sundaram",
            handle="@rahul_travels",
            email="rahul@govibe.travel",
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
            bio="Solo trekker & photography enthusiast. Explored 40+ hill stations in South India.",
            badge="Top Contributor",
            points=1420,
            helpful_votes=384
        ),
        User(
            id="user_2",
            name="Ananya Sharma",
            handle="@ananya_explores",
            email="ananya@govibe.travel",
            avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
            bio="Family traveller & food lover. Focusing on child-friendly and peaceful getaways.",
            badge="Helpful Traveller",
            points=980,
            helpful_votes=215
        ),
        User(
            id="user_3",
            name="Vikram Karthik",
            handle="@vikram_k",
            email="vikram@govibe.travel",
            avatar="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
            bio="Local guide & wildlife spotter based in Nilgiris. Sharing real-time route updates.",
            badge="Local Guide",
            points=2150,
            helpful_votes=612
        ),
        User(
            id="user_4",
            name="Meera Nair",
            handle="@meera_wanderer",
            email="meera@govibe.travel",
            avatar="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
            bio="Budget backpacker exploring offbeat trails and scenic viewpoints across India.",
            badge="Explorer",
            points=750,
            helpful_votes=140
        ),
        User(
            id="user_5",
            name="Karthik Raja",
            handle="@karthik_r",
            email="karthik@govibe.travel",
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
            bio="Road trip fanatic and tea connoisseur.",
            badge="Community Contributor",
            points=620,
            helpful_votes=98
        )
    ]
    db.add_all(users_data)
    db.commit()

    # 2. Destinations
    dest_ooty = Destination(
        id="ooty",
        name="Ooty (Udhagamandalam)",
        state="Tamil Nadu",
        tagline="Queen of Nilgiri Hill Stations",
        cover_image="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
        description="Nestled in the Nilgiri hills, Ooty offers mist-clad valleys, lush tea estates, colonial architecture, and serene lakes.",
        trust_score=92,
        trust_breakdown={"recentExperiences": 95, "communityVotes": 90, "ratings": 94, "activeContributors": 88},
        rating=4.6,
        total_ratings=1840,
        members_count=14200,
        active_now=42,
        categories=["Nature", "Family", "Photography", "Romantic", "Tea Gardens"],
        lat=11.4102,
        lng=76.6950
    )
    dest_coorg = Destination(
        id="coorg",
        name="Coorg (Kodagu)",
        state="Karnataka",
        tagline="Scotland of India & Coffee Capital",
        cover_image="https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
        description="Famous for its aromatic coffee plantations, cascading waterfalls, and misty Western Ghats viewpoints.",
        trust_score=89,
        trust_breakdown={"recentExperiences": 91, "communityVotes": 87, "ratings": 90, "activeContributors": 86},
        rating=4.7,
        total_ratings=1420,
        members_count=10800,
        active_now=28,
        categories=["Nature", "Adventure", "Coffee", "Trekking", "Budget"],
        lat=12.3375,
        lng=75.8069
    )
    dest_munnar = Destination(
        id="munnar",
        name="Munnar",
        state="Kerala",
        tagline="Emerald Tea Terraces of God's Own Country",
        cover_image="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
        description="Sprawling tea plantations, rolling hills, endangered Nilgiri Tahr sightings, and refreshing mountain waterfalls.",
        trust_score=94,
        trust_breakdown={"recentExperiences": 96, "communityVotes": 93, "ratings": 95, "activeContributors": 91},
        rating=4.8,
        total_ratings=2150,
        members_count=16500,
        active_now=53,
        categories=["Nature", "Tea Gardens", "Photography", "Adventure", "Family"],
        lat=10.0889,
        lng=77.0595
    )
    dest_kodai = Destination(
        id="kodaikanal",
        name="Kodaikanal",
        state="Tamil Nadu",
        tagline="Princess of Hill Stations",
        cover_image="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
        description="Known for its star-shaped lake, dramatic granite cliffs, forested valleys, and cool mountain breezes.",
        trust_score=88,
        trust_breakdown={"recentExperiences": 86, "communityVotes": 89, "ratings": 91, "activeContributors": 84},
        rating=4.5,
        total_ratings=1210,
        members_count=8900,
        active_now=19,
        categories=["Nature", "Romantic", "Photography", "Family"],
        lat=10.2381,
        lng=77.4892
    )
    db.add_all([dest_ooty, dest_coorg, dest_munnar, dest_kodai])
    db.commit()

    # 3. Places
    places_data = [
        Place(
            id="place_ooty_1",
            destination_id="ooty",
            name="Avalanche Lake",
            category="Nature & Lakes",
            location="26 km from Ooty Town",
            lat=11.2995,
            lng=76.5925,
            rating=4.8,
            recent_rating=4.9,
            total_ratings=428,
            trust_score=95,
            status="green",
            status_text="Highly Recommended",
            cover_image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            gallery=["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
            description="An untouched, pristine lake surrounded by thick pine and shola forests with rolling hills and blooming flowers. Requires forest department safari bus or permit to enter.",
            timings="9:00 AM - 3:00 PM",
            entry_fee="₹300/person (Forest Eco-Safari Bus)",
            current_crowd="Low",
            best_time_to_visit="Early Morning (9:00 AM - 11:00 AM)",
            family_suitability=96,
            accessibility="Moderate (Forest bus bumpy ride)",
            safety_observations="Road past Emerald village has minor gravel patches; safe for all cars.",
            recent_experiences_count=84,
            latest_report="Clear skies and calm waters today. Eco safari running on time."
        ),
        Place(
            id="place_ooty_2",
            destination_id="ooty",
            name="Doddabetta Peak",
            category="Viewpoints & Mountains",
            location="9 km from Ooty Bus Stand",
            lat=11.4011,
            lng=76.7360,
            rating=4.3,
            recent_rating=3.9,
            total_ratings=812,
            trust_score=78,
            status="yellow",
            status_text="Mixed Experiences (Heavy Afternoon Fog & Parking Delays)",
            cover_image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
            gallery=["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"],
            description="The highest peak in the Nilgiri Hills at 2,637 meters. Offers panoramic views of the valley and surrounding hills with a telescope house at the top.",
            timings="7:00 AM - 6:00 PM",
            entry_fee="₹10/person",
            current_crowd="High",
            best_time_to_visit="7:30 AM - 9:00 AM before fog sets in",
            family_suitability=82,
            accessibility="Good",
            safety_observations="Narrow ascent road gets congested on weekends. Expect 30-45 mins parking queue after 11 AM.",
            recent_experiences_count=128,
            latest_report="Dense mist after 1:00 PM reduced visibility. Visit early morning."
        ),
        Place(
            id="place_ooty_3",
            destination_id="ooty",
            name="Pykara Waterfalls & Lake",
            category="Waterfalls & Boating",
            location="21 km from Ooty on Mysore Road",
            lat=11.4589,
            lng=76.6022,
            rating=4.6,
            recent_rating=4.7,
            total_ratings=630,
            trust_score=91,
            status="green",
            status_text="Highly Recommended",
            cover_image="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
            gallery=["https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80"],
            description="Pykara river flows through a series of cascades and drops into scenic falls. The nearby Pykara boat club offers exhilarating speed boat rides.",
            timings="8:30 AM - 5:30 PM",
            entry_fee="₹10 entry, ₹850 Speedboat",
            current_crowd="Moderate",
            best_time_to_visit="10:00 AM - 1:00 PM",
            family_suitability=90,
            accessibility="Moderate",
            safety_observations="Waterfall rocks are slippery; stay behind safety railings.",
            recent_experiences_count=96,
            latest_report="Speed boating operational. Water levels good and clear."
        ),
        Place(
            id="place_ooty_4",
            destination_id="ooty",
            name="Government Botanical Garden",
            category="Parks & Gardens",
            location="Vannarapettai, Ooty Town",
            lat=11.4172,
            lng=76.7118,
            rating=4.5,
            recent_rating=4.6,
            total_ratings=1120,
            trust_score=93,
            status="blue",
            status_text="Popular & Family Friendly",
            cover_image="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
            gallery=["https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"],
            description="Spread over 55 hectares on the lower slopes of Doddabetta peak, featuring over 1,000 species of exotic flora, a fossil tree trunk, and Italian gardens.",
            timings="7:00 AM - 6:30 PM",
            entry_fee="₹40 adults, ₹20 kids",
            current_crowd="Moderate",
            best_time_to_visit="8:00 AM - 11:00 AM",
            family_suitability=98,
            accessibility="Excellent",
            safety_observations="Clean and safe.",
            recent_experiences_count=142,
            latest_report="Glass house roses and orchids in full bloom."
        ),
        Place(
            id="place_ooty_5",
            destination_id="ooty",
            name="Glenmorgan Tea Estate & Lake",
            category="Offbeat & Tea Trails",
            location="25 km northwest of Ooty",
            lat=11.4720,
            lng=76.6200,
            rating=4.7,
            recent_rating=4.8,
            total_ratings=180,
            trust_score=92,
            status="green",
            status_text="Hidden Gem - Peaceful",
            cover_image="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
            gallery=["https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"],
            description="One of the oldest tea estates in Ooty offering untouched tea garden vistas, a secluded lake reservoir, and ropeway viewpoints.",
            timings="9:00 AM - 5:00 PM",
            entry_fee="Free",
            current_crowd="Low",
            best_time_to_visit="10:00 AM - 3:00 PM",
            family_suitability=92,
            accessibility="Moderate",
            safety_observations="Peaceful route.",
            recent_experiences_count=32,
            latest_report="Zero commercial crowd, pure tranquility."
        )
    ]
    db.add_all(places_data)
    db.commit()

    # 4. Posts
    post1 = Post(
        id="post_1",
        destination_id="ooty",
        place_id="place_ooty_1",
        user_id="user_1",
        visited_timestamp="Visited 2 days ago",
        visit_date="Aug 13, 2026",
        rating=5.0,
        crowd_level="Low",
        content="Visited Avalanche Lake early in the morning around 9:15 AM on the first forest department safari bus. The water was like a mirror reflecting the pine trees and blue sky. Almost no crowd at that hour! Make sure to take your jackets as the morning breeze is very chilly.",
        images=["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"],
        upvotes=42,
        tags=["Nature", "Peaceful", "Photography", "MorningVibe"]
    )
    post2 = Post(
        id="post_2",
        destination_id="ooty",
        place_id="place_ooty_2",
        user_id="user_3",
        visited_timestamp="Visited 4 hours ago",
        visit_date="Aug 15, 2026",
        rating=3.5,
        crowd_level="High",
        content="Caution for travellers heading up Doddabetta today: Heavy monsoon mist rolled in around 11:30 AM, so visibility from the telescope house dropped to under 50 meters. Parking line reached 600m down the hill. If you are coming, plan for 7:30 AM tomorrow instead.",
        images=["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"],
        upvotes=68,
        tags=["LiveUpdate", "WeatherAlert", "CrowdWarning"]
    )
    db.add_all([post1, post2])
    db.commit()

    # 5. Safety Reports
    db.add(SafetyReport(
        id="safety_1",
        destination_id="ooty",
        place_name="Avalanche Forest Checkpost Road",
        category="Road condition",
        severity="warning",
        title="Culvert repair work near Emerald Village detour",
        description="Temporary single-lane detour on the road to Avalanche near Emerald junction due to bridge maintenance. Expect 10-15 minute stop-and-go delays for four-wheelers.",
        reported_by="Vikram Karthik (Local Guide)",
        reported_timestamp="Reported 2 hours ago",
        verified_count=19,
        status="Active"
    ))
    db.commit()

    # 6. Trip Groups
    db.add(TripGroup(
        id="group_1",
        destination_id="ooty",
        destination_name="Ooty",
        title="Ooty Monsoon Tea & Forest Trek",
        dates="Aug 22 – Aug 24, 2026",
        budget="₹4,200 / person",
        members_count=4,
        max_members=6,
        organizer={"name": "Rahul Sundaram", "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"},
        members=[{"name": "Rahul S."}, {"name": "Karthik R."}, {"name": "Priya P."}, {"name": "Vikram K."}],
        interests=["Nature", "Trekking", "Photography", "Offbeat"],
        description="Planning a 3-day weekend exploring Avalanche forest trails, Pykara sunrise boating, and tea factory tasting. Sharing cab rental and homestay costs.",
        status="Open"
    ))
    db.commit()

    print("Seed complete! Initial database is populated.")
    db.close()

if __name__ == "__main__":
    seed_database()
