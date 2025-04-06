import * as MUI from "@mui/material";

export default function ExerciseHeader(props: ExerciseHeaderProps) {
    return (
        <span className="flex gap-2 items-center mb-2">
            <MUI.Chip label={(props.question ? "Question " : "Exercise ") + props.number} color={props.question ? "info" : "success"} variant={props.completed ? "filled" : "outlined"} />
            <MUI.Typography variant="h6">{props.title}</MUI.Typography>
        </span>
    );
}

export interface ExerciseHeaderProps {
    number?: number,
    title: string,
    completed: boolean,
    question?: boolean,
}