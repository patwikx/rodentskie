import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Check if a user with the same email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({
        status: 'error',
        message: 'A user with this email already exists',
      });
    }

    const hashed = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashed,
      },
    });

    return NextResponse.json({
      status: 'success',
      user: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: (error as Error).message,
    });
  }
}