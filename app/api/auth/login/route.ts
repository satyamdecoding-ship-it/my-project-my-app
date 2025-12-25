import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    // Read MONGODB_URI at runtime
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.log("MONGODB_URI not found");
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("taskdb");
    const users = db.collection("users");

    const { email, password } = await req.json();

    if (!email || !password) {
      await client.close();
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Find user
    let user = await users.findOne({ email });

    // If user does not exist, create the test user automatically
    if (!user) {
      const result = await users.insertOne({
        email: "test@gmail.com",
        password: "123456",
        username: "Test User",
      });
      user = await users.findOne({ _id: result.insertedId });
    }

    if (!user || user.password !== password) {
      await client.close();
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = Buffer.from(`${user.email}:${Date.now()}`).toString("base64");

    const response = NextResponse.json({ message: "Logged in" });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    await client.close();
    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
