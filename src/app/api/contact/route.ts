import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const data = await request.json();
		// Basic validation
		if (!data?.name || !data?.email || !data?.subject || !data?.message) {
			return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
		}

		// Here you could forward to email, CRM, etc.
		// For now, we just log and return success.
		console.log("Contact form submission:", data);

		return NextResponse.json({ ok: true });
	} catch (err) {
		return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
	}
}


