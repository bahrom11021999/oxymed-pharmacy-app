import React, { useState } from "react";
import Header from "../components/Header";

const Support = () => {
  const prewrittenAnswers = [
    {
      question: "What is your return policy?",
      answer: "We have a 30-day return policy for all items.",
    },

    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting the Orders page.",
    },

    {
      question: "How do I contact support?",
      answer:
        "You can contact support by emailing example@gmail.com or calling +1234567890.",
    },
  ];

  const [chatMessages, setChatMessages] = useState([
    { text: "Welcome! How can I assist you today?", isUser: false },
  ]);

  const handleUserQuestion = (question) => {
    const answer = prewrittenAnswers.find(
      (faq) => faq.question.toLowerCase() === question.toLowerCase(),
    );

    if (answer) {
      setChatMessages([
        ...chatMessages,
        { text: question, isUser: true },
        { text: answer.answer, isUser: false },
      ]);
    } else {
      setChatMessages([
        ...chatMessages,
        { text: question, isUser: true },
        {
          text: "Sorry, I don't understand that question. Please ask something else.",
          isUser: false,
        },
      ]);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <Header title="Support" />

      <div className="flex h-full flex-col gap-6 rounded-lg border p-4">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={message.isUser ? "mb-2 text-right" : "mb-2 text-left"}
          >
            <span
              className={
                message.isUser
                  ? "rounded-lg bg-slate-800 px-4 py-2 text-white"
                  : "rounded-lg bg-gray-200 px-4 py-2 text-gray-700"
              }
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <input
          type="text"
          placeholder={prewrittenAnswers.map((faq) => faq.question).join(", ")}
          className="w-full rounded-lg border p-2"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim() !== "") {
              handleUserQuestion(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};

export default Support;
