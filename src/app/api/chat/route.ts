import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';

export const runtime = 'edge';
export async function POST(req: Request) {
  const { messages, context }: { messages: UIMessage[]; context?: string } =
    await req.json();

  const system = [
    'Ты — умный помощник SmartBrain. Пиши кратко и по делу.',
    context
      ? `Вот текущая заметка пользователя, учитывай её при ответе:\n\n${context}`
      : null,
  ]
    .filter(Boolean)
    .join('\n\n');

  const convertedMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: openai('gpt-4o'),
    system,
    messages: convertedMessages,
  });

  return result.toUIMessageStreamResponse();
}