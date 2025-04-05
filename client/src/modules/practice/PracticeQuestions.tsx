import React from "react";
import { Utils } from '../../Utils';
import { ChemBlock, ChemIn, MathIn, Table } from '../Components';
import MathExercise from '../exercises/MathExercise';
import { Chem } from '../../Chem';
import TextExercise from '../exercises/TextExercise';
import MathChoiceExercise from '../exercises/MathChoiceExercise';
import { molar, space } from '../../MathUtils';

export abstract class PracticeQuestions {
    public static relRateLaw(): React.ReactElement {
        const reactions = [
            {
                formula: "C3H8 + 5 O2 -> 3 CO2 + 4 H2O",
                molecules: [
                    {
                        formula: "C3H8",
                        coefficient: -1,
                    },
                    {
                        formula: "O2",
                        coefficient: -5,
                    },
                    {
                        formula: "CO2",
                        coefficient: 3,
                    },
                    {
                        formula: "H2O",
                        coefficient: 4,
                    },
                ]
            },
            {
                formula: "4 Fe + 3 O2 -> 2 Fe2O3",
                molecules: [
                    {
                        formula: "Fe",
                        coefficient: -4,
                    },
                    {
                        formula: "O2",
                        coefficient: -3,
                    },
                    {
                        formula: "Fe2O3",
                        coefficient: 2,
                    },
                ]
            },
            {
                formula: "2 HNO3 + Mg(OH)2 -> Mg(NO3)2 + 2 H2O",
                molecules: [
                    {
                        formula: "HNO3",
                        coefficient: -2,
                    },
                    {
                        formula: "Mg(OH)2",
                        coefficient: -1,
                    },
                    {
                        formula: "Mg(NO3)2",
                        coefficient: 1,
                    },
                    {
                        formula: "H2O",
                        coefficient: 2,
                    },
                ]
            },
        ];

        let reaction = Utils.getRandomElement(reactions);
        let sigFigs = Utils.randomInt(2, 3 + 1);

        const numSigFig = (num: number) => Utils.toPrecisionNumber(num, sigFigs);
        const failedMsg = (correctAnswer: string, answerUnit: string | undefined) => (_: string) => `The answer is ${correctAnswer}${answerUnit ? " " + answerUnit : ""}.`;

        if (Utils.randomChance(1 / 3)) {
            const getFraction = (coefficient: number): string => coefficient === 1 ? "" : coefficient === -1 ? "-" : `${(coefficient < 0 ? "-" : "")}(1)/(${Math.abs(coefficient)})*`;
            const getFractionDisplay = (coefficient: number): string => coefficient === 1 ? "" : coefficient === -1 ? "-" : `${(coefficient < 0 ? "-" : "")}\\frac{1}{${Math.abs(coefficient)}}`;
            let answer = reaction.molecules.map(molecule => `${getFraction(molecule.coefficient)}(Delta[${molecule.formula.replaceAll(/([a-z]|\))(\d)/gi, "$1_$2")}])/(Deltat)`).join("=");
            let answerFormula = reaction.molecules.map(molecule => `${getFractionDisplay(molecule.coefficient)}\\frac{\\Delta [${molecule.formula.replaceAll(/([a-z]|\))(\d)/gi, "$1_$2")}]}{\\Delta t}`).join("=");

            return (
                <MathExercise answers={[answer]} failedMessage={_ => <>The answer is <MathIn equation={answerFormula} /></>} prefix="\text{rate}=\text{ }" title="Relative Rate Laws of Reactions">
                    Write the relative rate law for this reaction: <ChemIn equation={reaction.formula} />.
                </MathExercise>
            );
        } else if (Utils.randomChance(1 / 3)) {
            if (Utils.randomChance(1 / 2)) {
                let product = Utils.getRandomElementWhere(reaction.molecules, molecule => molecule.coefficient > 0);
                let rate = Utils.randomNumber2(0.01, 0.5, 0.5, 1.5);

                return (
                    <MathExercise suffix="\frac{\text{M}}{\text{s}}" failedMessage={failedMsg(Utils.toPrecision(rate * product.coefficient, sigFigs), "M/s")} answers={[Utils.toPrecision(rate * product.coefficient, sigFigs)]} prefix={`\\frac{\\Delta [${product.formula.replaceAll(/([a-z]|\))(\d)/gi, "$1_$2")}]}{\\Delta t}=\\text{ }`} title="Relative Rate Law Calculations">
                        The rate of the below reaction is {Utils.toPrecisionRich(rate, sigFigs)} M/s. What is the rate of production of <ChemIn equation={product.formula} />?
                        <ChemBlock equation={reaction.formula} />
                    </MathExercise>
                );
            } else {
                let reactant = Utils.getRandomElementWhere(reaction.molecules, molecule => molecule.coefficient < 0);
                let product = Utils.getRandomElementWhere(reaction.molecules, molecule => molecule.coefficient > 0);
                let consumptionRate = Utils.randomNumber2(0.05, 0.5, 0.5, 3);

                return (
                    <MathExercise suffix="\frac{\text{M}}{\text{s}}" failedMessage={failedMsg(Utils.toPrecision(-numSigFig(consumptionRate) / reactant.coefficient * product.coefficient, sigFigs), "M/s")} answers={[Utils.toPrecision(-numSigFig(consumptionRate) / reactant.coefficient * product.coefficient, sigFigs)]} prefix={`\\frac{\\Delta [${product.formula.replaceAll(/([a-z]|\))(\d)/gi, "$1_$2")}]}{\\Delta t}=\\text{ }`} title="Relative Rate Law Calculations">
                        In the below reaction, the rate of consumption of <ChemIn equation={reactant.formula} /> is {Utils.toPrecisionRich(consumptionRate, sigFigs)} M/s. What is the rate of production of <ChemIn equation={product.formula} />?
                        <ChemBlock equation={reaction.formula} />
                    </MathExercise>
                );
            }
        } else {
            sigFigs = 3;
            let molecule = Utils.getRandomElement(reaction.molecules);
            let rate = Utils.randomNumber(0.02, 0.045);
            let times: number[] = [0];
            let molars: number[] = [molecule.coefficient > 0 ? 0 : Utils.randomNumber(0.8 * 50 * rate, 1.6 * 50 * rate)];
            let time1;
            let time2;

            for (let i = 0; i < 5; i++) {
                times.push(times[i] + Utils.randomNumber(2, 6));
                let deltaTime = times[i + 1] - times[i];
                molars.push(molars[i] + (molecule.coefficient > 0 ? 1 : -1) * Utils.randomNumber(0.02, 0.04) * deltaTime);
            }

            [time1, time2] = Utils.getRandomElements(times, 2);
            if (time1 > time2) {
                [time1, time2] = [time2, time1];
            }

            let molar1 = molars[times.indexOf(time1)];
            let molar2 = molars[times.indexOf(time2)];
            let answer = ((numSigFig(molar2) - numSigFig(molar1)) / (numSigFig(time2) - numSigFig(time1))) / molecule.coefficient;

            return (
                <MathExercise prefix="\text{rate}=\text{ }" suffix="\frac{\text{M}}{\text{s}}" failedMessage={failedMsg(Utils.toPrecision(answer, sigFigs), "M/s")} answers={[Utils.toPrecision(answer, sigFigs)]} title="Calculating Average Rates">
                    The following data was collected for the reaction: <ChemIn equation={reaction.formula} />. Calculate the average rate of the reaction from {Utils.toPrecisionRich(time1, sigFigs)} seconds to {Utils.toPrecisionRich(time2, sigFigs)} seconds.
                    <Table width={35} data={times.map((time, i) =>
                        [Utils.toPrecision(time, sigFigs), Utils.toPrecision(molars[i], sigFigs)],
                    )}>
                        <MathIn equation={`\\text{Time}\\text{ }(s)`} />
                        <MathIn equation={`${molar(molecule.formula)}\\text{ }(M)`} />
                    </Table>
                </MathExercise>
            );
        }
    }

