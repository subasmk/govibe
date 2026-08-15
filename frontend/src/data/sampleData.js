// GoVIBE - Community Travel Dataset
// Sample data with rich, realistic travel experiences, trust scores, safety reports, and trip groups

export const sampleUsers = [
  {
    id: "user_1",
    name: "Rahul Sundaram",
    handle: "@rahul_travels",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    bio: "Solo trekker & photography enthusiast. Explored 40+ hill stations in South India.",
    badge: "Top Contributor",
    points: 1420,
    helpfulVotes: 384,
    placesVisited: 58,
    joinedDate: "Jan 2024"
  },
  {
    id: "user_2",
    name: "Ananya Sharma",
    handle: "@ananya_explores",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    bio: "Family traveller & food lover. Focusing on child-friendly and peaceful getaways.",
    badge: "Helpful Traveller",
    points: 980,
    helpfulVotes: 215,
    placesVisited: 34,
    joinedDate: "Mar 2024"
  },
  {
    id: "user_3",
    name: "Vikram Karthik",
    handle: "@vikram_k",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    bio: "Local guide & wildlife spotter based in Nilgiris. Sharing real-time route updates.",
    badge: "Local Guide",
    points: 2150,
    helpfulVotes: 612,
    placesVisited: 92,
    joinedDate: "Dec 2023"
  },
  {
    id: "user_4",
    name: "Meera Nair",
    handle: "@meera_wanderer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    bio: "Budget backpacker exploring offbeat trails and scenic viewpoints across India.",
    badge: "Explorer",
    points: 750,
    helpfulVotes: 140,
    placesVisited: 26,
    joinedDate: "Apr 2024"
  },
  {
    id: "user_5",
    name: "Karthik Raja",
    handle: "@karthik_r",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    bio: "Road trip fanatic and tea connoisseur.",
    badge: "Community Contributor",
    points: 620,
    helpfulVotes: 98,
    placesVisited: 22,
    joinedDate: "May 2024"
  }
];

