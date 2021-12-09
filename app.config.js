import "dotenv/config"

export default {
    name: 'FoodPiles',
    version: '1.0.0',
    extra: {
        JWT: process.env.JWT,
        domain: process.env.NODE_ENV === 'development' ? process.env.LOCALHOST : process.env.DOMAIN
    }
}