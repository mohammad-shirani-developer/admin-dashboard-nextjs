import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = "mysecretkey123";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "123456") {
    const token = jwt.sign({ username: "admin", role: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return NextResponse.json({ token });
  }

  return NextResponse.json(
    { error: "نام کاربری یا رمز اشتباه است" },
    { status: 401 }
  );
}
