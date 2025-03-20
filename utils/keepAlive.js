const https = require('https');

const pingServer = () => {
    const url = process.env.APP_URL || 'https://your-app-url.onrender.com';
    https.get(url, (resp) => {
        console.log('Ping successful');
    }).on('error', (err) => {
        console.log('Ping failed:', err.message);
    });
};

// Ping every 14 minutes (Render free tier sleep after 15 minutes of inactivity)
setInterval(pingServer, 14 * 60 * 1000);

module.exports = pingServer;
