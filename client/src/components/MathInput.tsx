import { useState } from "react";
import { EditableMathField } from "react-mathquill";
import { Chem } from "../Chem";

export default function MathInput({editable = true, defaultLatex = "", output}: MathInputProps) {
    const [latex, setLatex] = useState(defaultLatex);
    const [_, setText] = useState("");

    function onInputChange(field: any) {
        if (field.latex().includes("->") || field.latex().includes("<>")) {
            field.latex(field.latex().replaceAll("<>", Chem.eqArrow).replaceAll("->", Chem.arrow));
        }
        
        if (editable === false && field.latex() !== latex) {
            field.latex(latex);
            return;
        }

        if (output === undefined) {
            return;
        }

        setLatex(field.latex());
        setText(field.text());
        output.latex = field.latex();
        output.text = field.text();
    }

    return <EditableMathField style={{ maxWidth: "100%", pointerEvents: editable ? "auto" : "none", color: editable ? "white" : "darkgray" }} latex={latex} onChange={onInputChange} />;
}

export interface MathInputProps {
    defaultLatex?: string,
    editable?: boolean,
    output?: {
        latex: string,
        text: string,
    },
}