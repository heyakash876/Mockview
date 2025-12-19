import { db } from "@/utils/db";
import { Users } from "@/utils/schema";
import { comparePassword, encrypt } from "@/lib/auth";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const user = await db.select().from(Users).where(eq(Users.email, email));
        if (user.length === 0) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isPasswordCorrect = await comparePassword(password, user[0].password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Create session
        const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
        const session = await encrypt({ user: { id: user[0].id, email: user[0].email, name: user[0].name }, expires });

        const response = NextResponse.json({ message: "Login successful", user: user[0] });
        response.cookies.set("session", session, { expires, httpOnly: true });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
