import * as MUI from '@mui/material';
import { PageUtils } from "./PageUtils";
import useAxiosData from '../hooks/useAxiosData';
import { Api, Chapter, Course, LearningObjective } from '../Api';
import { useNavigate, useParams } from 'react-router';
import GridCard from '../components/GridCard';
import { ExpandMore } from '@mui/icons-material';
import Loading from '../components/Loading';
import { GridButton } from '../components/GridButton';

export default function EditLearnPage() {
    PageUtils.setTitle("Manage");

    const navigate = useNavigate();
    const { course: courseId } = useParams();
    const [course, loaded, setCourse] = useAxiosData<Course>(() => Api.getCourse(courseId!));

    async function syncCourse() {
        setCourse({ ...course });
        await Api.updateCourse(course.code, course);
    }

    async function addChapter() {
        let number = 1;
        while (course.chapters.map(c => c.number).includes(number)) {
            number++;
        }
        course.chapters.push({ name: "New Chapter", number, learningObjectives: [] });
        await syncCourse();
    }

    async function addObjective(chapter: Chapter) {
        let id = 1;
        while (chapter.learningObjectives.map(l => l.id).includes(id)) {
            id++;
        }
        chapter.learningObjectives.push({ id, dataBlocks: [], description: "", title: "New Learning Objective" });
        await syncCourse();
    }

    async function deleteChapter(chapter: Chapter) {
        if (!confirm(`Are you sure you want to delete chapter ${chapter.number}?`)) {
            return;
        }

        course.chapters = course.chapters.filter(c => c.number !== chapter.number);
        await syncCourse();
    }

    async function deleteObjective(chapter: Chapter, objective: LearningObjective) {
        if (!confirm(`Are you sure you want to delete learning objective ${objective.id}?`)) {
            return;
        }

        chapter.learningObjectives = chapter.learningObjectives.filter(l => l.id !== objective.id);
        await syncCourse();
    }

    if (!loaded) {
        return <Loading />;
    }

    if (!course) {
        navigate("/");
        return;
    }

    return (
        <MUI.Container className="!max-w-[110ch]">
            <MUI.Typography variant="h4" textAlign="center" className="pb-4">Manage</MUI.Typography>
            {Object.values(course.chapters).map(chapter => (
                <MUI.Accordion defaultExpanded key={chapter.number}>
                    <MUI.AccordionSummary expandIcon={<ExpandMore />}>
                        <MUI.Typography variant="h6">Chapter {chapter.number}: {chapter.name}</MUI.Typography>
                        <div className="flex-1" />
                        <MUI.Button onClick={e => { e.stopPropagation(); deleteChapter(chapter); }}>Delete</MUI.Button>
                    </MUI.AccordionSummary>
                    <MUI.Divider />
                    <MUI.AccordionDetails>
                        <MUI.Box className="flex flex-col gap-2 pt-2">
                            {chapter.learningObjectives.map(objective => (
                                <GridCard key={objective.id}>
                                    <MUI.Typography>L.O. {objective.id}: {objective.title}</MUI.Typography>
                                    <div className="flex-1" />
                                    <MUI.Button className="h-6" onClick={() => deleteObjective(chapter, objective)}>Delete</MUI.Button>
                                    <MUI.Button className="h-6" onClick={() => navigate(`${chapter.number}.${objective.id}`)}>Edit</MUI.Button>
                                </GridCard>
                            ))}
                            <GridButton onClick={() => addObjective(chapter)}>Add Learning Objective</GridButton>
                        </MUI.Box>
                    </MUI.AccordionDetails>
                </MUI.Accordion>
            ))}
            <GridButton elevation={0} onClick={addChapter} className="mt-4">Add Chapter</GridButton>
        </MUI.Container>
    );
};