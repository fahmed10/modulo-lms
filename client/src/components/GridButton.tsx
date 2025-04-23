import * as MUI from '@mui/material';
import { Add } from '@mui/icons-material';
import { PropsWithChildren } from "react"
import GridCard from './GridCard';

export function GridButton({ onClick, elevation = 1, children, className = "" }: PropsWithChildren<{ onClick?: () => void, elevation?: number, className?: string }>) {
    return (
        <GridCard elevation={elevation} className={"justify-center !shadow-none border border-slate-600 cursor-pointer " + className} onClick={onClick}>
            <Add className="text-blue-300" />
            <MUI.Typography className="text-blue-300">{children}</MUI.Typography>
        </GridCard>
    );
}