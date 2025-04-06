import * as MUI from "@mui/material";
import { BlockMath, InlineMath } from "react-katex";
import { Chem } from "../Chem";
import { renderRichText } from "../MathUtils";
import React from "react";
import { ExpandMore } from "@mui/icons-material";

export const Text = (props: React.PropsWithChildren) => <MUI.Typography variant="body1">{props.children}</MUI.Typography>;
export const Header = (props: React.PropsWithChildren) => <MUI.Typography variant="h5" className="pb-2 pt-3">{props.children}</MUI.Typography>;
export const ChemBlock = (props: { equation: string }) => <BlockMath>{Chem.equation(props.equation)}</BlockMath>;
export const MathBlock = (props: { equation: string }) => <BlockMath>{props.equation}</BlockMath>;
export const ChemIn = (props: { equation: string }) => <InlineMath>{Chem.equation(props.equation)}</InlineMath>;
export const MathIn = (props: { equation: string }) => <InlineMath>{props.equation}</InlineMath>;
export const Table = (props: React.PropsWithChildren<{ width: number, data: string[][] }>) => (
    <MUI.TableContainer variant="outlined" sx={{ maxWidth: props.width + "ch" }} className="m-2 mt-3" component={MUI.Paper}>
        <MUI.Table size="small">
            <MUI.TableHead>
                <MUI.TableRow>
                    {(props.children as React.ReactNode[]).map((child, i) => (
                        <MUI.TableCell key={i} sx={{ border: "1px solid rgba(81,81,81,1)" }} align="center">{child}</MUI.TableCell>
                    ))}
                </MUI.TableRow>
            </MUI.TableHead>
            <MUI.TableBody>
                {props.data.map((row, i) => (
                    <MUI.TableRow key={i}>
                        {row.map((cell, i) => (
                            <MUI.TableCell key={i} sx={{ border: "1px solid rgba(81,81,81,1)" }} align="center">{renderRichText(cell)}</MUI.TableCell>
                        ))}
                    </MUI.TableRow>
                ))}
            </MUI.TableBody>
        </MUI.Table>
    </MUI.TableContainer>
);
export const Accordion = (props: React.PropsWithChildren<{ title: string }>) => (
    <MUI.Accordion elevation={2} className="before:!h-0 my-2">
        <MUI.AccordionSummary expandIcon={<ExpandMore />}>
            {props.title}
        </MUI.AccordionSummary>
        <MUI.Divider />
        <MUI.AccordionDetails>
            {props.children}
        </MUI.AccordionDetails>
    </MUI.Accordion>
);

export function renderSequential(showCount: number, ...elements: React.ReactNode[]): React.ReactNode[] {
    return elements.slice(0, showCount).map((component, i) => <React.Fragment key={i}>{component}</React.Fragment>);
}