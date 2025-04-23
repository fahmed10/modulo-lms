import * as MUI from "@mui/material";
import { PropsWithChildren } from "react";

export default function PageContainer({ children, title, className = "" }: PropsWithChildren<{ title: string, className?: string }>) {
    return (
        <MUI.Container>
            <MUI.Typography variant="h4" textAlign="center" className="pb-4">{title}</MUI.Typography>
            <MUI.Box className={`flex flex-wrap gap-4 justify-center ${className}`}>
                {children}
            </MUI.Box>
        </MUI.Container>
    );
}