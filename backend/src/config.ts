require('dotenv').config;

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config;
}
// Manejo de la señal SIGTERM
process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Gracefully shutting down...');
    process.exit(0);
});

export default {
    database: {
        url: process.env.DATABASE_URL || 'mongodb://topicsuser:password@mongo-svc:27017/TopicstoreDb?authSource=admin',
        name: process.env.DATABASE_NAME || 'TopicstoreDb'
    },
    app: {
        host: process.env.HOST || '0.0.0.0',
        port: Number(process.env.PORT) || 5000
    }
}