const sampleListings = [
  [
    {
      "title": "Ocean Breeze Villa",
      "description": "A cozy villa overlooking the ocean with modern amenities.",
      "image": {
        "url": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
        "filename": "listing_1"
      },
      "price": 150,
      "location": "Goa",
      "country": "India",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Mountain Retreat",
      "description": "A luxurious getaway nestled in the hills.",
      "image": {
        "url": "https://i.pinimg.com/736x/e7/9e/b0/e79eb000bb58f440e547943dad1c964e.jpg",
        "filename": "listing_2"
      },
      "price": 250,
      "location": "Manali",
      "country": "India",
      "review": [],
      "owner": {
        "_id": "678e499f4fe7367de87a9668",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Seaside Escape",
      "description": "Charming villa with stunning views of the sea.",
      "image": {
        "url": "https://i.pinimg.com/736x/8a/36/7f/8a367f5007da352c3718922eb3f5b3b9.jpg",
        "filename": "listing_3"
      },
      "price": 200,
      "location": "Malibu",
      "country": "USA",
      "review": [],
      "owner": {
        "_id": "678e49b14fe7367de87a9670",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Tropical Paradise",
      "description": "Experience the lush greenery in a serene environment.",
      "image": {
        "url": "https://i.pinimg.com/736x/36/ff/2a/36ff2af14ceb7b4b3d5db1687494842a.jpg",
        "filename": "listing_4"
      },
      "price": 300,
      "location": "Bali",
      "country": "Indonesia",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Rustic Countryside Villa",
      "description": "A peaceful countryside escape with vintage interiors.",
      "image": {
        "url": "https://i.pinimg.com/736x/35/6e/a0/356ea0d147a2d4242ff141517376f156.jpg",
        "filename": "listing_5"
      },
      "price": 120,
      "location": "Tuscany",
      "country": "Italy",
      "review": [],
      "owner": {
        "_id": "678e499f4fe7367de87a9668",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Nordic Retreat",
      "description": "Modern Scandinavian design meets natural beauty.",
      "image": {
        "url": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
        "filename": "listing_6"
      },
      "price": 280,
      "location": "Oslo",
      "country": "Norway",
      "review": [],
      "owner": {
        "_id": "678e49b14fe7367de87a9670",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Desert Oasis Villa",
      "description": "Luxury meets adventure in this desert paradise.",
      "image": {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
        "filename": "listing_7"
      },
      "price": 350,
      "location": "Marrakech",
      "country": "Morocco",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Rainforest Lodge",
      "description": "Immerse yourself in nature's symphony.",
      "image": {
        "url": "https://i.pinimg.com/736x/35/6e/a0/356ea0d147a2d4242ff141517376f156.jpg",
        "filename": "listing_8"
      },
      "price": 220,
      "location": "Amazon",
      "country": "Brazil",
      "review": [],
      "owner": {
        "_id": "678e499f4fe7367de87a9668",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Alpine Chalet",
      "description": "Cozy mountain retreat with panoramic views.",
      "image": {
        "url": "https://i.pinimg.com/736x/3a/c0/e0/3ac0e087f1a3ee8a345a13ccee477a6a.jpg",
        "filename": "listing_9"
      },
      "price": 400,
      "location": "Chamonix",
      "country": "France",
      "review": [],
      "owner": {
        "_id": "678e49b14fe7367de87a9670",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Coastal Garden Villa",
      "description": "Mediterranean charm with private gardens.",
      "image": {
        "url": "https://i.pinimg.com/736x/e7/9e/b0/e79eb000bb58f440e547943dad1c964e.jpg",
        "filename": "listing_10"
      },
      "price": 290,
      "location": "Positano",
      "country": "Italy",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Urban Penthouse",
      "description": "Luxury living in the heart of the city.",
      "image": {
        "url": "https://images.unsplash.com/photo-1600573472592-401b489a3cdc",
        "filename": "listing_11"
      },
      "price": 500,
      "location": "Tokyo",
      "country": "Japan",
      "review": [],
      "owner": {
        "_id": "678e499f4fe7367de87a9668",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Vineyard Estate",
      "description": "Wine country living at its finest.",
      "image": {
        "url": "https://i.pinimg.com/736x/8a/36/7f/8a367f5007da352c3718922eb3f5b3b9.jpg",
        "filename": "listing_12"
      },
      "price": 450,
      "location": "Napa Valley",
      "country": "USA",
      "review": [],
      "owner": {
        "_id": "678e49b14fe7367de87a9670",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Lakeside Cottage",
      "description": "Peaceful retreat by crystal clear waters.",
      "image": {
        "url": "https://images.unsplash.com/photo-1600566753123-17850f8a4180",
        "filename": "listing_13"
      },
      "price": 180,
      "location": "Lake Louise",
      "country": "Canada",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Historic Castle Suite",
      "description": "Live like royalty in this restored castle.",
      "image": {
        "url": "https://i.pinimg.com/736x/35/6e/a0/356ea0d147a2d4242ff141517376f156.jpg",
        "filename": "listing_14"
      },
      "price": 600,
      "location": "Edinburgh",
      "country": "Scotland",
      "review": [],
      "owner": {
        "_id": "678e499f4fe7367de87a9668",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Beachfront Bungalow",
      "description": "Steps from the sand with ocean views.",
      "image": {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
        "filename": "listing_15"
      },
      "price": 320,
      "location": "Maui",
      "country": "USA",
      "review": [],
      "owner": {
        "_id": "678e49b14fe7367de87a9670",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Garden Oasis",
      "description": "Surrounded by botanical gardens and tranquility.",
      "image": {
        "url": "https://i.pinimg.com/736x/e7/9e/b0/e79eb000bb58f440e547943dad1c964e.jpg",
        "filename": "listing_16"
      },
      "price": 240,
      "location": "Kyoto",
      "country": "Japan",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Mountain View Lodge",
      "description": "Spectacular views of the Himalayas.",
      "image": {
        "url": "https://i.pinimg.com/736x/3a/c0/e0/3ac0e087f1a3ee8a345a13ccee477a6a.jpg",
        "filename": "listing_17"
      },
      "price": 280,
      "location": "Pokhara",
      "country": "Nepal",
      "review": [],
      "owner": {
        "_id": "678e499f4fe7367de87a9668",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Seaside Manor",
      "description": "Classic elegance meets coastal charm.",
      "image": {
        "url": "https://images.unsplash.com/photo-1600573472592-401b489a3cdc",
        "filename": "listing_18"
      },
      "price": 420,
      "location": "Hamptons",
      "country": "USA",
      "review": [],
      "owner": {
        "_id": "678e49b14fe7367de87a9670",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Tropical Villa Suite",
      "description": "Paradise found in this luxury retreat.",
      "image": {
        "url": "https://i.pinimg.com/736x/3a/c0/e0/3ac0e087f1a3ee8a345a13ccee477a6a.jpg",
        "filename": "listing_19"
      },
      "price": 380,
      "location": "Phuket",
      "country": "Thailand",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Desert Rock Villa",
      "description": "Modern design integrated with natural landscape.",
      "image": {
        "url": "https://i.pinimg.com/736x/e7/9e/b0/e79eb000bb58f440e547943dad1c964e.jpg",
        "filename": "listing_20"
      },
      "price": 340,
      "location": "Sedona",
      "country": "USA",
      "review": [],
      "owner": {
        "_id": "678e499f4fe7367de87a9668",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Forest Treehouse",
      "description": "Unique stay in a luxury treehouse.",
      "image": {
        "url": "https://i.pinimg.com/736x/3a/c0/e0/3ac0e087f1a3ee8a345a13ccee477a6a.jpg",
        "filename": "listing_21"
      },
      "price": 260,
      "location": "Costa Rica",
      "country": "Costa Rica",
      "review": [],
      "owner": {
        "_id": "678e49b14fe7367de87a9670",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Lighthouse Villa",
      "description": "Historic lighthouse converted to luxury accommodation.",
      "image": {
        "url": "https://i.pinimg.com/736x/8a/36/7f/8a367f5007da352c3718922eb3f5b3b9.jpg",
        "filename": "listing_22"
      },
      "price": 440,
      "location": "Nova Scotia",
      "country": "Canada",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Rice Terrace Villa",
      "description": "Stunning views of ancient rice terraces.",
      "image": {
        "url": "https://i.pinimg.com/736x/36/ff/2a/36ff2af14ceb7b4b3d5db1687494842a.jpg",
        "filename": "listing_23"
      },
      "price": 200,
      "location": "Ubud",
      "country": "Indonesia",
      "review": [],
      "owner": {
        "_id": "678e499f4fe7367de87a9668",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Volcano View Villa",
      "description": "Dramatic views of active volcanoes.",
      "image": {
        "url": "https://i.pinimg.com/736x/35/6e/a0/356ea0d147a2d4242ff141517376f156.jpg",
        "filename": "listing_24"
      },
      "price": 360,
      "location": "Sicily",
      "country": "Italy",
      "review": [],
      "owner": {
        "_id": "678e49b14fe7367de87a9670",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Infinity Pool Villa",
      "description": "Luxury villa with stunning infinity pool.",
      "image": {
        "url": "https://i.pinimg.com/736x/8a/36/7f/8a367f5007da352c3718922eb3f5b3b9.jpg",
        "filename": "listing_25"
      },
      "price": 520,
      "location": "Santorini",
      "country": "Greece",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Safari Lodge",
      "description": "Luxury accommodation in the heart of the savanna.",
      "image": {
        "url": "https://i.pinimg.com/736x/3a/c0/e0/3ac0e087f1a3ee8a345a13ccee477a6a.jpg",
        "filename": "listing_26"
      },
      "price": 580,
      "location": "Serengeti",
      "country": "Tanzania",
      "review": [],
      "owner": {
        "_id": "678e499f4fe7367de87a9668",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Ice Hotel Suite",
      "description": "Unique stay in an architectural ice marvel.",
      "image": {
        "url": "https://i.pinimg.com/736x/e7/9e/b0/e79eb000bb58f440e547943dad1c964e.jpg",
        "filename": "listing_27"
      },
      "price": 420,
      "location": "Kiruna",
      "country": "Sweden",
      "review": [],
      "owner": {
        "_id": "678e49b14fe7367de87a9670",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Cliffside Villa",
      "description": "Dramatic ocean views from cliff's edge.",
      "image": {
        "url": "https://i.pinimg.com/736x/36/ff/2a/36ff2af14ceb7b4b3d5db1687494842a.jpg",
        "filename": "listing_28"
      },
      "price": 480,
      "location": "Amalfi Coast",
      "country": "Italy",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Ancient Temple Villa",
      "description": "Modern luxury amid ancient temples.",
      "image": {
        "url": "https://i.pinimg.com/736x/35/6e/a0/356ea0d147a2d4242ff141517376f156.jpg",
        "filename": "listing_29"
      },
      "price": 300,
      "location": "Siem Reap",
      "country": "Cambodia",
      "review": [],
      "owner": {
        "_id": "678e499f4fe7367de87a9668",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Eco Lodge",
      "description": "Sustainable luxury in pristine nature.",
      "image": {
        "url": "https://i.pinimg.com/736x/8a/36/7f/8a367f5007da352c3718922eb3f5b3b9.jpg",
        "filename": "listing_30"
      },
      "price": 240,
      "location": "Puerto Varas",
      "country": "Chile",
      "review": [],
      "owner": {
        "_id": "678e49b14fe7367de87a9670",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Private Island Villa",
      "description": "Exclusive island paradise all to yourself.",
      "image": {
        "url": "https://i.pinimg.com/736x/3a/c0/e0/3ac0e087f1a3ee8a345a13ccee477a6a.jpg",
        "filename": "listing_31"
      },
      "price": 1200,
      "location": "Fiji",
      "country": "Fiji",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Waterfall Lodge",
      "description": "Listen to the sound of rushing waterfalls.",
      "image": {
        "url": "https://i.pinimg.com/736x/e7/9e/b0/e79eb000bb58f440e547943dad1c964e.jpg",
        "filename": "listing_32"
      },
      "price": 280,
      "location": "Iguazu",
      "country": "Argentina",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Canyon View Villa",
      "description": "Spectacular views of natural canyons.",
      "image": {
        "url": "https://i.pinimg.com/736x/36/ff/2a/36ff2af14ceb7b4b3d5db1687494842a.jpg",
        "filename": "listing_33"
      },
      "price": 340,
      "location": "Grand Canyon",
      "country": "USA",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Riverside Retreat",
      "description": "Peaceful villa along scenic river.",
      "image": {
        "url": "https://i.pinimg.com/736x/35/6e/a0/356ea0d147a2d4242ff141517376f156.jpg",
        "filename": "listing_34"
      },
      "price": 220,
      "location": "Loire Valley",
      "country": "France",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Art Deco Villa",
      "description": "Stylish stay in restored art deco building.",
      "image": {
        "url": "https://i.pinimg.com/736x/8a/36/7f/8a367f5007da352c3718922eb3f5b3b9.jpg",
        "filename": "listing_35"
      },
      "price": 380,
      "location": "Miami",
      "country": "USA",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Glass House",
      "description": "Modern architectural marvel with 360° views.",
      "image": {
        "url": "https://i.pinimg.com/736x/3a/c0/e0/3ac0e087f1a3ee8a345a13ccee477a6a.jpg",
        "filename": "listing_36"
      },
      "price": 460,
      "location": "Vancouver",
      "country": "Canada",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Bamboo Villa",
      "description": "Sustainable luxury in bamboo architecture.",
      "image": {
        "url": "https://i.pinimg.com/736x/e7/9e/b0/e79eb000bb58f440e547943dad1c964e.jpg",
        "filename": "listing_37"
      },
      "price": 240,
      "location": "Chiang Mai",
      "country": "Thailand",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Harbor View Villa",
      "description": "Overlooking the iconic harbor.",
      "image": {
        "url": "https://i.pinimg.com/736x/36/ff/2a/36ff2af14ceb7b4b3d5db1687494842a.jpg",
        "filename": "listing_38"
      },
      "price": 420,
      "location": "Sydney",
      "country": "Australia",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Medieval Castle Room",
      "description": "Authentic medieval experience with modern comfort.",
      "image": {
        "url": "https://i.pinimg.com/736x/35/6e/a0/356ea0d147a2d4242ff141517376f156.jpg",
        "filename": "listing_39"
      },
      "price": 380,
      "location": "Loire Valley",
      "country": "France",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Overwater Villa",
      "description": "Luxury overwater bungalow in paradise.",
      "image": {
        "url": "https://i.pinimg.com/736x/8a/36/7f/8a367f5007da352c3718922eb3f5b3b9.jpg",
        "filename": "listing_40"
      },
      "price": 800,
      "location": "Bora Bora",
      "country": "French Polynesia",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
    {
      "title": "Desert Star Villa",
      "description": "Perfect for stargazing in the desert.",
      "image": {
        "url": "https://i.pinimg.com/736x/3a/c0/e0/3ac0e087f1a3ee8a345a13ccee477a6a.jpg",
        "filename": "listing_41"
      },
      "price": 320,
      "location": "Atacama",
      "country": "French Polynesia",
      "review": [],
      "owner": {
        "_id": "678e49904fe7367de87a9660",
        "email": "rautaditya2606@gmail.com",
        "username": "adityaraut"
      }
    },
  ]
]

module.exports = { data: sampleListings };
