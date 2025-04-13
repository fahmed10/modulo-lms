import * as MUI from "@mui/material";
import { Api, Course } from "../Api";
import useAxiosData from "../hooks/useAxiosData";
import { useNavigate } from "react-router";
import Loading from "../Loading";

export default function CoursesPage() {
    const navigate = useNavigate();
    const [courses] = useAxiosData<Course[]>(Api.getCourses, []);

    return (
        <MUI.Container>
            <MUI.Typography variant="h4" textAlign="center" className="pb-4">Courses</MUI.Typography>
            <MUI.Box className="flex flex-wrap gap-4 justify-center">
                {Object.values(courses).map(course => (
                    <MUI.Card key={course._id} className="w-72 max-w-72">
                        <MUI.CardContent>
                            <MUI.Typography variant="h5" className="flex justify-center items-center gap-2" textAlign="center">{course.codeLong}</MUI.Typography>
                            <MUI.Typography className="text-center" color="text.secondary">{course.title}</MUI.Typography>
                        </MUI.CardContent>
                        <MUI.CardActions>
                            <MUI.Button onClick={() => navigate(`/${course.code}`)}>Open</MUI.Button>
                        </MUI.CardActions>
                    </MUI.Card>
                ))}
            </MUI.Box>
        </MUI.Container>
    );
}