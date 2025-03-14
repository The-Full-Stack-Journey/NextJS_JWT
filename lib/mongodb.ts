import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI || "";

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}


// Use a global variable to cache the connection
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {}).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

(global as any).mongoose = cached;