class Database {
    connect() {
        if(process.env.NODE_ENV === 'production') {

            const { Client } = require('pg');
        
            const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
            });
        
            client.connect();
        }        
    }
}

module.exports = new Database();