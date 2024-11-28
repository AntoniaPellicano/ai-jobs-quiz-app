import { useState, useEffect } from "react";
import { useStore } from "zustand";
import { quizData } from "../data";
import Question from "../components/Question";
import Progress from "../components/Progress";
import Results from "../components/Results";

const useQuizStore = create((set) => ({
  currentQuestion: 0,
  score: 0,
  numParticipants: 0, // Simulazione
  answers: [],
  incrementQuestion: () => set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  updateScore: (correct) => set((state) => ({ score: state.score + (correct ? 1 : 0) })),
  addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer] })),
  resetQuiz: () => set({ currentQuestion: 0, score: 0, answers: [] }),
}));

function Quiz() {
  const { currentQuestion, score, numParticipants, incrementQuestion, updateScore, addAnswer, resetQuiz } = useQuizStore();

  useEffect(() => {
    // Simulazione aumento partecipanti
    const interval = setInterval(() => {
      setNumParticipants((prev) => Math.min(prev + Math.floor(Math.random() * 10), 2000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (correct) => {
    updateScore(correct);
    addAnswer(correct);
    setTimeout(() => {
      incrementQuestion();
    }, 2000); // Mostra la spiegazione per 2 secondi
  };

  if (currentQuestion >= quizData.length) {
    return <Results score={score} answers={answers} onRestart={resetQuiz} />;
  }

  return (
    <div className="container mx-auto p-4">
      <Progress current={currentQuestion + 1} total={quizData.length} />
      <p>Partecipanti: {numParticipants}</p>
      <Question
        question={quizData[currentQuestion].question}
        answers={quizData[currentQuestion].answers}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default Quiz;