export const sampleDestinations = [
  {
    id: "ooty",
    name: "Ooty (Udhagamandalam)",
    state: "Tamil Nadu",
    tagline: "Queen of Nilgiri Hill Stations",
    coverImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    description: "Nestled in the Nilgiri hills, Ooty offers mist-clad valleys, lush tea estates, colonial architecture, and serene lakes.",
    trustScore: 92,
    trustScoreBreakdown: {
      recentExperiences: 95,
      communityVotes: 90,
      ratings: 94,
      activeContributors: 88
    },
    rating: 4.6,
    totalRatings: 1840,
    membersCount: 14200,
    activeNow: 42,
    recentActivityCount: 38,
    categories: ["Nature", "Family", "Photography", "Romantic", "Tea Gardens"],
    coordinates: { lat: 11.4102, lng: 76.6950 },
    highlights: ["Avalanche Lake", "Doddabetta Peak", "Pykara Waterfalls", "Botanical Garden", "Tea Museum"]
  },
  {
    id: "coorg",
    name: "Coorg (Kodagu)",
    state: "Karnataka",
    tagline: "Scotland of India & Coffee Capital",
    coverImage: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
    description: "Famous for its aromatic coffee plantations, cascading waterfalls, and misty Western Ghats viewpoints.",
    trustScore: 89,
    trustScoreBreakdown: {
      recentExperiences: 91,
      communityVotes: 87,
      ratings: 90,
      activeContributors: 86
    },
    rating: 4.7,
    totalRatings: 1420,
    membersCount: 10800,
    activeNow: 28,
    recentActivityCount: 24,
    categories: ["Nature", "Adventure", "Coffee", "Trekking", "Budget"],
    coordinates: { lat: 12.3375, lng: 75.8069 },
    highlights: ["Abbey Falls", "Raja's Seat", "Mandalpatti Peak", "Dubare Elephant Camp"]
  },
  {
    id: "kodaikanal",
    name: "Kodaikanal",
    state: "Tamil Nadu",
    tagline: "Princess of Hill Stations",
    coverImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
    description: "Known for its star-shaped lake, dramatic granite cliffs, forested valleys, and cool mountain breezes.",
    trustScore: 88,
    trustScoreBreakdown: {
      recentExperiences: 86,
      communityVotes: 89,
      ratings: 91,
      activeContributors: 84
    },
    rating: 4.5,
    totalRatings: 1210,
    membersCount: 8900,
    activeNow: 19,
    recentActivityCount: 18,
    categories: ["Nature", "Romantic", "Photography", "Family"],
    coordinates: { lat: 10.2381, lng: 77.4892 },
    highlights: ["Kodai Lake", "Pillar Rocks", "Coaker's Walk", "Pine Forest"]
  },
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    tagline: "Emerald Tea Terraces of God's Own Country",
    coverImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    description: "Sprawling tea plantations, rolling hills, endangered Nilgiri Tahr sightings, and refreshing mountain waterfalls.",
    trustScore: 94,
    trustScoreBreakdown: {
      recentExperiences: 96,
      communityVotes: 93,
      ratings: 95,
      activeContributors: 91
    },
    rating: 4.8,
    totalRatings: 2150,
    membersCount: 16500,
    activeNow: 53,
    recentActivityCount: 45,
    categories: ["Nature", "Tea Gardens", "Photography", "Adventure", "Family"],
    coordinates: { lat: 10.0889, lng: 77.0595 },
    highlights: ["Eravikulam National Park", "Mattupetty Dam", "Top Station", "Tea Gardens"]
  },
  {
    id: "pondicherry",
    name: "Pondicherry",
    state: "Puducherry",
    tagline: "French Colonial Charm & Coastal Serenity",
    coverImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    description: "A coastal union territory blending 18th-century French architecture, serene beaches, bohemian cafes, and Auroville.",
    trustScore: 86,
    trustScoreBreakdown: {
      recentExperiences: 88,
      communityVotes: 85,
      ratings: 87,
      activeContributors: 82
    },
    rating: 4.4,
    totalRatings: 1670,
    membersCount: 11200,
    activeNow: 31,
    recentActivityCount: 22,
    categories: ["Beach", "Culture", "Food", "Heritage", "Budget"],
    coordinates: { lat: 11.9416, lng: 79.8083 },
    highlights: ["Promenade Beach", "White Town", "Auroville", "Paradise Beach"]
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    tagline: "Cultural Gateway of South India",
    coverImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    description: "Vibrant coastal metropolis renowned for historical temples, classical music, Marina beach, and authentic South Indian cuisine.",
    trustScore: 84,
    trustScoreBreakdown: {
      recentExperiences: 85,
      communityVotes: 83,
      ratings: 86,
      activeContributors: 80
    },
    rating: 4.3,
    totalRatings: 2890,
    membersCount: 19400,
    activeNow: 64,
    recentActivityCount: 33,
    categories: ["Culture", "Food", "Heritage", "Beach", "Shopping"],
    coordinates: { lat: 13.0827, lng: 80.2707 },
    highlights: ["Marina Beach", "Kapaleeshwarar Temple", "San Thome Basilica", "Mylapore"]
  }
];

