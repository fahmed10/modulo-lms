import * as MUI from "@mui/material";
import React from "react";

export default function GridCard({ children, elevation = 2, className = "", onClick }: React.PropsWithChildren<{ elevation?: number, className?: string, onClick?: () => void }>) {
    return (
        <MUI.Paper variant="elevation" elevation={elevation} className={"flex p-2 " + className} onClick={() => onClick?.()}>
            {children}
        </MUI.Paper>
    );
}