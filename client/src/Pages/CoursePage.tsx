import * as MUI from "@mui/material";
import { SECTIONS } from "../Data";
import { useNavigate, useParams } from "react-router";
import { PageUtils } from "./PageUtils";
import useAxiosData from "../hooks/useAxiosData";
import { Api, Course } from "../Api";

export default function CoursePage() {
    const navigate = useNavigate();
    const { course: courseId } = useParams();
    const [course] = useAxiosData<Course>(() => Api.getCourse(courseId!));

    if (!course) {
        return;
    }

    PageUtils.setTitle(course.title);

    return (
        <MUI.Container>
            <MUI.Typography variant="h4" textAlign="center" className="pb-4">{course.title}</MUI.Typography>
            <MUI.Box className="flex flex-wrap gap-4 justify-center">
                {Object.values(SECTIONS).map(section => (
                    <MUI.Card key={section.name} className="w-72 max-w-72">
                        <MUI.CardContent>
                            <MUI.Typography variant="h5" className="flex justify-center items-center gap-2" textAlign="center">{section.name} {section.icon}</MUI.Typography>
                            <MUI.Divider className="!my-1" />
                            <MUI.Typography color="text.secondary">{section.description}</MUI.Typography>
                        </MUI.CardContent>
                        <MUI.CardActions>
                            <MUI.Button onClick={() => navigate(section.path)}>Open</MUI.Button>
                        </MUI.CardActions>
                    </MUI.Card>
                ))}
            </MUI.Box>
        </MUI.Container>
    );
}