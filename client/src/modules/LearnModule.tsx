import * as MUI from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { PageUtils } from "../pages/PageUtils";
import useAxiosData from "../hooks/useAxiosData";
import { Api, Course, type DataBlocks } from "../Api";
import { ChemBlock, ChemIn, MathIn, Header, MathBlock, Text, renderSequential } from "./Components";
import MathExercise from "./exercises/MathExercise";
import { useEffect, useState } from "react";

let currentCourseId: string, currentObjectiveId: string, currentExerciseStates: boolean[] = [], refreshComponent: () => void;

export default function LearnModule() {
    const { course: courseId, id } = useParams();
    const [exerciseStates, setExerciseStates] = useState([]);
    const [course] = useAxiosData<Course>(() => Api.getCourse(courseId!), undefined, () => Api.getExerciseStates(courseId!, id!).then(({ data }) => setExerciseStates(data)));
    const [, refresh] = useState([]);
    refreshComponent = () => refresh([]);

    useEffect(() => {
        currentExerciseStates = exerciseStates;
        refresh([]);
    }, [exerciseStates]);

    if (!course) {
        return;
    }

    const objective = course.learningObjectives.find(o => `${o.chapter.number}.${o.id}` === id)!;
    currentCourseId = courseId!;
    currentObjectiveId = id!;

    PageUtils.setTitle(`Learn L.O. ${id}`);
    const dataBlocks = DataBlocks({ data: objective.dataBlocks });
    const dataSequence: React.ReactNode[] = [];

    let current = [];
    for (let i = 0; i < dataBlocks.length; i++) {
        const element = dataBlocks[i];
        if (typeof element!.type === "function" && element!.type.name.toLowerCase().includes("exercise")) {
            current.push(element);
            dataSequence.push(<>{current}</>);
            current = [];
        } else {
            current.push(element);
        }
    }

    current.push(<Finalizer />);
    dataSequence.push(<>{current}</>);

    return (
        <MUI.Box className="w-full max-w-[100ch] p-4 pb-60 mx-auto">
            <MUI.Paper variant="elevation" className="p-3">
                <MUI.Typography variant="h4" textAlign="center">{objective.title}</MUI.Typography>
                <MUI.Typography variant="subtitle1" color="text.secondary" textAlign="center">{objective.description}</MUI.Typography>
                <MUI.Divider className="pt-2 !mb-[-0.5rem]" />
                <MUI.Box className="p-1 px-2">
                    {renderSequential((currentExerciseStates ?? exerciseStates).filter(e => e).length + 1, ...dataSequence)}
                </MUI.Box>
            </MUI.Paper>
        </MUI.Box>
    );
}

function Finalizer() {
    const navigate = useNavigate();

    return (
        <MUI.Container className="!flex flex-col justify-center items-center mb-2">
            <MUI.Alert className="!mt-4 !mb-4">Learning Objective Completed</MUI.Alert>
            <MUI.Box className="flex justify-center gap-2">
                <MUI.Button variant="outlined" className="max-w-fit" onClick={() => navigate(`/${currentCourseId}/learn`)}>Back to Learn</MUI.Button>
            </MUI.Box>
        </MUI.Container>
    );
}

function DataBlocks({ data }: { data: DataBlocks[] }) {
    let exerciseNumber = 1;

    return data.map(dataBlock => {
        if (dataBlock.block === "text") {
            return {
                "text": <span>{dataBlock.value}</span>,
                "body": <Text>{dataBlock.value}</Text>,
                "header": <Header>{dataBlock.value}</Header>,
                "chem": <ChemBlock equation={dataBlock.value} />,
                "math": <MathBlock equation={dataBlock.value} />,
                "chem-inline": <ChemIn equation={dataBlock.value} />,
                "math-inline": <MathIn equation={dataBlock.value} />
            }[dataBlock.type];
        } else if (dataBlock.block === "exercise") {
            const exercise = exerciseNumber;
            if (dataBlock.exercise === "math") {
                return <MathExercise {...dataBlock} onAnswered={c => onExerciseAnswered(exercise, c)} completed={currentExerciseStates[exerciseNumber - 1]} number={exerciseNumber++}>
                    <DataBlocks data={dataBlock.body} />
                </MathExercise>
            }
        }
    });
}

function onExerciseAnswered(exerciseId: number, correct: boolean) {
    if (!correct) {
        return;
    }

    Api.markExerciseComplete(currentCourseId, currentObjectiveId, exerciseId);
    currentExerciseStates[exerciseId - 1] = true;
    refreshComponent();
}