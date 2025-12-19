/**
 * AI Service - Communicates with backend API for OpenAI integration
 * Prevents exposing API keys in the browser
 */

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export interface AIResponse {
  success: boolean;
  response: string;
  error?: string;
}

/**
 * Send a message to the AI assistant via backend API
 * @param userMessage - The user's message
 * @param conversationHistory - Previous messages for context
 * @returns The AI's response
 */
export async function generateAIResponse(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> {
  try {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    const response = await fetch(`${apiUrl}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory: conversationHistory.map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data: AIResponse = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to get AI response');
    }

    return data.response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while connecting to the AI service.';
    throw new Error(errorMessage);
  }
}
