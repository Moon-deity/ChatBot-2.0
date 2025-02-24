import React, { useEffect, useRef, useState } from "react";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";

const Chat = () => {
  const [Value, setValue] = useState("");
  const [History, setHistory] = useState([]);
  const [Error, setError] = useState("");
  const chatboxRef = useRef(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [History]);

  const sendMessage = async () => {
    if (!Value.trim()) {
      alert("Message shouldn't be null!");
      return;
    }
    try {
      const postMessage = {
        method: "POST",
        body: JSON.stringify({
          history: History,
          message: Value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      setValue("")
      const response = await fetch("http://localhost:3000/chat", postMessage);
      const data = await response.json();
      setHistory((oldHistory) => [
        ...oldHistory,
        {
          role: "user",
          parts: Value,
        },
        {
          role: "model",
          parts: data.message,
        },
      ]);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-neutral-800 relative w-4/5 h-screen">
      <div className="header flex justify-between p-4">
        <span className="text-neutral-300 text-2xl">Gemini-1.5-flash</span>
        <span className="material-symbols-outlined text-neutral-300 large-logo-icon">
          Forum
        </span>
      </div>
      <div
        className="chatbox h-3/4 overflow-y-scroll text-neutral-400"
        ref={chatboxRef}
      >
        <div className="messages w-3/5 h-3/4 mx-auto">
          {History.map((message, index) => {
            if (message.role === "user") {
              return <UserMessage key={index} message={message.parts} />;
            } else {
              return (
                <BotMessage key={index} message={message.parts} />
              );
            }
          })}
        </div>
        <div className="chat-input absolute flex justify-between items-center w-3/5 rounded-2xl h-20 left-1/5 bottom-8 bg-neutral-700 ">
          <textarea
            type="text"
            value={Value}
            placeholder="Ask Anything"
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter" && !e.shiftKey) sendMessage();
            }}
            className="text-neutral-400 flex justify-center items-center ml-4 w-5/6 h-5/6 border-none outline-none resize-none"
          />
          <button
            type="submit"
            className="bg-violet-900 cursor-pointer text-xl mr-4 text-white px-4 py-2 rounded-4xl"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
