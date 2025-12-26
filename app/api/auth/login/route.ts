import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req: NextRequest) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("taskdb");
    const users = db.collection("users");

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // find user
    let user = await users.findOne({ email });

    // auto-create test user if not exists
    if (!user) {
      await users.insertOne({
        email: "test@gmail.com",
        password: "123456",
        username: "Test User",
      });
      user = await users.findOne({ email });
    }

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");

    const response = NextResponse.json({ message: "Logged in" });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
