import { connectToDatabase } from "@/lib/mongodb";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { email, password, fullName } = await req.json();

    if(!email || !password || !fullName) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return NextResponse.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        password: hashedPassword,
        fullName
    });

    await newUser.save();
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}