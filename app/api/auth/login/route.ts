import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("taskdb");
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
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

    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
