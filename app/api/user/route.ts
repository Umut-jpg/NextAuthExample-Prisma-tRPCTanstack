import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password, name, surname } = body;

    const user = await db.user.findUnique({ where: { email: email } });
    if (user) {
      return NextResponse.json(
        { user: null, message: "User already exists" },
        { status: 200 }
      );
    }
    const hadhedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email: email,
        password: hadhedPassword,
        name: name,
        surname: surname,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(
      { user: userWithoutPassword, message: "success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error fetching user: ${error}` },
      { status: 200 }
    );
  }
}