export const samplePlaces = [
  // --- OOTY PLACES ---
  {
    id: "place_ooty_1",
    destinationId: "ooty",
    name: "Avalanche Lake",
    category: "Nature & Lakes",
    location: "26 km from Ooty Town",
    coordinates: { lat: 11.2995, lng: 76.5925 },
    rating: 4.8,
    recentRating: 4.9,
    totalRatings: 428,
    trustScore: 95,
    status: "green", // green = Highly Recommended, yellow = Mixed, red = Concern, blue = Popular
    statusText: "Highly Recommended",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "An untouched, pristine lake surrounded by thick pine and shola forests with rolling hills and blooming flowers. Requires forest department safari bus or permit to enter.",
    timings: "9:00 AM - 3:00 PM (Entry closes at 2:30 PM)",
    entryFee: "₹300/person (Forest Eco-Safari Bus)",
    currentCrowd: "Low",
    bestTimeToVisit: "Early Morning (9:00 AM - 11:00 AM)",
    familySuitability: 96,
    accessibility: "Moderate (Forest bus bumpy ride)",
    safetyObservations: "Road past Emerald village has minor gravel patches; safe for all cars.",
    recentExperiencesCount: 84,
    latestReport: "Clear skies and calm waters today. Eco safari running on time."
  },
  {
    id: "place_ooty_2",
    destinationId: "ooty",
    name: "Doddabetta Peak",
    category: "Viewpoints & Mountains",
    location: "9 km from Ooty Bus Stand",
    coordinates: { lat: 11.4011, lng: 76.7360 },
    rating: 4.3,
    recentRating: 3.9,
    totalRatings: 812,
    trustScore: 78,
    status: "yellow",
    statusText: "Mixed Experiences (Heavy Afternoon Fog & Parking Delays)",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The highest peak in the Nilgiri Hills at 2,637 meters. Offers panoramic views of the valley and surrounding hills with a telescope house at the top.",
    timings: "7:00 AM - 6:00 PM",
    entryFee: "₹10/person, ₹50 for camera",
    currentCrowd: "High",
    bestTimeToVisit: "7:30 AM - 9:00 AM before fog sets in",
    familySuitability: 82,
    accessibility: "Good (Paved road with steps to telescope)",
    safetyObservations: "Narrow ascent road gets congested on weekends. Expect 30-45 mins parking queue after 11 AM.",
    recentExperiencesCount: 128,
    latestReport: "Dense mist after 1:00 PM reduced visibility. Visit early morning."
  },
  {
    id: "place_ooty_3",
    destinationId: "ooty",
    name: "Pykara Waterfalls & Lake",
    category: "Waterfalls & Boating",
    location: "21 km from Ooty on Mysore Road",
    coordinates: { lat: 11.4589, lng: 76.6022 },
    rating: 4.6,
    recentRating: 4.7,
    totalRatings: 630,
    trustScore: 91,
    status: "green",
    statusText: "Highly Recommended",
    coverImage: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Pykara river flows through a series of cascades and drops into scenic falls. The nearby Pykara boat club offers exhilarating speed boat rides.",
    timings: "8:30 AM - 5:30 PM",
    entryFee: "₹10 entry, ₹850 for 8-seater Speedboat",
    currentCrowd: "Moderate",
    bestTimeToVisit: "10:00 AM - 1:00 PM",
    familySuitability: 90,
    accessibility: "Moderate (300m walk/battery car to waterfall)",
    safetyObservations: "Waterfall rocks are slippery; stay behind safety railings.",
    recentExperiencesCount: 96,
    latestReport: "Speed boating operational. Water levels good and clear."
  },
  {
    id: "place_ooty_4",
    destinationId: "ooty",
    name: "Government Botanical Garden",
    category: "Parks & Gardens",
    location: "Vannarapettai, Ooty Town",
    coordinates: { lat: 11.4172, lng: 76.7118 },
    rating: 4.5,
    recentRating: 4.6,
    totalRatings: 1120,
    trustScore: 93,
    status: "blue",
    statusText: "Popular & Family Friendly",
    coverImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Spread over 55 hectares on the lower slopes of Doddabetta peak, featuring over 1,000 species of exotic flora, a fossil tree trunk, and Italian gardens.",
    timings: "7:00 AM - 6:30 PM",
    entryFee: "₹40 adults, ₹20 children",
    currentCrowd: "Moderate",
    bestTimeToVisit: "8:00 AM - 11:00 AM or 3:30 PM - 5:30 PM",
    familySuitability: 98,
    accessibility: "Excellent (Wheelchair friendly paths)",
    safetyObservations: "Clean and very safe. Paid municipal parking across the gate.",
    recentExperiencesCount: 142,
    latestReport: "Glass house roses and orchids in full bloom. Great for kids."
  },
  {
    id: "place_ooty_5",
    destinationId: "ooty",
    name: "Glenmorgan Tea Estate & Lake",
    category: "Offbeat & Tea Trails",
    location: "25 km northwest of Ooty",
    coordinates: { lat: 11.4720, lng: 76.6200 },
    rating: 4.7,
    recentRating: 4.8,
    totalRatings: 180,
    trustScore: 92,
    status: "green",
    statusText: "Hidden Gem - Peaceful",
    coverImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    description: "One of the oldest tea estates in Ooty offering untouched tea garden vistas, a secluded lake reservoir, and ropeway viewpoints.",
    timings: "9:00 AM - 5:00 PM",
    entryFee: "Free entry to viewpoints",
    currentCrowd: "Low",
    bestTimeToVisit: "10:00 AM - 3:00 PM",
    familySuitability: 92,
    accessibility: "Moderate (Winding rural roads)",
    safetyObservations: "Peaceful route, no commercial food stalls, carry your own water.",
    recentExperiencesCount: 32,
    latestReport: "Zero commercial crowd, pure tranquility and crisp mountain air."
  },
  {
    id: "place_ooty_6",
    destinationId: "ooty",
    name: "Ooty Boat House (Ooty Lake)",
    category: "Boating & Leisure",
    location: "1 km from Ooty Railway Station",
    coordinates: { lat: 11.4055, lng: 76.6840 },
    rating: 3.9,
    recentRating: 3.5,
    totalRatings: 940,
    trustScore: 68,
    status: "red",
    statusText: "Recent Community Concerns (Heavy Weeds & Long Boat Wait Times)",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "An artificial lake constructed in 1824 by John Sullivan. Features paddle boats, motor boats, and mini-train rides around the perimeter.",
    timings: "9:00 AM - 6:00 PM",
    entryFee: "₹15 entry, ₹240 for 2-seater pedal boat",
    currentCrowd: "Very High",
    bestTimeToVisit: "Early morning before 10:00 AM",
    familySuitability: 75,
    accessibility: "Good",
    safetyObservations: "Water quality in northern side has algae weed growth; life jackets mandatory. Pykara is currently preferred by travellers.",
    recentExperiencesCount: 110,
    latestReport: "Wait times for pedal boats exceeded 50 minutes yesterday afternoon."
  },

  // --- COORG PLACES ---
  {
    id: "place_coorg_1",
    destinationId: "coorg",
    name: "Abbey Falls",
    category: "Waterfalls",
    location: "8 km from Madikeri",
    coordinates: { lat: 12.4550, lng: 75.7190 },
    rating: 4.6,
    recentRating: 4.7,
    totalRatings: 520,
    trustScore: 90,
    status: "green",
    statusText: "Highly Recommended",
    coverImage: "https://images.unsplash.com/photo-1546587348-d12660c30c50?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1546587348-d12660c30c50?auto=format&fit=crop&w=800&q=80"],
    description: "Cascading waterfall tumbling down amidst spice and coffee estates, viewed from a hanging bridge.",
    timings: "9:00 AM - 5:00 PM",
    entryFee: "₹15/person",
    currentCrowd: "Moderate",
    bestTimeToVisit: "Morning",
    familySuitability: 88,
    accessibility: "200 steps descent",
    safetyObservations: "Steps can be damp; wear grip shoes.",
    recentExperiencesCount: 65,
    latestReport: "Roaring waterfall flow after recent rains."
  },
  {
    id: "place_coorg_2",
    destinationId: "coorg",
    name: "Raja's Seat",
    category: "Viewpoints & Sunset",
    location: "Madikeri Town",
    coordinates: { lat: 12.4200, lng: 75.7380 },
    rating: 4.5,
    recentRating: 4.6,
    totalRatings: 680,
    trustScore: 89,
    status: "blue",
    statusText: "Popular Sunset Spot",
    coverImage: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=800&q=80"],
    description: "Seasonal garden of flowers and artificial fountains offering sweeping panoramic views of the green hills at sunset.",
    timings: "6:00 AM - 8:00 PM",
    entryFee: "₹10 entry",
    currentCrowd: "High at Sunset",
    bestTimeToVisit: "5:00 PM - 6:30 PM",
    familySuitability: 95,
    accessibility: "Wheelchair accessible",
    safetyObservations: "Well maintained with safe railings.",
    recentExperiencesCount: 78,
    latestReport: "Musical fountain show started at 7 PM."
  },

  // --- MUNNAR PLACES ---
  {
    id: "place_munnar_1",
    destinationId: "munnar",
    name: "Eravikulam National Park",
    category: "Wildlife & Trekking",
    location: "15 km from Munnar",
    coordinates: { lat: 10.1500, lng: 77.0800 },
    rating: 4.8,
    recentRating: 4.9,
    totalRatings: 740,
    trustScore: 96,
    status: "green",
    statusText: "Highly Recommended",
    coverImage: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80"],
    description: "Home to the endangered Nilgiri Tahr and the highest peak in South India (Anamudi). Book safari tickets online to skip counter queues.",
    timings: "7:30 AM - 4:00 PM",
    entryFee: "₹200 adults (Eco-safari bus)",
    currentCrowd: "Moderate",
    bestTimeToVisit: "8:00 AM - 10:30 AM",
    familySuitability: 94,
    accessibility: "Safari bus + 1 km paved walking trail",
    safetyObservations: "Online booking recommended to avoid queue.",
    recentExperiencesCount: 92,
    latestReport: "Spotted a herd of 8 Nilgiri Tahrs near the safari terminus."
  },

  // --- PONDICHERRY PLACES ---
  {
    id: "place_pondy_1",
    destinationId: "pondicherry",
    name: "Promenade Beach & White Town",
    category: "Heritage & Beach Walk",
    location: "French Quarter, Puducherry",
    coordinates: { lat: 11.9340, lng: 79.8350 },
    rating: 4.7,
    recentRating: 4.7,
    totalRatings: 1100,
    trustScore: 92,
    status: "blue",
    statusText: "Vibrant Evening Promenade",
    coverImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"],
    description: "1.5 km long scenic beachfront boulevard closed to vehicular traffic in evenings. Lined with colonial heritage cafes and French villas.",
    timings: "Open 24 hours (Vehicle-free 6 PM - 7:30 AM)",
    entryFee: "Free",
    currentCrowd: "Moderate",
    bestTimeToVisit: "6:00 AM - 8:00 AM (Sunrise) or 6:00 PM - 9:00 PM",
    familySuitability: 96,
    accessibility: "Wide paved walking street",
    safetyObservations: "Safe for late evening strolls with police patrols.",
    recentExperiencesCount: 88,
    latestReport: "Pleasant sea breeze and vibrant food stalls along White Town."
  }
];

