import * as MUI from "@mui/material";
import { Api, Course } from "../Api";
import useAxiosData from "../hooks/useAxiosData";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";
import PageContainer from "../components/PageContainer";

export default function CoursesPage({ faculty = false }: { faculty?: boolean }) {
    const navigate = useNavigate();
    const [courses, loaded] = useAxiosData<Course[]>(Api.getCourses, []);

    if (!loaded) {
        return <Loading />;
    }

    return (
        <PageContainer title="Courses">
            {Object.values(courses).map(course => (
                <MUI.Card key={course._id} className="w-72 max-w-72">
                    <MUI.CardContent>
                        <MUI.Typography variant="h5" className="flex justify-center items-center gap-2" textAlign="center">{course.codeLong}</MUI.Typography>
                        <MUI.Typography className="text-center" color="text.secondary">{course.title}</MUI.Typography>
                    </MUI.CardContent>
                    <MUI.CardActions>
                        <MUI.Button onClick={() => navigate(`/${course.code}`)}>{faculty ? "Manage" : "Open"}</MUI.Button>
                    </MUI.CardActions>
                </MUI.Card>
            ))}
        </PageContainer>
    );
}