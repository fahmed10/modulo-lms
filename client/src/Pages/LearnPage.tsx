import { ExpandMore } from "@mui/icons-material";
import * as MUI from '@mui/material';
import GridCard from "../GridCard";
import { CHAPTERS, LEARNING_OBJECTIVES } from "../Data";
import { useNavigate } from "react-router";
import { PageUtils } from "./PageUtils";
import { ExercisesCompletedStore, PersistentStorage } from "../PersistentStorage";

export default function LearnPage() {
    const navigate = useNavigate();
    PageUtils.setTitle("Learn");

    let exercisesCompleted = PersistentStorage.get<ExercisesCompletedStore>("exercises_completed", {});

    return (
        <MUI.Container className="!max-w-[110ch]">
            <MUI.Typography variant="h4" textAlign="center" className="pb-4">Learn</MUI.Typography>
            {Object.values(CHAPTERS).map(chapter => (
                <MUI.Accordion defaultExpanded key={chapter.number}>
                    <MUI.AccordionSummary expandIcon={<ExpandMore />}>
                        <MUI.Typography variant="h6">Chapter {chapter.number}: {chapter.name}</MUI.Typography>
                    </MUI.AccordionSummary>
                    <MUI.Divider />
                    <MUI.AccordionDetails>
                        <MUI.Box className="flex flex-col gap-2 pt-2">
                            {chapter.objectives.map(id => LEARNING_OBJECTIVES[id]).map(objective => (
                                <GridCard key={objective.id}>
                                    <MUI.Typography className="">LO {objective.id}: {objective.title}</MUI.Typography> {exercisesCompleted[objective.id] === objective.exercises && <MUI.Typography color="text.secondary" className="!pl-1">• Completed</MUI.Typography>}
                                    <div className="flex-1" />
                                    {(objective.learnElement ?
                                    <MUI.Button className="h-6" onClick={() => navigate(objective.id)}>{exercisesCompleted[objective.id] === objective.exercises ? "View" : "Begin"}</MUI.Button> :
                                    <MUI.Typography color="text.secondary">Currently Practice Only</MUI.Typography>
                                    )}
                                    
                                </GridCard>
                            ))}
                        </MUI.Box>
                    </MUI.AccordionDetails>
                </MUI.Accordion>
            ))}
        </MUI.Container>
    );
}