    public static lcp(): React.ReactElement {
        const reactions = [
            {
                formula: "N2(g) + 3 H2(g) <> 2 NH3(g)",
                molecules: [
                    {
                        formula: "N2",
                        coefficient: -1,
                        state: "g",
                    },
                    {
                        formula: "H2",
                        coefficient: -3,
                        state: "g",
                    },
                    {
                        formula: "NH3",
                        coefficient: 2,
                        state: "g",
                    },
                ]
            },
            {
                formula: "C(s) + 2 S(g) <> CS2(g)",
                molecules: [
                    {
                        formula: "C",
                        coefficient: -1,
                        state: "s",
                    },
                    {
                        formula: "S",
                        coefficient: -2,
                        state: "g",
                    },
                    {
                        formula: "CS2",
                        coefficient: 1,
                        state: "g",
                    },
                ]
            },
        ];

        let reaction = Utils.getRandomElement(reactions);

        if (Utils.randomChance(1 / 3)) {
            let molecule = Utils.getRandomElement(reaction.molecules);
            let change: "added" | "removed" = Utils.getRandomElement(["added", "removed"]);
            let answer: number;

            if (molecule.state === "s") {
                answer = 2;
            }
            else if (molecule.coefficient < 0) {
                answer = change === "added" ? 1 : 0;
            } else {
                answer = change === "added" ? 0 : 1;
            }

            return (
                <MathChoiceExercise answer={answer} title="Le Châtelier's Principle: Change in Concentration" choices={["Left", "Right", "No change"]}>
                    Which direction will the below reaction at equilibrium go if <ChemIn equation={molecule.formula} /> is {change}?
                    <ChemBlock equation={reaction.formula} />
                </MathChoiceExercise>
            );
        } else if (Utils.randomChance(1 / 3)) {
            let change: "increased" | "decreased" = Utils.getRandomElement(["increased", "decreased"]);
            let reactantGasMoles = Math.abs(reaction.molecules.filter(m => m.coefficient < 0 && m.state === "g").map(m => m.coefficient).reduce((a, b) => a + b, 0));
            let productGasMoles = reaction.molecules.filter(m => m.coefficient > 0 && m.state === "g").map(m => m.coefficient).reduce((a, b) => a + b, 0);
            let answer: number = 2;

            if (reactantGasMoles > productGasMoles) {
                answer = change === "increased" ? 0 : 1;
            } else if (reactantGasMoles < productGasMoles) {
                answer = change === "increased" ? 1 : 0;
            }

            return (
                <MathChoiceExercise answer={answer} title="Le Châtelier's Principle: Change in Volume" choices={["Left", "Right", "No change"]}>
                    Which direction will the below reaction at equilibrium go if the volume of the container is {change}?
                    <ChemBlock equation={reaction.formula} />
                </MathChoiceExercise>
            );
        } else {
            let change: "increased" | "decreased" = Utils.getRandomElement(["increased", "decreased"]);
            let enthalpy = Utils.randomInt(-200, 200);
            let answer: number;

            if (enthalpy > 0) {
                answer = change === "increased" ? 1 : 0;
            } else {
                answer = change === "increased" ? 0 : 1;
            }

            return (
                <MathChoiceExercise answer={answer} title="Le Châtelier's Principle: Change in Temperature" choices={["Left", "Right", "No change"]}>
                    Which direction will the below reaction at equilibrium go if the temperature is {change}?
                    <br className="mb-4" />
                    <ChemIn equation={reaction.formula} />
                    <MathIn equation={`${space(4)}\\Delta H_{rxn} = ${enthalpy}\\text{ }\\text{kJ}`} />
                    <br className="mb-4" />
                </MathChoiceExercise>
            );
        }
    }

    public static acidNaming(): React.ReactElement {
        let molecule = Chem.getNamedMoleculePair(Utils.getRandomElement(["binary_acid", "oxy_acid"]));

        if (Utils.randomChance(1 / 2)) {
            return (
                <TextExercise answers={[molecule.name]} mapAnswer={(a: string) => a.trim().toLowerCase()} title="Naming Acids" failedMessage={(_: any) => `The name is ${molecule.name}.`} >
                    Write the name of <ChemIn equation={molecule.formula} />.
                </TextExercise>
            );
        } else {
            return (
                <MathExercise answers={[molecule.formula]} mapAnswer={(a: string) => a.replaceAll("*", "").replaceAll("_", "")} title="Naming Acids" failedMessage={(_: any) => <>The formula is <ChemIn equation={molecule.formula} />.</>}>
                    Write the formula of {molecule.name}.
                </MathExercise>
            );
        }
    }

    public static calcPh(): React.ReactElement {
        return (
            <MathExercise answers={[]} prefix="\text{pH}=\text{ }" title="Calculating pH of Weak Acids">
                What is the pH of a solution with 2 M of the weak acid <ChemIn equation="HA" />? (<MathIn equation="K_a=3"/>)
            </MathExercise>
        )
    }
}