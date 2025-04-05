import * as MUI from "@mui/material";
import { APP_NAME, CURRENT_CLASS } from "./Constants";
import { NavigateNext } from "@mui/icons-material";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { LEARNING_OBJECTIVES } from "./Data";
import NotificationsMenu from "./NotificationsMenu";

export default function Topbar() {
    const location = useLocation();
    const paths = ["", ...location.pathname.split('/').filter(p => p)];

    function formatPath(path: string): string {
        if (path.match(/\d+\.\d+/)) {
            let objective = LEARNING_OBJECTIVES[path];
            return `LO ${objective.id}: ${objective.title}`;
        }

        if (path === "chemistry") {
            return CURRENT_CLASS;
        }

        path = path.charAt(0).toUpperCase() + path.substring(1);
        return path;
    }

    function renderPath(path: string, last: boolean, fullPath: string) {
        if (last) {
            return <MUI.Typography key={path}>{formatPath(path)}</MUI.Typography>
        } else {
            return <MUI.Link key={path} to={fullPath} component={Link as any}>{formatPath(path)}</MUI.Link>
        }
    }

    return (
        <MUI.AppBar sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
            <MUI.Toolbar>
                <img src="/icon.svg" className="w-8 mr-3" />
                <MUI.Typography variant="h5" className="mr-8">{APP_NAME}</MUI.Typography>
                <MUI.Breadcrumbs separator={<NavigateNext />}>
                    {paths.map((path, i) => renderPath(path, i === paths.length - 1, paths.slice(0, i + 1).join("/")))}
                </MUI.Breadcrumbs>
                <div className="flex-1" />
                <NotificationsMenu />
            </MUI.Toolbar>
        </MUI.AppBar>
    );
}