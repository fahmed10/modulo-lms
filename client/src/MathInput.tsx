import { useState } from "react";
import { EditableMathField } from "react-mathquill";
import { Chem } from "./Chem";

export default function MathInput(props: MathInputProps) {
    const [latex, setLatex] = useState(props.defaultLatex ?? "");
    const [_, setText] = useState("");

    return (
        <EditableMathField style={{ maxWidth: "100%", pointerEvents: (props.editable ?? true) ? "auto" : "none", color: (props.editable ?? true) ? "white" : "darkgray" }} latex={latex} onChange={(field) => {
            if (field.latex().includes("->") || field.latex().includes("<>")) {
                field.latex(field.latex().replaceAll("<>", Chem.eqArrow).replaceAll("->", Chem.arrow));
            }
            if (props.editable === false && field.latex() !== latex) {
                field.latex(latex);
                return;
            }
            if (props.output === undefined) {
                return;
            }

            setLatex(field.latex());
            setText(field.text());
            props.output.latex = field.latex();
            props.output.text = field.text();
        }} />
    );
}

export interface MathInputProps {
    defaultLatex?: string,
    editable?: boolean,
    output?: {
        latex: string,
        text: string,
    },
}