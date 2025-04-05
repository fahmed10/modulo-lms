import * as MUI from "@mui/material";
import { useNavigate, useRouteError } from "react-router";
import { PageUtils } from "./PageUtils";

export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError() as RouteError | Error;
    PageUtils.setTitle("Error");

    function truncateString(str: string | undefined, length: number) {
        if (!str || str.length <= length) {
            return str;
        }

        return str.substring(0, length - 3) + "...";
    }

    return (
        <MUI.Container className="h-svh !flex justify-center items-center">
            <MUI.Box className="flex flex-col">
                {"data" in error ? <>
                    <MUI.Typography variant="h2" textAlign="center">{error.status} {error.statusText}</MUI.Typography>
                    <MUI.Typography variant="subtitle1" textAlign="center" color="text.secondary">{error.data}</MUI.Typography>
                    <div className="h-2" />
                    <MUI.Link variant="h5" textAlign="center" className="!w-full inline-block cursor-pointer" onClick={() => navigate("/")}>Back to homepage</MUI.Link>
                </> :
                <>
                    <MUI.Typography variant="h2" textAlign="center">An Error Has Occurred</MUI.Typography>
                    <MUI.Typography variant="subtitle1" textAlign="center" color="text.secondary">{error.name}: {error.message}</MUI.Typography>
                    <MUI.Typography variant="subtitle2" textAlign="center" color="text.secondary">At: {truncateString(error.stack, 500)}</MUI.Typography>
                    <div className="h-2" />
                    <MUI.Link variant="h5" textAlign="center" className="!w-full inline-block cursor-pointer" onClick={() => navigate("/")}>Back to homepage</MUI.Link>
                </>}
            </MUI.Box>
        </MUI.Container>
    );
}

interface RouteError {
    status: number,
    statusText: string,
    internal: boolean,
    data: string,
    error: Error,
}