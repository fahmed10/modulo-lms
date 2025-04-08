import { MathExerciseProps } from "./MathExercise";

export interface ExerciseProps {
    title: string,
    number?: number,
    question?: boolean,
    state?: ExerciseState,
    onAnswered?: (answer: string) => void,
}

export type ExerciseState = "correct" | "incorrect" | "unanswered";
export type ExerciseUnionProps = MathExerciseProps;