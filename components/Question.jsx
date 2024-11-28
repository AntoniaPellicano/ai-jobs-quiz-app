import { useState } from "react";

function Question({ question, answers, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    onAnswer(answers[answerIndex].correct);
  };

  return (
    <div>
      <h2>{question}</h2>
      {answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(index)}
          className={`${selectedAnswer === index ? "bg-blue-500 text-white" : ""} 
                     border border-gray-300 px-4 py-2 rounded-md`}
        >
          {answer.text}
        </button>
      ))}
      {selectedAnswer !== null && (
        <p>{answers[selectedAnswer].explanation}</p>
      )}
    </div>
  );
}

export default Question;
