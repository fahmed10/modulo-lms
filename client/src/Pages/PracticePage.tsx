import { ExpandMore } from "@mui/icons-material";
import * as MUI from '@mui/material';
import GridCard from "../GridCard";
import { CHAPTERS, LEARNING_OBJECTIVES } from "../Data";
import { useNavigate } from "react-router";
import { PageUtils } from "./PageUtils";

export default function PracticePage() {
    const navigate = useNavigate();
    PageUtils.setTitle("Practice");

    return (
        <MUI.Container className="!max-w-[110ch]">
            <MUI.Typography variant="h4" textAlign="center" className="pb-4">Practice</MUI.Typography>
            {Object.values(CHAPTERS).map(chapter => (
                <MUI.Accordion defaultExpanded key={chapter.number}>
                    <MUI.AccordionSummary expandIcon={<ExpandMore />}>
                        <MUI.Typography variant="h6">Chapter {chapter.number}: {chapter.name}</MUI.Typography>
                    </MUI.AccordionSummary>
                    <MUI.Divider />
                    <MUI.AccordionDetails>
                        <MUI.Box className="flex flex-col gap-2 pt-2">
                            {chapter.objectives.map(id => LEARNING_OBJECTIVES[id]).filter(o => o.practiceElement).map(objective => (
                                <GridCard key={objective.id}>
                                    <MUI.Typography>LO {objective.id}: {objective.title}</MUI.Typography>
                                    <div className="flex-1" />
                                    <MUI.Button className="h-6" onClick={() => navigate(objective.id)}>Practice</MUI.Button>
                                </GridCard>
                            ))}
                        </MUI.Box>
                    </MUI.AccordionDetails>
                </MUI.Accordion>
            ))}
        </MUI.Container>
    );
}
