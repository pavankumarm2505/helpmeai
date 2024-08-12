
'use client'
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Navbar from "./navbar/page";

export default function Home() {
  const [user] = useAuthState(auth);

  const router = useRouter();

  if (!user) {
    router.push("/sign-up");
  }

  const [messages, setMessages] = useState([
    {role: 'assistant', content: 'Hello! Welcome to HelpMeAI, I &apos the customer support assistant. How can I assist you today?'}
  ]);
  const [message, setMessage] = useState("");

  const sendMessage = async (userMessage) => {
    const finalMessage = userMessage || message;
    if (!finalMessage.trim()) return;

    setMessage(""); // Clear the input field
    setMessages((messages) => [
      ...messages,
      { role: "user", content: finalMessage }, // Add the user's message to the chat
      { role: "assistant", content: "" }, // Add a placeholder for the assistant's response
    ]);

    // Send the message to the server
    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ...messages,
        { role: "user", content: finalMessage },
      ]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  const handlePromptClick = (prompt) => {
    sendMessage(prompt);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      p={2}
      bgcolor="#f0f2f5"
    >
      <Navbar />
      <Stack
        direction="column"
        width="100%"
        height="100%"
        border="1px solid #ddd"
        borderRadius={2}
        boxShadow={3}
        bgcolor="white"
        p={2}
        spacing={2}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
              width="100%"
            >
              <Box
                bgcolor={message.role === "assistant" ? "#f5f5f5" : "#007bff"}
                color={message.role === "assistant" ? "#000" : "#fff"}
                borderRadius={16}
                p={2}
                maxWidth="75%" // Limit the width to 75% of the container
                wordBreak="break-word"
              >
                {message.content}
              </Box>
            </Box>
          ))}
          {/* Prompt buttons directly below the assistant's message */}
          {messages.length === 1 && (
            <Stack direction="row" spacing={2} mt={2} justifyContent="center">
              <Button
                variant="outlined"
                onClick={() => handlePromptClick("What services do you offer?")}
              >
                What services do you offer?
              </Button>
              <Button
                variant="outlined"
                onClick={() => handlePromptClick("How can I contact support?")}
              >
                How can I contact support?
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  handlePromptClick("Tell me more about helpmeai.")
                }
              >
                Tell me more about helpmeai.
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  handlePromptClick("Can you assist with technical issues?")
                }
              >
                Can you assist with technical issues?
              </Button>
            </Stack>
          )}
        </Stack>
        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            label="Type your message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button variant="contained" onClick={() => sendMessage()}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
