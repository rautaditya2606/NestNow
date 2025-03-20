const https = require('https');

const monitorServerStatus = () => {
    const url = process.env.APP_URL || 'https://your-app-url.onrender.com';
    let lastSuccessful = Date.now();
    let isServerDown = false;
    let consecutiveFailures = 0;

    // Memory threshold (80% of max)
    const memoryThreshold = process.memoryUsage().heapTotal * 0.8;

    // Check server health every 30 seconds (increased frequency)
    setInterval(() => {
        const start = Date.now();
        // Check memory usage
        const memUsage = process.memoryUsage();
        if (memUsage.heapUsed > memoryThreshold) {
            console.warn('High memory usage detected:', 
                Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB');
            global.gc && global.gc(); // Force garbage collection if available
        }

        https.get(url + '/health', (resp) => {
            const responseTime = Date.now() - start;
            if (resp.statusCode === 200) {
                lastSuccessful = Date.now();
                isServerDown = false;
                consecutiveFailures = 0;
                console.log(`Healthy - Response: ${responseTime}ms, Memory: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`);
            } else {
                handleFailure(`Status: ${resp.statusCode}`);
            }
        }).on('error', (err) => {
            handleFailure(err.message);
        });
    }, 30000);

    function handleFailure(error) {
        consecutiveFailures++;
        const downtime = Math.floor((Date.now() - lastSuccessful) / 1000);
        
        if (!isServerDown) {
            console.error(`Server issue detected! Error: ${error}`);
            console.error(`Downtime: ${downtime}s, Failures: ${consecutiveFailures}`);
            isServerDown = true;
        }

        // Attempt recovery after 3 consecutive failures
        if (consecutiveFailures >= 3) {
            console.error('Critical: Multiple failures detected, attempting recovery...');
            // Force garbage collection
            global.gc && global.gc();
            // Clear require cache to reload modules
            Object.keys(require.cache).forEach(key => delete require.cache[key]);
        }
    }

    console.log('Server monitoring active');
    console.log('UptimeRobot ping interval: 5 minutes');
    
    // Optional: Log server starts for debugging
    process.on('uncaughtException', (err) => {
        console.error('Uncaught Exception:', err);
    });

    process.on('unhandledRejection', (err) => {
        console.error('Unhandled Rejection:', err);
    });
};

module.exports = monitorServerStatus;