export const samplePosts = [
  {
    id: "post_1",
    destinationId: "ooty",
    placeId: "place_ooty_1",
    placeName: "Avalanche Lake",
    userId: "user_1",
    userName: "Rahul Sundaram",
    userHandle: "@rahul_travels",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    userBadge: "Top Contributor",
    visitedTimestamp: "Visited 2 days ago",
    visitDate: "Aug 13, 2026",
    createdTimestamp: "2 days ago",
    rating: 5.0,
    crowdLevel: "Low",
    isOutdated: false,
    content: "Visited Avalanche Lake early in the morning around 9:15 AM on the first forest department safari bus. The water was like a mirror reflecting the pine trees and blue sky. Almost no crowd at that hour! Make sure to take your jackets as the morning breeze is very chilly.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80"
    ],
    upvotes: 42,
    downvotes: 1,
    userVoted: "up",
    commentsCount: 6,
    comments: [
      {
        id: "c_1",
        userId: "user_2",
        userName: "Ananya Sharma",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        text: "Did you have to book tickets in advance or is spot booking available at the checkpost?",
        timestamp: "1 day ago",
        upvotes: 8
      },
      {
        id: "c_2",
        userId: "user_1",
        userName: "Rahul Sundaram",
        userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        text: "Spot booking is available right at the Eco-Tourism center! Arrive before 9:30 AM to get the earliest slot without any wait.",
        timestamp: "1 day ago",
        upvotes: 12
      }
    ],
    tags: ["Nature", "Peaceful", "Photography", "MorningVibe"]
  },
  {
    id: "post_2",
    destinationId: "ooty",
    placeId: "place_ooty_2",
    placeName: "Doddabetta Peak",
    userId: "user_3",
    userName: "Vikram Karthik",
    userHandle: "@vikram_k",
    userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    userBadge: "Local Guide",
    visitedTimestamp: "Visited 4 hours ago",
    visitDate: "Aug 15, 2026",
    createdTimestamp: "3 hours ago",
    rating: 3.5,
    crowdLevel: "High",
    isOutdated: false,
    content: "Caution for travellers heading up Doddabetta today: Heavy monsoon mist rolled in around 11:30 AM, so visibility from the telescope house dropped to under 50 meters. Parking line reached 600m down the hill. If you are coming, plan for 7:30 AM tomorrow instead.",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
    ],
    upvotes: 68,
    downvotes: 2,
    userVoted: null,
    commentsCount: 9,
    comments: [
      {
        id: "c_3",
        userId: "user_4",
        userName: "Meera Nair",
        userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
        text: "Thanks for this real-time heads up! We redirected our cab to Botanical Garden instead.",
        timestamp: "2 hours ago",
        upvotes: 14
      }
    ],
    tags: ["LiveUpdate", "WeatherAlert", "CrowdWarning"]
  },
  {
    id: "post_3",
    destinationId: "ooty",
    placeId: "place_ooty_3",
    placeName: "Pykara Waterfalls & Lake",
    userId: "user_2",
    userName: "Ananya Sharma",
    userHandle: "@ananya_explores",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    userBadge: "Helpful Traveller",
    visitedTimestamp: "Visited yesterday",
    visitDate: "Aug 14, 2026",
    createdTimestamp: "1 day ago",
    rating: 4.8,
    crowdLevel: "Moderate",
    isOutdated: false,
    content: "Took the speed boat at Pykara Lake with our 6-year old and it was the highlight of our Ooty trip! The battery vehicle from the main gate to the boat house is very convenient for senior citizens and kids. Well managed and clean safety jackets provided.",
    images: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80"
    ],
    upvotes: 31,
    downvotes: 0,
    userVoted: null,
    commentsCount: 3,
    comments: [],
    tags: ["FamilyFriendly", "Boating", "Scenic"]
  },
  {
    id: "post_4",
    destinationId: "ooty",
    placeId: "place_ooty_5",
    placeName: "Glenmorgan Tea Estate & Lake",
    userId: "user_5",
    userName: "Karthik Raja",
    userHandle: "@karthik_r",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    userBadge: "Community Contributor",
    visitedTimestamp: "Visited 3 days ago",
    visitDate: "Aug 12, 2026",
    createdTimestamp: "3 days ago",
    rating: 4.9,
    crowdLevel: "Low",
    isOutdated: false,
    content: "If you want to escape the crowded commercial areas of Ooty town, Glenmorgan is paradise. The road through the tea estates is quiet, winding, and completely free of noisy tour buses. Stopped at a local estate outlet for fresh cardamom tea.",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
    ],
    upvotes: 54,
    downvotes: 0,
    userVoted: null,
    commentsCount: 5,
    comments: [],
    tags: ["Offbeat", "TeaGardens", "HiddenGem"]
  },
  {
    id: "post_5",
    destinationId: "ooty",
    placeId: "place_ooty_6",
    placeName: "Ooty Boat House",
    userId: "user_4",
    userName: "Meera Nair",
    userHandle: "@meera_wanderer",
    userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    userBadge: "Explorer",
    visitedTimestamp: "Visited 2 years ago",
    visitDate: "Sep 15, 2024",
    createdTimestamp: "2 years ago",
    rating: 4.2,
    crowdLevel: "Moderate",
    isOutdated: true,
    outdatedNotice: "This information is 2 years old. Check recent community posts for current lake condition and wait times.",
    content: "Nice sunset pedal boating in Ooty lake. Lots of snack shops and pony rides around the entrance.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
    ],
    upvotes: 12,
    downvotes: 4,
    userVoted: null,
    commentsCount: 2,
    comments: [],
    tags: ["OlderPost", "Boating"]
  }
];

