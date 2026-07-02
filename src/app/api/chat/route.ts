import { openai } from "@ai-sdk/openai"
import { streamText, convertToModelMessages, type UIMessage } from "ai"

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OPENAI_API_KEY is not configured on the server." },
        { status: 500 },
      )
    }

    const { messages, context }: { messages: UIMessage[]; context?: string } =
      await req.json()

    const system = [
      "Ты — умный помощник SmartBrain. Пиши кратко и по делу.",
      context
        ? `Вот текущая заметка пользователя, учитывай её при ответе:\n\n${context}`
        : null,
    ]
      .filter(Boolean)
      .join("\n\n")

    const convertedMessages = await convertToModelMessages(messages)

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system,
      messages: convertedMessages,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[chat]", error)
    return Response.json({ error: "Failed to process AI request." }, { status: 500 })
  }
}
