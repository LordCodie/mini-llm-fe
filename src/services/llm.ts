import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  // Required when running directly inside Vite / Browser client code
  dangerouslyAllowBrowser: true,
})

interface chatMessage {
  role: "user" | "assistant" 
  content: string
}

/**
 * Sends a prompt to OpenRouter using the OpenAI SDK and streams the response.
 * @param {string} question - The user prompt.
 * @param {chatMessage[]} history - The chat history to provide context for the response.
 */

export const llmresponse = async (history: chatMessage[]) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-3-ultra-550b-a55b:free",
      messages: history,
      // response_format: {type: "json_object"},
      stream: false, // 👈 Turn streaming OFF
    })

    const answer = completion?.choices[0]?.message?.content

    console.log("LLM Response:", answer) // Log the response for debugging

    // Returns the complete answer string
    return answer
  } catch (error) {
    console.error("Error generating text:", error)
    throw new Error("Failed to generate text from LLM.")
  }
}
