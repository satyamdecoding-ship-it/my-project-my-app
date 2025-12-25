import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("taskdb");
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user || user.password !== password) {
      await client.close();
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = Buffer.from(`${user.email}:${Date.now()}`).toString("base64");

    const response = NextResponse.json({ message: "Logged in" });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    await client.close();
    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
