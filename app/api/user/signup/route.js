import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/auth';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ massage: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ massage: 'user Already exist' }, { status: 201 });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ email, password }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '3h' });
    return NextResponse.json({ massage: 'user account created sucessfully', token }, { status: 200 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
