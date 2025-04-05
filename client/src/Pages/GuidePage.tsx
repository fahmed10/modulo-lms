import * as MUI from "@mui/material"
import MathInput from "../MathInput";
import SectionLink from "../SectionLink";
import { Header, Text } from "../modules/Components";
import { PageUtils } from "./PageUtils";

export default function GuidePage() {
    PageUtils.setTitle("Guide");

    return (
        <MUI.Box className="w-full max-w-[100ch] p-4 mx-auto">
            <MUI.Paper variant="elevation" className="p-3">
                <MUI.Typography variant="h4" textAlign="center">User Guide</MUI.Typography>
                <MUI.Divider className="pt-2 !mb-[-.75rem]" />
                <div className="h-2" />

                <Header>Guided Learning Modules</Header>
                <Text>
                    The <SectionLink section="Learn" /> section has guided learning activities organized
                    by chapter. Each learning activity will have a series of exercises. Completing an
                    exercise will reveal the next part of the learning activity, until all exercises are
                    completed. Learning activities will save your progress.
                </Text>

                <Header>Practice</Header>
                <Text>
                    The <SectionLink section="Practice" /> section allows you to practice learning objectives
                    with randomly generated questions.
                </Text>

                <Header>Math Input</Header>
                <Text>
                    Use the <kbd>/</kbd> key to enter fractions. Subscripts can be entered by typing an underscore. Forward arrows can be typed by entering '-&gt;' and equilibrium arrows can typed by entering '&lt;&gt;'. The delta symbol can be entered by pressing <kbd>\</kbd> and then typing Delta, then pressing <kbd>Enter</kbd>.
                    Try it out on the math input below:
                </Text>
                <div className="h-2" />
                <MathInput />
                <div className="h-2" />
                <Text>Questions and exercises will also accept numbers inputted in scientific notation. Use the <kbd>^</kbd> key to enter exponents.</Text>
            </MUI.Paper>
        </MUI.Box>
    );
}