import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE || 'mongodb+srv://rasimulislam722:eRE8r3Rq3CBHhxRK@cluster0.khqazcv.mongodb.net/gpa';

if (!DATABASE_URL) {
  throw new Error('Please define the DATABASE environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
