import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) return NextResponse.json({ error: "No email or password" }, { status: 400 });

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: "Nieprawidłowe dane logowania" }, { status: 401 });
        }

        const response = NextResponse.json({ success: true, userId: user.id });
        response.cookies.set("userId", user.id, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7
        });

        return response;
    } catch (error: any) {
        console.error("LOGIN ERROR:", error);
        return NextResponse.json({ error: "Błąd serwera: " + error?.message }, { status: 500 });
    }
}