export const sampleSafetyReports = [
  {
    id: "safety_1",
    destinationId: "ooty",
    placeName: "Avalanche Forest Checkpost Road",
    category: "Road condition",
    severity: "warning", // info, warning, danger
    title: "Culvert repair work near Emerald Village detour",
    description: "Temporary single-lane detour on the road to Avalanche near Emerald junction due to bridge maintenance. Expect 10-15 minute stop-and-go delays for four-wheelers.",
    reportedTimestamp: "Reported 2 hours ago",
    reportedBy: "Vikram Karthik (Local Guide)",
    verifiedCount: 19,
    userConfirmed: false,
    status: "Active",
    resolved: false
  },
  {
    id: "safety_2",
    destinationId: "ooty",
    placeName: "Doddabetta Summit Approach",
    category: "Heavy crowd",
    severity: "warning",
    title: "Parking lot at full capacity on peak hours",
    description: "Traffic police regulating vehicle entry at the Doddabetta base junction between 11:30 AM and 3:30 PM due to full parking lot.",
    reportedTimestamp: "Reported 4 hours ago",
    reportedBy: "Rahul Sundaram",
    verifiedCount: 27,
    userConfirmed: true,
    status: "Active",
    resolved: false
  },
  {
    id: "safety_3",
    destinationId: "ooty",
    placeName: "Ketti Valley View Point",
    category: "Weather-related concern",
    severity: "info",
    title: "Intermittent evening fog & low visibility",
    description: "Dense fog covers Coonoor-Ooty ghat road after 5:30 PM. Drive with fog lamps on and maintain low speed.",
    reportedTimestamp: "Reported yesterday",
    reportedBy: "Karthik Raja",
    verifiedCount: 15,
    userConfirmed: false,
    status: "Active",
    resolved: false
  },
  {
    id: "safety_4",
    destinationId: "coorg",
    placeName: "Mandalpatti 4x4 Jeep Trail",
    category: "Road condition",
    severity: "warning",
    title: "Muddy terrain requiring 4x4 vehicles only",
    description: "Recent rain has made the final 3 km ascent steep and muddy. Private hatchbacks and sedans should not attempt; hire local 4x4 jeeps at the base.",
    reportedTimestamp: "Reported 1 day ago",
    reportedBy: "Praveen Kumar",
    verifiedCount: 34,
    userConfirmed: false,
    status: "Active",
    resolved: false
  }
];

