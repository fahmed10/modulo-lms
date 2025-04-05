import * as MUI from "@mui/material";
import React, { useState } from "react";
import { MathIn } from "../Components";
import { ExerciseProps } from "./ExerciseProps";
import ExerciseHeader from "./ExerciseHeader";
import { renderRichText } from "../../MathUtils";

export default function MathChoiceExercise(props: React.PropsWithChildren<MathChoiceExerciseProps>) {
    const [exerciseCompleted, setExerciseCompleted] = useState(false);
    const [exerciseFailed, setExerciseFailed] = useState(false);
    const [lastChoice, setLastChoice] = useState(-1);
    const [choicesSelected, setChoicesSelected] = useState<number[]>([]);

    let completedCorrectly = exerciseCompleted && !exerciseFailed;
    let exerciseFinished = exerciseCompleted || (props.completed ?? false);

    function renderRichIfString(message: string | React.ReactNode) {
        if (typeof message === "string") {
            return renderRichText(message);
        }

        return message;
    }

    return (
        <MUI.Box className="mt-5 mb-1">
            <ExerciseHeader {...props} completed={completedCorrectly || exerciseFinished} />
            <MUI.Typography className="!mb-3 inline-block" component="span" variant="body1">{props.children}</MUI.Typography>
            <br />
            {props.choices.map((choice, i) => (
                <MUI.Button variant="outlined" key={choice} disabled={exerciseFinished || choicesSelected.includes(i)} sx={{ textTransform: 'none', borderColor: exerciseFinished && i === props.answer ? "darkgreen !important" : "" }} className={props.latex ? "!p-2 !mr-3 !mb-3 !text-xl" : "!p-1 !mr-2 !mb-3 !text-md"} onClick={() => {
                    setLastChoice(i);
                    if (i === props.answer) {
                        setExerciseFailed(false);
                        setExerciseCompleted(true);
                        if (props.onAnswered) {
                            props.onAnswered(true);
                        }
                    } else {
                        setExerciseFailed(true);
                        if (props.question) {
                            setExerciseCompleted(true);
                        }
                        setChoicesSelected([...choicesSelected, i]);
                        if (props.onAnswered) {
                            props.onAnswered(false);
                        }
                    }
                }}>{props.latex ? <MathIn equation={choice} /> : choice}</MUI.Button>
            ))}
            {completedCorrectly && <MUI.Alert severity="success">Correct!</MUI.Alert>}
            {exerciseFailed && <MUI.Alert severity="error">Incorrect. {!props.failedMessage ? "" : renderRichIfString(props.failedMessage(lastChoice))}</MUI.Alert>}
        </MUI.Box>
    );
}

export interface MathChoiceExerciseProps extends ExerciseProps {
    choices: string[],
    answer: number,
    latex?: boolean,
    failedMessage?: (i: number) => React.ReactNode | string,
}