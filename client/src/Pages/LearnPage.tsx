import * as MUI from '@mui/material';
import { PageUtils } from "./PageUtils";

export default function LearnPage() {
    PageUtils.setTitle("Learn");

    return (
        <MUI.Container className="!max-w-[110ch]">
            <MUI.Typography variant="h4" textAlign="center" className="pb-4">Learn</MUI.Typography>
        </MUI.Container>
    );
}
