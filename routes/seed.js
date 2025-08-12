const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const User = require('../models/user.js');

// Sample data for generating realistic properties
const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara'
];

const propertyTypes = [
    'Apartment', 'Villa', 'Independent House', 'Penthouse', 'Studio',
    '2BHK Flat', '3BHK Flat', '4BHK Flat', 'Duplex', 'Townhouse'
];

const locations = [
    'Andheri West', 'Bandra West', 'Juhu', 'Powai', 'Worli',
    'Colaba', 'BKC', 'Lower Parel', 'Dadar West', 'Chembur',
    'Vashi', 'Nerul', 'Belapur', 'Panvel', 'Kharghar',
    'Thane West', 'Mulund West', 'Goregaon West', 'Malad West', 'Borivali West'
];

const descriptions = [
    'Beautiful modern apartment with stunning city views and premium amenities.',
    'Spacious family home with garden and parking space in a prime location.',
    'Luxury villa with private pool and landscaped gardens.',
    'Contemporary apartment with smart home features and 24/7 security.',
    'Cozy studio apartment perfect for young professionals.',
    'Premium 3BHK flat with modular kitchen and balcony.',
    'Exclusive penthouse with panoramic views and private terrace.',
    'Independent house with backyard and garage in peaceful neighborhood.',
    'Modern duplex with separate living and dining areas.',
    'Elegant townhouse with community amenities and security.'
];

const imageUrls = [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'
];

// Generate random price with realistic rental tiers
function getRandomPrice() {
    const tiers = [
        { min: 1000, max: 5000 },    // Budget (₹1K-5K)
        { min: 5000, max: 15000 },   // Mid-range (₹5K-15K)
        { min: 15000, max: 30000 },  // Premium (₹15K-30K)
        { min: 30000, max: 50000 }   // Luxury (₹30K-50K)
    ];
    
    const tier = tiers[Math.floor(Math.random() * tiers.length)];
    return Math.floor(Math.random() * (tier.max - tier.min) + tier.min);
}

// Generate random element from array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Generate random property data
function generatePropertyData(index) {
    const city = getRandomElement(cities);
    const location = getRandomElement(locations);
    const propertyType = getRandomElement(propertyTypes);
    const description = getRandomElement(descriptions);
    const imageUrl = getRandomElement(imageUrls);
    const price = getRandomPrice();
    
    return {
        title: `${propertyType} in ${location}`,
        description: `${description} Located in the heart of ${location}, this ${propertyType.toLowerCase()} offers modern amenities and convenient access to all major facilities.`,
        image: {
            url: imageUrl,
            filename: `property-${index + 1}`
        },
        price: price,
        location: `${location}, ${city}`,
        country: 'India',
        owner: {
            _id: '507f1f77bcf86cd799439011', // Default owner ID
            email: 'admin@nestnow.com',
            username: 'NestNow Admin'
        }
    };
}

// Seed API endpoint
router.post('/seed-properties', async (req, res) => {
    try {
        // Check if properties already exist
        const existingCount = await Listing.countDocuments();
        
        if (existingCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Database already contains ${existingCount} properties. Use /clear-properties first to reset.`
            });
        }

        const properties = [];
        
        // Generate 50 properties
        for (let i = 0; i < 50; i++) {
            const propertyData = generatePropertyData(i);
            properties.push(propertyData);
        }

        // Insert all properties
        const result = await Listing.insertMany(properties);

        res.status(201).json({
            success: true,
            message: `Successfully seeded ${result.length} properties into the database`,
            count: result.length,
            properties: result.map(p => ({
                id: p._id,
                title: p.title,
                price: p.price,
                location: p.location
            }))
        });

    } catch (error) {
        console.error('Seeding error:', error);
        res.status(500).json({
            success: false,
            message: 'Error seeding properties',
            error: error.message
        });
    }
});

// Clear all properties endpoint
router.delete('/clear-properties', async (req, res) => {
    try {
        const result = await Listing.deleteMany({});
        
        res.status(200).json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} properties from the database`,
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.error('Clear error:', error);
        res.status(500).json({
            success: false,
            message: 'Error clearing properties',
            error: error.message
        });
    }
});

// Get seed status endpoint
router.get('/seed-status', async (req, res) => {
    try {
        const count = await Listing.countDocuments();
        
        res.status(200).json({
            success: true,
            propertyCount: count,
            message: `Database contains ${count} properties`
        });

    } catch (error) {
        console.error('Status check error:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking database status',
            error: error.message
        });
    }
});

module.exports = router; 