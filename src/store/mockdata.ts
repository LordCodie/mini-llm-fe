export const mockChatHistory = [
  {
    sessionId: "chat_abc123", // Unique ID for the entire chat thread (crucial for localStorage)
    title: "Geography Trivia", // Useful for a sidebar showing past chat histories
    createdAt: "2026-10-01T08:00:00.000Z", // When the chat started
    updatedAt: "2026-10-01T08:05:00.000Z", // Useful for sorting the sidebar by "most recent"
    prompt_data: [
      {
        id: "msg_001", // Must be unique per message for React `key` props
        role: "user", // "user" or "assistant" to differentiate message types   
        content: "What is the capital of France?",
        timestamp: "2026-10-01T08:00:00.000Z", // For displaying message times
      },
      {
        id: "msg_002",
        role: "assistant",
        content: "The capital of France is Paris.",
        timestamp: "2026-10-01T08:00:02.000Z",
        isGenerating: false, // Useful for showing loading states/typing indicators
      },
      {
        id: "msg_003",
        role: "user",
        content: "And what is the population?",
        timestamp: "2026-10-01T08:04:30.000Z",
      },
      {
        id: "msg_004",
        role: "assistant",
        content: "As of 2024, the population of Paris is approximately 2.1 million within the city limits, and over 11 million in the wider metropolitan area.",
        timestamp: "2026-10-01T08:05:00.000Z",
        isGenerating: false,
      },
    ],
  },
  {
    sessionId: "chat_xyz789",
    title: "React Debugging",
    createdAt: "2026-09-30T14:20:00.000Z",
    updatedAt: "2026-09-30T14:25:00.000Z",
    prompt_data: [
      {
        id: "msg_005",
        role: "user",
        content: "How do I clear localStorage in React?",
        timestamp: "2026-09-30T14:20:00.000Z",
      },
      {
        id: "msg_006",
        role: "assistant",
        content: "You can clear it by calling `localStorage.clear()` or remove a specific item using `localStorage.removeItem('your_key')`.",
        timestamp: "2026-09-30T14:20:05.000Z",
        isGenerating: false,
      },
    ],
  },
];