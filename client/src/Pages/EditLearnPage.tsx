import * as MUI from '@mui/material';
import { PageUtils } from "./PageUtils";
import useAxiosData from '../hooks/useAxiosData';
import { Api, Course } from '../Api';
import { useNavigate, useParams } from 'react-router';
import GridCard from './../GridCard';
import { Add, ExpandMore, HdrPlus, PlusOne } from '@mui/icons-material';
import Loading from '../Loading';
import { PropsWithChildren } from 'react';

export default function EditLearnPage() {
    PageUtils.setTitle("Manage");

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

    const objectiveGroups = Object.groupBy(course.learningObjectives, lo => lo.chapter.number);

    return (
        <MUI.Container className="!max-w-[110ch]">
            <MUI.Typography variant="h4" textAlign="center" className="pb-4">Manage</MUI.Typography>
            {Object.values(objectiveGroups).filter(group => group != null).map(group => (
                <MUI.Accordion defaultExpanded key={group[0].chapter.number}>
                    <MUI.AccordionSummary expandIcon={<ExpandMore />}>
                        <MUI.Typography variant="h6">Chapter {group[0].chapter.number}: {group[0].chapter.name}</MUI.Typography>
                    </MUI.AccordionSummary>
                    <MUI.Divider />
                    <MUI.AccordionDetails>
                        <MUI.Box className="flex flex-col gap-2 pt-2">
                            {group.map(objective => (
                                <GridCard key={objective.id}>
                                    <MUI.Typography>L.O. {objective.id}: {objective.title}</MUI.Typography>
                                    <div className="flex-1" />
                                    <MUI.Button className="h-6" onClick={() => navigate(`${objective.chapter.number}.${objective.id}`)}>Edit</MUI.Button>
                                </GridCard>
                            ))}
                            <GridButton>Add Learning Objective</GridButton>
                        </MUI.Box>
                    </MUI.AccordionDetails>
                </MUI.Accordion>
            ))}
            <GridButton elevation={0}>Add Chapter</GridButton>
        </MUI.Container>
    );
};

function GridButton({ onClick, elevation = 1, children }: PropsWithChildren<{ onClick?: () => void, elevation?: number }>) {
    return (
        <GridCard elevation={1} className="justify-center !shadow-none border border-slate-600 cursor-pointer" onClick={onClick}>
            <Add className="text-blue-300" />
            <MUI.Typography className="text-blue-300">{children}</MUI.Typography>
        </GridCard>
    );
}