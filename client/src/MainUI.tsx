import * as MUI from "@mui/material";
import Topbar, { TopbarProps } from "./Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

export default function MainUI({ showSidebar = false, showAnnouncements = false, faculty = false, content = <Outlet /> }: MainUIProps) {
    return (
        <>
            <MUI.Box className="flex">
                <Topbar showAnnouncements={showAnnouncements} />
                <MUI.Toolbar />
                {showSidebar && <Sidebar faculty={faculty} />}
            </MUI.Box>
            <MUI.Box className="flex mt-4 pl-[140px]">
                <MUI.Toolbar />
                {content}
            </MUI.Box>
        </>
    );
}

export interface MainUIProps extends TopbarProps {
    showSidebar?: boolean,
    content?: React.ReactNode,
    faculty?: boolean
}