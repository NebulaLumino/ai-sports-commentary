import { NextRequest, NextResponse } from "next/server";

async function getClient() {
  const OpenAI = (await import("openai")).default;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.deepseek.com/v1" });
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    const client = await getClient();
    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: `You are a passionate sports commentator and play-by-play writer. Given a sports event scenario, generate an engaging commentary script with play-by-play narration, color commentary, dramatic tension building, key statistics mentions, and fan excitement hooks. Make it radio/TV broadcast ready.` },
        { role: "user", content: prompt },
      ],
      max_tokens: 900, temperature: 0.9,
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
