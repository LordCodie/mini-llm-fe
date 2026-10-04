import { InputTextBox } from "./components/inputTextbox"
import { useEffect, useState } from "react"
import { ChatHistory } from "./components/chatHistory"
import { Button } from "@/components/ui/button"
import type { Message } from "@/store/localstorage"
import { getStorageData } from "@/store/localstorage"

export function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [chatSessionId, setChatSessionId] = useState("")
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const refreshMessages = (id: string) => {
    const data = getStorageData(id)
    setMessages(data?.prompt_data || [])
  }

  const handleNewChat = () => {
    setChatSessionId("") // Reset the current chat session ID
    setMessages([]) // Clear the messages for the new chat
  }

  useEffect(() => {
    if (chatSessionId) refreshMessages(chatSessionId)
  }, [chatSessionId])

  return (
    <div className="min-h-svh p-6">
      <nav className="flex items-center justify-between border-b pb-6">
        <h1 className="pb-3 text-2xl font-bold">🤔 ASK CODIE......</h1>
        <div className="flex items-center gap-4">
          <Button className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-blue-600 hover:text-black"
          onClick={handleNewChat}>
            New Chat
          </Button>
          <ChatHistory
            idSessionFunc={setChatSessionId} // set the current chat session id
            open={open}
            openFunc={setOpen}
          />
        </div>
      </nav>

      <div className="my-12">
        <div className="flex flex-col items-center justify-center gap-6">
          <InputTextBox
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            currentId={chatSessionId}
            messages={messages}
            setMessages={setMessages} // Pass setMessages to InputTextBox
            setCurrentId={setChatSessionId}
            onMessageSent={() => refreshMessages(chatSessionId)} // Refresh messages after a new message is sent
            open={open}
            openFunc={setOpen}
          />
        </div>
      </div>
    </div>
  )
}
;[]

export default App