export const sampleQuestions = [
  {
    id: "q_1",
    destinationId: "ooty",
    question: "Is Avalanche Lake worth visiting with elderly parents and a toddler?",
    details: "We have 3 days in Ooty. My parents cannot walk long distances. Is the safari bus comfortable and are there restrooms available?",
    askedBy: "Ananya Sharma",
    askedAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    askedTimestamp: "1 day ago",
    upvotes: 18,
    answersCount: 4,
    status: "Answered",
    answers: [
      {
        id: "ans_1",
        answeredBy: "Rahul Sundaram",
        answererAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        answererBadge: "Top Contributor",
        text: "Yes, absolutely! The forest department safari bus drops you right next to the lake viewpoint and the Trout hatchery. There is very minimal walking (under 50 meters). The bus ride has some bumps, but nothing severe. Clean restrooms are available at the main Eco-center.",
        timestamp: "18 hours ago",
        upvotes: 24,
        isAccepted: true
      },
      {
        id: "ans_2",
        answeredBy: "Vikram Karthik",
        answererAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
        answererBadge: "Local Guide",
        text: "Make sure you choose the 9:00 AM bus to avoid any wait times and enjoy the calm morning breeze.",
        timestamp: "14 hours ago",
        upvotes: 11,
        isAccepted: false
      }
    ]
  },
  {
    id: "q_2",
    destinationId: "ooty",
    question: "Which place is less crowded in Ooty for peaceful tea garden photography?",
    details: "I want to shoot landscape photographs without hundreds of tourists in the frame. Doddabetta tea factory was extremely packed.",
    askedBy: "Meera Nair",
    askedAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    askedTimestamp: "2 days ago",
    upvotes: 15,
    answersCount: 2,
    status: "Answered",
    answers: [
      {
        id: "ans_3",
        answeredBy: "Karthik Raja",
        answererAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        answererBadge: "Community Contributor",
        text: "Head to Glenmorgan or the tea plantations along the Kotagiri-Ooty route (around Kodanad). Glenmorgan has rolling terraced tea slopes with almost zero commercial tourist buses.",
        timestamp: "1 day ago",
        upvotes: 19,
        isAccepted: true
      }
    ]
  },
  {
    id: "q_3",
    destinationId: "ooty",
    question: "Are private drones allowed at Pykara Waterfalls and Avalanche Lake?",
    details: "Bringing a DJI drone for my travel vlog. Do I need Nilgiris district collector permission?",
    askedBy: "Deepak Verma",
    askedAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    askedTimestamp: "3 days ago",
    upvotes: 9,
    answersCount: 1,
    status: "Answered",
    answers: [
      {
        id: "ans_4",
        answeredBy: "Vikram Karthik",
        answererAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
        answererBadge: "Local Guide",
        text: "No, flying private drones is strictly prohibited in Avalanche reserve forest and Pykara catchment areas without written clearance from the Tamil Nadu Forest Department.",
        timestamp: "2 days ago",
        upvotes: 16,
        isAccepted: true
      }
    ]
  }
];

