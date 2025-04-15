import * as MUI from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { FACULTY_SECTIONS, SECTIONS } from "./Data";

export default function Sidebar({ faculty = false }: { faculty?: boolean }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <MUI.Drawer variant="permanent">
            <MUI.Toolbar />
            <MUI.Box>
                <MUI.List>
                    <MUI.ListItem>
                        <MUI.Typography variant="h6">Sections</MUI.Typography>
                    </MUI.ListItem>
                    {Object.values(faculty ? FACULTY_SECTIONS : SECTIONS).map(section => (
                        <MUI.ListItem key={section.name}>
                            <MUI.ListItemButton onClick={() => navigate(section.path)} className={"!rounded-md" + (location.pathname.includes(`/${section.path}`) ? " !outline !outline-gray-200" : "")}>
                                <MUI.ListItemIcon>{section.icon}</MUI.ListItemIcon>
                                <MUI.ListItemText>{section.name}</MUI.ListItemText>
                            </MUI.ListItemButton>
                        </MUI.ListItem>
                    ))}
                </MUI.List>
            </MUI.Box>
        </MUI.Drawer>
    );
}