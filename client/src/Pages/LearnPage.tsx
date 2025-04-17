import * as MUI from '@mui/material';
import { PageUtils } from "./PageUtils";
import useAxiosData from '../hooks/useAxiosData';
import { Api, Course } from '../Api';
import { useNavigate, useParams } from 'react-router';
import GridCard from './../GridCard';
import { ExpandMore } from '@mui/icons-material';
import Loading from '../Loading';

export default function LearnPage() {
    PageUtils.setTitle("Learn");

    const navigate = useNavigate();
    const { course: courseId } = useParams();
    const [course, loaded] = useAxiosData<Course>(() => Api.getCourse(courseId!));

    if (!loaded) {
        return <Loading />;
    }

    if (!course) {
        navigate("/");
        return;
    }

    return (
        <MUI.Container className="!max-w-[110ch]">
            <MUI.Typography variant="h4" textAlign="center" className="pb-4">Learn</MUI.Typography>
            {Object.values(course.chapters).map(chapter => (
                <MUI.Accordion defaultExpanded key={chapter.number}>
                    <MUI.AccordionSummary expandIcon={<ExpandMore />}>
                        <MUI.Typography variant="h6">Chapter {chapter.number}: {chapter.name}</MUI.Typography>
                    </MUI.AccordionSummary>
                    <MUI.Divider />
                    <MUI.AccordionDetails>
                        <MUI.Box className="flex flex-col gap-2 pt-2">
                            {chapter.learningObjectives.map(objective => (
                                <GridCard key={objective.id}>
                                    <MUI.Typography>L.O. {objective.id}: {objective.title}</MUI.Typography>
                                    <div className="flex-1" />
                                    <MUI.Button className="h-6" onClick={() => navigate(`${chapter.number}.${objective.id}`)}>Open</MUI.Button>
                                </GridCard>
                            ))}
                        </MUI.Box>
                    </MUI.AccordionDetails>
                </MUI.Accordion>
            ))}
        </MUI.Container>
    );
}
