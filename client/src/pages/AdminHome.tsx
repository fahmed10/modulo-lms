import * as MUI from "@mui/material";
import { useNavigate } from "react-router";
import PageContainer from "../components/PageContainer";

const ADMIN_SECTIONS = [
    {
        title: "Manage Users",
        description: "Create, delete, and view accounts for faculty.",
        path: "/manage-users"
    },
];

export default function AdminHome() {
    const navigate = useNavigate();

    return (
        <PageContainer title="Control Panel">
            {ADMIN_SECTIONS.map(section => (
                <MUI.Card key={section.title} className="w-72 max-w-72 flex flex-col">
                    <MUI.CardContent>
                        <MUI.Typography variant="h5" className="flex justify-center items-center gap-2" textAlign="center">{section.title}</MUI.Typography>
                        <MUI.Divider className="!my-1" />
                        <MUI.Typography color="text.secondary">{section.description}</MUI.Typography>
                    </MUI.CardContent>
                    <div className="flex-1" />
                    <MUI.CardActions>
                        <MUI.Button onClick={() => navigate(section.path)}>Open</MUI.Button>
                    </MUI.CardActions>
                </MUI.Card>
            ))}
        </PageContainer>
    );
}