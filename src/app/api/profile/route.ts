import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("userId")?.value;

        if (!userId) {
            return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
        }

        const data = await req.json();
        const { age, gender, height, weight, activity, goal } = data;

        const profile = await prisma.profile.upsert({
            where: { userId },
            update: { age: Number(age), gender, height: Number(height), weight: Number(weight), activity: Number(activity), goal },
            create: { userId, age: Number(age), gender, height: Number(height), weight: Number(weight), activity: Number(activity), goal },
        });

        return NextResponse.json({ success: true, profile });
    } catch (error) {
        return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
    }
}
