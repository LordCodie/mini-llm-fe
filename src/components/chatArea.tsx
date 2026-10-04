import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { mockChatHistory } from "@/db/mockdata"
import { useState, useEffect, useRef } from "react"
import { getStorageData } from "@/store/localstorage"
import ReactMarkdown from "react-markdown"

type UserBoxProps = {
  text_data: string
  timestamp: string
  role: string
}

function ReplyBox({ text_data, timestamp, role }: UserBoxProps) {
  return (
    <div className="min-w-[60%] rounded-lg bg-muted p-4 text-muted-foreground">
      <p className="mb-2 font-medium text-foreground capitalize">🤖 {role}</p>
      <p className="whitespace-pre-wrap">
        <ReactMarkdown>{text_data}</ReactMarkdown>
      </p>
      <p className="mt-2 text-end text-xs text-muted-foreground">{timestamp}</p>
    </div>
  )
}

function QuestionBox({ text_data, timestamp, role }: UserBoxProps) {
  return (
    <div className="min-w-[60%] rounded-lg bg-primary p-4 text-primary-foreground">
      <p className="mb-2 font-medium capitalize">👤 You</p>
      <p className="whitespace-pre-wrap">
        <ReactMarkdown>{text_data}</ReactMarkdown>
      </p>
      <p className="mt-2 text-end text-xs opacity-70">{timestamp}</p>
    </div>
  )
}

export function ChatArea({
  id,
  open,
  openFunc,
  messages,
}: {
  id: string
  open: boolean
  openFunc: (open: boolean) => void
  messages: any[]
}) {
  const [chatHistoryData, setChatHistoryData] = useState({} as any)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (id) {
      const selectedIdData = getStorageData(id)
      setChatHistoryData(selectedIdData)
    } else {
      setChatHistoryData({})
    }

    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // const messages = chatHistoryData?.prompt_data || []

  console.log("Messages for session ID", id, ":", messages)

  return (
    <Card className="mx-auto w-full max-w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">
          {(chatHistoryData && chatHistoryData.title) || "Hi There!"}
        </CardTitle>
      </CardHeader>

      <CardContent className="-mb-(--card-spacing)">
        <div
          ref={scrollRef}
          className="-mx-(--card-spacing) max-h-96 space-y-4 overflow-y-auto border-t bg-muted/20 px-(--card-spacing) py-4 text-sm leading-relaxed"
        >
          <h1 className="py-3 text-center text-xl font-bold">
            {messages.length === 0 && "Ask Me Anything....."}
          </h1>

          {messages.map((message: any) => {
            const isUser = message.role === "user"

            return (
              <div
                key={message.id}
                className={`flex ${isUser ? "justify-start" : "justify-end"}`}
              >
                {isUser ? (
                  <QuestionBox
                    text_data={message.content}
                    timestamp={message.timestamp}
                    role={message.role}
                  />
                ) : (
                  <ReplyBox
                    text_data={message.content}
                    timestamp={message.timestamp}
                    role={message.role}
                  />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
