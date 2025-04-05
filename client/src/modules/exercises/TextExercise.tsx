import * as MUI from "@mui/material";
import { ExerciseProps } from "./ExerciseProps";
import ExerciseHeader from "./ExerciseHeader";
import { renderRichText } from "../../MathUtils";
import { useState } from "react";

export default function TextExercise(props: React.PropsWithChildren<TextExerciseProps>) {
    const [exerciseCompleted, setExerciseCompleted] = useState(false);
    const [exerciseFailed, setExerciseFailed] = useState(false);
    const [lastInput, setLastInput] = useState("");
    const [answer, setAnswer] = useState("");

    let completedCorrectly = exerciseCompleted && !exerciseFailed;
    let exerciseFinished = completedCorrectly || (props.completed ?? false);

    function renderRichIfString(message: string | React.ReactNode) {
        if (typeof message === "string") {
            return renderRichText(message);
        }

        return message;
    }

    return (
        <MUI.Box className="mt-5 mb-1">
            <ExerciseHeader {...props} completed={exerciseFinished} />
            <MUI.Typography className="pb-2 inline-block" component="span" variant="body1">{props.children}</MUI.Typography>
            <br />
            {props.prefix ?? ""}
            <MUI.TextField variant="outlined" label="Answer" size="small" disabled={exerciseCompleted} onChange={e => setAnswer(e.target.value)} />
            {props.suffix ?? ""}
            <br />
            <MUI.Button disabled={exerciseCompleted} variant="contained" className="!p-1 !mt-4 !mb-2" onClick={() => {
                let input = answer;

                if (props.mapAnswer) {
                    input = props.mapAnswer(input);
                }

                setLastInput(input);

                if (props.answers.map(a => a.replaceAll(/(<u>|<\/u>)/g, "")).includes(input)) {
                    setExerciseFailed(false);
                    setExerciseCompleted(true);
                    if (props.onAnswered) {
                        props.onAnswered(true);
                    }
                } else {
                    setExerciseFailed(true);
                    if (props.onAnswered) {
                        props.onAnswered(false);
                    }
                }

                if (props.question) {
                    setExerciseCompleted(true);
                }
            }}>Submit</MUI.Button>
            {completedCorrectly && <MUI.Alert severity="success">Correct!</MUI.Alert>}
            {exerciseFailed && <MUI.Alert severity="error">Incorrect. {!props.failedMessage ? "" : renderRichIfString(props.failedMessage(lastInput))}</MUI.Alert>}
        </MUI.Box>
    );
}

export interface TextExerciseProps extends ExerciseProps {
    answers: string[],
    prefix?: string,
    suffix?: string,
    mapAnswer?: (answer: string) => string,
    failedMessage?: (input: string) => React.ReactNode | string,
}