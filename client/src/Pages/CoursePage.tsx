import * as MUI from "@mui/material";
import { FACULTY_SECTIONS, SECTIONS } from "../Data";
import { useNavigate, useParams } from "react-router";
import { PageUtils } from "./PageUtils";
import useAxiosData from "../hooks/useAxiosData";
import { Api, Course } from "../Api";
import Loading from "../Loading";
import PageContainer from "./PageContainer";

export default function CoursePage({ faculty = false }: { faculty?: boolean }) {
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

    PageUtils.setTitle(course.title);

    return (
        <PageContainer title={course.title}>
            {Object.values(faculty ? FACULTY_SECTIONS : SECTIONS).map(section => (
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
        </PageContainer>
    );
}