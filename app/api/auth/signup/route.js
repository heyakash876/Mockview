import { db } from "@/utils/db";
import { Users } from "@/utils/schema";
import { hashPassword, encrypt } from "@/lib/auth";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        // Check if user already exists
        const existingUser = await db.select().from(Users).where(eq(Users.email, email));
        if (existingUser.length > 0) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await db.insert(Users).values({
            name,
            email,
            password: hashedPassword
        }).returning();

        // Create session
        const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
        const session = await encrypt({ user: { id: newUser[0].id, email: newUser[0].email, name: newUser[0].name }, expires });

        const response = NextResponse.json({ message: "User registered successfully", user: newUser[0] }, { status: 201 });
        response.cookies.set("session", session, { expires, httpOnly: true });

        return response;
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
