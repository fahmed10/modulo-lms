import * as MUI from "@mui/material";
import { useState } from "react";
import { MathIn } from "../Components";
import MathInput from "../../MathInput";
import { ExerciseProps } from "./ExerciseProps";
import ExerciseHeader from "./ExerciseHeader";
import { renderRichText, standardizeMathText } from "../../MathUtils";
import BigNumber from "bignumber.js";

export default function MathExercise(props: React.PropsWithChildren<MathExerciseProps>) {
    const [exerciseCompleted, setExerciseCompleted] = useState(false);
    const [exerciseFailed, setExerciseFailed] = useState(false);
    const [lastInput, setLastInput] = useState("");
    let answer = { latex: "", text: "" };

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
            <MathIn equation={props.prefix ?? ""} />
            <MathInput editable={!exerciseCompleted} output={answer} />
            <MathIn equation={"\\text{ }" + (props.suffix ?? "")} />
            <br />
            <MUI.Button disabled={exerciseCompleted} variant="contained" className="!p-1 !mt-4 !mb-2" onClick={() => {
                let input = standardizeMathText(answer.text);

                // Handle scientific notation
                let match = input.match(/(\d+\.?\d*)\*10\^(-?\d+)/);
                if (match) {
                    input = (BigNumber(match[1]).times(BigNumber(10).pow(BigNumber(match[2])))).toString();
                }

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

export interface MathExerciseProps extends ExerciseProps {
    answers: string[],
    prefix?: string,
    suffix?: string,
    mapAnswer?: (answer: string) => string,
    failedMessage?: (input: string) => React.ReactNode | string,
}