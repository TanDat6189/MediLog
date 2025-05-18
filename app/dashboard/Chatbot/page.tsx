"use client";

import Head from "next/head";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Message type definition
type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  image?: string;
  error?: boolean;
  isStreaming?: boolean;
};

const waitForPuter = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject("Not in browser");

    const interval = setInterval(() => {
      if (window.puter && window.puter.ai) {
        clearInterval(interval);
        resolve();
      }
    }, 100);

    // Timeout sau 5 giây
    setTimeout(() => {
      clearInterval(interval);
      reject("Puter AI SDK not loaded");
    }, 5000);
  });
};

const callPuterAI = async (
  prompt: string,
  onToken: (token: string) => void
) => {
  try {
    await waitForPuter();

    const response = await window.puter.ai.chat(prompt, {
      model: "deepseek-chat",
    });

    const tokens = response.message.content.split(" ");
    for (const token of tokens) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      onToken(token + " ");
    }
  } catch (error) {
    console.error("Puter AI Error:", error);
    onToken("Sorry, there was an error processing your request.");
  }
};

export default function Chatbot() {
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI chatbot assistant. Describe your problems and I'll give you advices.",
      sender: "ai",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  // Ref for chat container to auto-scroll
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue(value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isStreaming) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Create a placeholder for AI response
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      content: "",
      sender: "ai",
      isStreaming: true,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsStreaming(true);

    await callPuterAI(userMessage.content, (token) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? { ...msg, content: msg.content + token }
            : msg
        )
      );
    });

    // Mark streaming as complete
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageId ? { ...msg, isStreaming: false } : msg
      )
    );
    setIsStreaming(false);
  };

  // Handle image load error
  const handleImageError = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              content: "We are unable to process your request.",
              image: undefined,
              error: true,
            }
          : msg
      )
    );
  };

  return (
    <>
      <Head>
        <script src="https://js.puter.com/v2/" defer />
      </Head>

      <div className="flex h-full flex-1 flex-col p-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Chatbot</h2>
          <p className="text-muted-foreground">
            Describe your problems and I'll give you advices.
          </p>
        </div>
        <Separator className="my-6" />

        {/* Chat Interface */}
        <Card className="flex flex-1 flex-col overflow-hidden">
          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 md:p-6"
            style={{ maxHeight: "calc(100vh - 300px)" }}
          >
            <div className="flex flex-col space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "ai" && (
                    <Avatar className="mr-2 h-8 w-8 self-end">
                      <AvatarImage src="/placeholder.svg" alt="AI" />
                      <AvatarFallback>
                        <Sparkles className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : message.error
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                      {message.isStreaming && (
                        <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-current"></span>
                      )}
                    </p>
                    {message.image && (
                      <div className="mt-2 overflow-hidden rounded-md">
                        <Image
                          src={message.image || "/placeholder.svg"}
                          alt="Generated image"
                          width={400}
                          height={300}
                          className="max-h-[300px] w-full object-contain"
                          onError={() => handleImageError(message.id)}
                        />
                      </div>
                    )}
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="ml-2 h-8 w-8 self-end">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="User"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <CardContent className="border-t bg-background p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                placeholder="Describe your current health condition..."
                value={inputValue}
                onChange={handleInputChange}
                disabled={isLoading || isStreaming}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || isStreaming || !inputValue.trim()}
              >
                {isLoading || isStreaming ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span className="ml-2">Sending</span>
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
