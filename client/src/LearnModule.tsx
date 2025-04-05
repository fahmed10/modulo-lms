import * as MUI from "@mui/material";
import { useParams } from "react-router";
import { LEARNING_OBJECTIVES } from "./Data";
import { PageUtils } from "./Pages/PageUtils";

export default function LearnModule() {
    const params = useParams();
    const objective = LEARNING_OBJECTIVES[params.id as string];
    PageUtils.setTitle("Learn LO " + objective.id);

    return (
        <MUI.Box className="w-full max-w-[100ch] p-4 pb-60 mx-auto">
            <MUI.Paper variant="elevation" className="p-3">
                <MUI.Typography variant="h4" textAlign="center">{objective.title}</MUI.Typography>
                <MUI.Typography variant="subtitle1" color="text.secondary" textAlign="center">{objective.description}</MUI.Typography>
                <MUI.Divider className="pt-2 !mb-[-0.5rem]" />
                <MUI.Box className="p-1 px-2">
                    {objective.learnElement}
                </MUI.Box>
            </MUI.Paper>
        </MUI.Box>
    )
}