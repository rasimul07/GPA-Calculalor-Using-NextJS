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

    const user = await User.findOne({ email, password });
    if (!user) {
      return NextResponse.json({ massage: 'email or password incorrect' }, { status: 201 });
    }

    const token = jwt.sign({ email, password }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '3h' });
    return NextResponse.json({ massage: 'login sucessfully--test', token, email }, { status: 200 });
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
