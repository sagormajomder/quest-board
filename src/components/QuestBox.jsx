import React from "react";

export default function QuestBox({ bgColor, headingText, headingColor }) {
  return (
    <section className={`space-y-4 rounded-xl p-4 shadow-md ${bgColor}`}>
      <h2 className={`text-center text-xl font-semibold ${headingColor}`}>
        {headingText}
      </h2>
    </section>
  );
}
