const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const memUsage = process.memoryUsage();
        const healthData = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: {
                used: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
                total: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
                percentage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100) + '%'
            },
            cpu: process.cpuUsage(),
            pid: process.pid,
            platform: process.platform,
            nodejs: process.version
        };

        // Add MongoDB connection check if mongoose is used
        if (global.mongoose && global.mongoose.connection) {
            healthData.database = {
                state: global.mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
            };
        }

        res.status(200).json(healthData);
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
});

module.exports = router;
