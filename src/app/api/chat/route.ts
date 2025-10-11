import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
// You can set your API key in .env.local as OPENAI_API_KEY
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
	try {
		const { message, locale, history } = await request.json();

		if (!message || typeof message !== "string") {
			return NextResponse.json(
				{ error: "Invalid message" },
				{ status: 400 }
			);
		}

		// Check if API key is configured
		if (!process.env.OPENAI_API_KEY) {
			return NextResponse.json(
				{
					message:
						locale === "ar"
							? "عذراً، الخدمة غير متاحة حالياً. يرجى المحاولة لاحقاً."
							: "Sorry, the service is currently unavailable. Please try again later.",
				},
				{ status: 200 }
			);
		}

		// Build conversation history for context
		const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
			{
				role: "system",
				content:
					locale === "ar"
						? `أنت مساعد افتراضي لمجموعة أمل الخير القابضة، وهي مجموعة سعودية رائدة في قطاعات الدواجن والأعلاف والأسماك والتمور. 
						
						معلومات عن المجموعة:
						- تأسست المجموعة عام 1955 في مدينة الخبر
						- تمتلك 4 شركات رئيسية: الدواجن (أكثر من 132 مليون بيضة سنوياً)، الأعلاف (أكثر من 60 ألف طن سنوياً)، الأسماك (أكثر من 350 طن أسماك طازجة سنوياً)، والتمور (أكثر من 80 ألف طن سنوياً)
						- حاصلة على شهادات ISO 9001 و ISO 22000
						- العنوان: صندوق بريد 8524، الرياض 11492
						- هاتف: +966 (11) 460 0005
						- واتساب: +966545501010
						
						دورك هو مساعدة الزوار بالإجابة عن أسئلتهم حول المجموعة ومنتجاتها وخدماتها بطريقة ودية واحترافية.`
						: `You are a virtual assistant for Amal Al Khair Holding Group, a leading Saudi group in the poultry, feed, fish, and dates sectors.
						
						Information about the group:
						- Founded in 1955 in Al Khobar
						- Has 4 main companies: Poultry (more than 132 million eggs annually), Feed (more than 60 thousand tons annually), Fish (more than 350 tons of fresh fish annually), and Dates (more than 80 thousand tons annually)
						- ISO 9001 and ISO 22000 certified
						- Address: P.O. Box 8524, Riyadh 11492
						- Phone: +966 (11) 460 0005
						- WhatsApp: +966545501010
						
						Your role is to help visitors by answering their questions about the group, its products, and services in a friendly and professional manner.`,
			},
		];

		// Add conversation history
		if (history && Array.isArray(history)) {
			history.forEach((msg: { sender: string; text: string }) => {
				if (msg.sender === "user") {
					messages.push({ role: "user", content: msg.text });
				} else if (msg.sender === "bot") {
					messages.push({ role: "assistant", content: msg.text });
				}
			});
		}

		// Add current message
		messages.push({ role: "user", content: message });

		// Call OpenAI API
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: messages,
			temperature: 0.7,
			max_tokens: 500,
		});

		const responseMessage = completion.choices[0]?.message?.content || 
			(locale === "ar"
				? "عذراً، لم أتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى."
				: "Sorry, I couldn't process your request. Please try again.");

		return NextResponse.json(
			{ message: responseMessage },
			{ status: 200 }
		);
	} catch (error: unknown) {
		console.error("Error in chat API:", error);
		
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		
		return NextResponse.json(
			{ error: "Internal server error", details: errorMessage },
			{ status: 500 }
		);
	}
}