export const sampleTripGroups = [
  {
    id: "group_1",
    destinationId: "ooty",
    destinationName: "Ooty",
    title: "Ooty Monsoon Tea & Forest Trek",
    dates: "Aug 22 – Aug 24, 2026",
    budget: "₹4,200 / person",
    membersCount: 4,
    maxMembers: 6,
    organizer: {
      name: "Rahul Sundaram",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      badge: "Top Contributor"
    },
    members: [
      { name: "Rahul S.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" },
      { name: "Karthik R.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { name: "Priya P.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
      { name: "Vikram K.", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80" }
    ],
    interests: ["Nature", "Trekking", "Photography", "Offbeat"],
    description: "Planning a 3-day weekend exploring Avalanche forest trails, Pykara sunrise boating, and tea factory tasting. Sharing cab rental and homestay costs.",
    status: "Open",
    isJoined: false,
    itinerarySummary: [
      "Day 1: Arrival & Glenmorgan Tea Trail Walk",
      "Day 2: Early morning Avalanche Eco Safari + Pykara Waterfalls",
      "Day 3: Botanical Garden & Local Chocolate Tasting"
    ]
  },
  {
    id: "group_2",
    destinationId: "ooty",
    destinationName: "Ooty",
    title: "Family Leisure Weekend in Nilgiris",
    dates: "Aug 29 – Aug 31, 2026",
    budget: "₹6,000 / person",
    membersCount: 3,
    maxMembers: 5,
    organizer: {
      name: "Ananya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      badge: "Helpful Traveller"
    },
    members: [
      { name: "Ananya S.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
      { name: "Meera N.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
      { name: "Siddharth J.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
    ],
    interests: ["Family", "Sightseeing", "Food", "Relaxation"],
    description: "Relaxed family trip with focus on child-friendly scenic spots, botanical gardens, toy train ride, and comfortable dining.",
    status: "Open",
    isJoined: false,
    itinerarySummary: [
      "Day 1: Nilgiri Mountain Toy Train to Coonoor & Sim's Park",
      "Day 2: Government Botanical Garden & Rose Garden",
      "Day 3: Pykara Boat Club (Speed boat ride)"
    ]
  },
  {
    id: "group_3",
    destinationId: "coorg",
    destinationName: "Coorg",
    title: "Coorg Coffee Estate Backpacking & Trek",
    dates: "Sep 05 – Sep 07, 2026",
    budget: "₹3,800 / person",
    membersCount: 5,
    maxMembers: 6,
    organizer: {
      name: "Meera Nair",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      badge: "Explorer"
    },
    members: [
      { name: "Meera N.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
      { name: "Rahul S.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" }
    ],
    interests: ["Adventure", "Coffee", "Trekking", "Budget"],
    description: "Trekking Mandalpatti peak and staying in an authentic rustic coffee estate homestay near Madikeri.",
    status: "Open",
    isJoined: false,
    itinerarySummary: [
      "Day 1: Abbey Falls + Coffee Cupping Session",
      "Day 2: Sunrise Mandalpatti Jeep Safari & Ridge Trek",
      "Day 3: Dubare Elephant Camp & Tibetan Monastery"
    ]
  }
];

export const sampleNotifications = [
  {
    id: "notif_1",
    type: "upvote",
    title: "Helpful Upvote",
    message: "Vikram Karthik and 8 others upvoted your Avalanche Lake experience post.",
    timestamp: "25 minutes ago",
    read: false,
    link: "/community/ooty"
  },
  {
    id: "notif_2",
    type: "comment",
    title: "New Comment",
    message: "Ananya Sharma replied to your post about Doddabetta Peak morning crowd.",
    timestamp: "2 hours ago",
    read: false,
    link: "/post/post_1"
  },
  {
    id: "notif_3",
    type: "safety",
    title: "Community Safety Alert",
    message: "New road detour reported near Emerald Village route to Avalanche.",
    timestamp: "3 hours ago",
    read: true,
    link: "/safety"
  },
  {
    id: "notif_4",
    type: "group",
    title: "Trip Group Update",
    message: "Rahul S. added a new day plan in 'Ooty Monsoon Tea & Forest Trek'.",
    timestamp: "1 day ago",
    read: true,
    link: "/groups/group_1"
  }
];
