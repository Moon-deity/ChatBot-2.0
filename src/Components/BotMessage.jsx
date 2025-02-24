import React from "react";
import { marked } from "marked";

const BotMessage = (props) => {
  const text = marked.parse(props.message);
  return (
    <div
      key={props.index}
      className="bot-message flex flex-col items-start my-2 gap-2"
    >
      <div className="bg-black rounded-4xl w-5 h-5"></div>
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        className="bg-neutral-700 rounded-3xl w-3/4 h-fit p-2"
      ></div>
    </div>
  );
};

export default BotMessage;
