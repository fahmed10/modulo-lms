import * as MUI from '@mui/material';
import { useState } from "react";
import React from 'react';

export default function PracticeLoader(props: {question: () => React.ReactElement}) {
    const [questionsCompleted, setQuestionsCompleted] = useState(0);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<React.ReactNode>(getQuestion(currentQuestionNumber));

    function onQuestionAnswered() {
        setQuestionsCompleted(completed => completed + 1);
    }

    function getQuestion(questionNumber: number): React.ReactNode {
        return React.cloneElement(props.question(), {question: true, key: questionNumber, number: questionNumber + 1, onAnswered: onQuestionAnswered});
    }

    function nextQuestion() {
        setCurrentQuestionNumber(currentQuestionNumber + 1);
        setCurrentQuestion(getQuestion(currentQuestionNumber + 1));
    }

    return (
        <>
            {currentQuestion}
            {questionsCompleted > currentQuestionNumber && <MUI.Button variant="outlined" className="!mt-2" onClick={nextQuestion}>Next</MUI.Button>}
        </>
    );
}