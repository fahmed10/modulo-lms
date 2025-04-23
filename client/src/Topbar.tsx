import * as MUI from "@mui/material";
import { APP_NAME } from "./Constants";
import { NavigateNext } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import NotificationsMenu from "./NotificationsMenu";
import { PersistentStorage } from "./PersistentStorage";

export default function Topbar({ showAnnouncements = false }: TopbarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const paths = ["", ...location.pathname.split('/').filter(p => p)];
    const currentUser = PersistentStorage.get("current_user");

    function formatPath(path: string): string {
        if (path.match(/\d+\.\d+/)) {
            return `L.O. ${path}`;
        }

        const isCourseCode = path.match(/^\w{4}-\d{3,4}\w?$/);
        path = path.replace('-', ' ')
        path = isCourseCode ? path.toUpperCase() : path.replace(/\b\w/g, c => c.toUpperCase());
        return path;
    }

    function renderPath(path: string, last: boolean, fullPath: string) {
        if (last) {
            return <MUI.Typography key={path}>{formatPath(path)}</MUI.Typography>
        } else {
            return <MUI.Link key={path} to={fullPath} component={Link as any}>{formatPath(path)}</MUI.Link>
        }
    }

    function logout() {
        PersistentStorage.delete("current_user");
        navigate("/login");
    }

    return (
        <MUI.AppBar sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
            <MUI.Toolbar>
                <img src="/icon.svg" className="w-8 mr-3" onClick={() => navigate("/")} />
                <MUI.Typography variant="h5" className={!["/home", "/login", "/signup"].some(r => r === location.pathname) ? "mr-8 !text-blue-300 underline hover:cursor-pointer" : "mr-8"} onClick={() => navigate("/home")}>{APP_NAME}</MUI.Typography>
                <MUI.Breadcrumbs separator={<NavigateNext />}>
                    {paths.map((path, i) => renderPath(path, i === paths.length - 1, paths.slice(0, i + 1).join("/")))}
                </MUI.Breadcrumbs>
                <div className="flex-1" />
                {currentUser && <MUI.Typography className="!mr-2">Logged in as {currentUser.name}</MUI.Typography>}
                {currentUser && <MUI.Button onClick={logout}>Logout</MUI.Button>}
                {showAnnouncements && <NotificationsMenu />}
            </MUI.Toolbar>
        </MUI.AppBar>
    );
}

export interface TopbarProps {
    showAnnouncements?: boolean
}