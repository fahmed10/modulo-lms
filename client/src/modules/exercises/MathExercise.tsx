import * as MUI from "@mui/material";
import { useRef, useState } from "react";
import { MathIn } from "../Components";
import MathInput from "../../components/MathInput";
import { ExerciseProps } from "./ExerciseProps";
import ExerciseHeader from "./ExerciseHeader";
import { renderRichText, standardizeMathText } from "../../MathUtils";
import BigNumber from "bignumber.js";

export default function MathExercise(props: React.PropsWithChildren<MathExerciseProps>) {
    const [lastInput, setLastInput] = useState("");
    const { current: answer } = useRef({ latex: "", text: "" });

    let completedCorrectly = props.state === "correct";
    let exerciseFinished = props.state === "correct";

    function renderRichIfString(message: string | React.ReactNode) {
        if (typeof message === "string") {
            return renderRichText(message);
        }

        return message;
    }

    function onAnswer() {
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
        props.onAnswered?.(input);
    }


    return (
        <MUI.Box className="mt-5 mb-1">
            <ExerciseHeader {...props} completed={exerciseFinished} />
            <MUI.Typography className="pb-2 inline-block" component="span" variant="body1">{props.children}</MUI.Typography>
            <br />
            <MathIn equation={props.prefix ?? ""} />
            <MathInput editable={props.state !== "correct"} output={answer} />
            <MathIn equation={"\\text{ }" + (props.suffix ?? "")} />
            <br />
            <MUI.Button disabled={props.state === "correct"} variant="contained" className="!p-1 !mt-4 !mb-2" onClick={onAnswer}>Submit</MUI.Button>
            {completedCorrectly && <MUI.Alert severity="success">Correct!</MUI.Alert>}
            {props.state === "incorrect" && <MUI.Alert severity="error">Incorrect. {!props.failedMessage ? "" : renderRichIfString(props.failedMessage(lastInput))}</MUI.Alert>}
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