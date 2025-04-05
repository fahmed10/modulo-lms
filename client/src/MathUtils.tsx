import { Chem } from "./Chem";

export function standardizeMathText(mathText: string): string {
    return mathText
        .replaceAll(/\s+/g, "")
        .replaceAll(/\* /g, "")
        .replaceAll(/\)\(/g, ")*(")
        .replaceAll(/(?<=\d)\(/g, "*(")
        .replaceAll(/(?<=[a-z])\(/gi, "*(")
        .replaceAll(/\)(?=\d)/g, ")*")
        .replaceAll(/\)(?=[a-z])/gi, ")*")
        .replaceAll(/Delta\*?([a-z])\*?/gi, "Delta$1")
        .replaceAll(/\[(\w|\d|[()*])+\]/gi, s => s.replaceAll("*", ""))
        .replaceAll(/(?<!\d)\./g, "0.")
        .trim();
}

export function frac(numerator: string | number, denominator: string | number) {
    return `\\frac{${numerator}}{${denominator}}`;
}

export function molar(molecule: string, superscript: string | null = null) {
    return `[${Chem.molecule(molecule, superscript)}]`;
}

export function space(spaces: number = 1) {
    return "\\text{ }".repeat(spaces);
}

export function renderRichText(text: string) {
    return <span dangerouslySetInnerHTML={{__html: text.replaceAll(/<(?!\/?u)/g, "&lt;").replaceAll(/(?<!u)>/g, "&gt;")}}></span>
}