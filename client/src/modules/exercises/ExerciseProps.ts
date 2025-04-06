import { MathExerciseProps } from "./MathExercise";

export interface ExerciseProps {
    title: string,
    number?: number,
    question?: boolean,
    completed?: boolean,
    onAnswered?: (correct: boolean) => void,
}

export type ExerciseUnionProps = MathExerciseProps;