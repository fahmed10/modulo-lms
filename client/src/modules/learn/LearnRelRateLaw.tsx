import * as MUI from "@mui/material";
import { useState } from "react";
import { Text, Header, ChemBlock, MathBlock, ChemIn, MathIn, Table, renderSequential } from "../Components";
import MathExercise from "../exercises/MathExercise";
import MathChoiceExercise from "../exercises/MathChoiceExercise";
import { useNavigate, useParams } from "react-router";
import { frac, molar } from "../../MathUtils";
import { ExercisesCompletedStore, PersistentStorage } from "../../PersistentStorage";

export default function LearnRelRateLaw() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id as string;

    const delta: string = " \\Delta ";
    const space: string = "\\text{ }";

    const [exercisesCompleted, setExercisesCompleted] = useState(PersistentStorage.get<ExercisesCompletedStore>("exercises_completed", {})[id] ?? 0);
    
    function onExerciseCompleted(correct: boolean) {
        if (correct) {
            let store = PersistentStorage.get<ExercisesCompletedStore>("exercises_completed", {});
            store[id] = exercisesCompleted + 1;
            PersistentStorage.set("exercises_completed", store);
            setExercisesCompleted(e => e + 1);
        }
    }

    function exerciseNumber(number: number) {
        return {
            number: number,
            completed: exercisesCompleted >= number
        };
    }

    const relativeRate = (coefficient: number, molecule: string, reactant: boolean = false) => {
        let sign: string = reactant ? "-" : "";

        if (coefficient === 1 || coefficient === -1) {
            return `${sign} ${frac(delta + molar(molecule), delta + "t")}`;
        }

        return `${sign} ${frac(1, coefficient)} ${frac(delta + molar(molecule), delta + "t")}`;
    }

    return renderSequential(exercisesCompleted + 1,
        <>
            <Header>Writing Relative Rate Laws</Header>
            <Text>
                Relative rate laws allow us to write the rate of a reaction in terms of the rate of change of the concentrations of its reactants and products.
                For example, the following chemical equation shows the reaction of elemental magnesium with oxygen gas to form magnesium oxide:
            </Text>
            <ChemBlock equation="2 Mg + O2 -> 2 MgO" />
            <Text>The relative rate law for this chemical reaction can be written as such:</Text>
            <MathBlock equation={`\\text{rate} = ${relativeRate(2, "Mg", true)} = ${relativeRate(1, "O2", true)} = ${relativeRate(2, "MgO")}`} />
            <MUI.Typography variant="body1">
                The brackets refer to the concentration of that reactant/product, for example, <ChemIn equation="[O2]" /> is the concentration of oxygen gas.
                For the relative rate law, we only care about the change in concentration, so we write the delta symbol before it: <ChemIn equation="^d[O2]" />.
                Dividing the change in concentration by the change in time <MathIn equation={delta + "t"} /> gives us the change in concentration per second.
                Each reactant/product is multiplied by a fraction to make the rates equal regardless of their coefficients: <MathIn equation={frac(1, "coefficient")} />.
                The reactants are given a negative coefficient to make sure that the reaction rate stays positive, since the reactants
                are used up during the reaction.
            </MUI.Typography>
            <MathExercise {...exerciseNumber(1)} title="Relative Rate Laws of Reactions" prefix="\text{rate}=\text{ }" onAnswered={onExerciseCompleted} answers={["-(1)/(2)*(Delta[Ba])/(Deltat)=-(Delta[O_2])/(Deltat)=(1)/(2)*(Delta[BaO])/(Deltat)"]}>
                Write the relative rate law of this reaction: <ChemIn equation="2 Ba + O2 -> 2 BaO" />
            </MathExercise>
        </>,
        <>
            <MathExercise {...exerciseNumber(2)} title="Relative Rate Laws of Reactions" prefix="\text{rate}=\text{ }" onAnswered={onExerciseCompleted} answers={["-(Delta[N_2])/(Deltat)=-(1)/(3)*(Delta[H_2])/(Deltat)=(1)/(2)*(Delta[NH_3])/(Deltat)"]}>
                Write the relative rate law of this reaction: <ChemIn equation="N2 + 3 H2 -> 2 NH3" />
            </MathExercise>
        </>,
        <>
            <Header>Using Relative Rate Laws</Header>
            <Text>We can use the relative rate law of a reaction to perform calculations, such as finding the rate of the reaction from the rate of change of one of the products.</Text>
            <ChemBlock equation="2 Mg + O2 -> 2 MgO" />
            <Text>For example, if magnesium metal is being consumed at a rate of 0.38 M/s in this reaction, we can calculate the rate of the reaction from the relative rate law:</Text>
            <MathBlock equation={`\\text{rate} = ${relativeRate(2, "Mg", true)} = ${relativeRate(1, "O2", true)} = ${relativeRate(2, "MgO")}`} />
            <MathBlock equation={`\\text{rate} = ${relativeRate(2, "Mg", true)}`} />
            <MathChoiceExercise {...exerciseNumber(3)} latex={true} title="Relative Rate Law Calculations" choices={[molar("Mg"), delta + molar("Mg"), frac(delta + molar("Mg"), delta + "t")]} answer={2} onAnswered={onExerciseCompleted} failedMessage={_ => "Remember that the rate of change is concentration over time."}>
                What should be substituted for the rate of change of magnesium metal in the relative rate law for this reaction?
            </MathChoiceExercise>
        </>,
        <>
            <MathBlock equation={`\\text{rate} = -${frac(1, 2)}*-0.38`} />
            <MathBlock equation="\text{rate} = 0.19" />
            <Text>
                The rate of the reaction is 0.19 M/s. Notice how -0.38 was substituted into the equation instead of 0.38. This is because we were given the rate of <i>consumption</i> of
                magnesium metal. Make sure to use the correct signs when doing calculations with relative rate laws, and remember that the rate of a reaction should always be positive.
                We can now use the rate of the reaction to calculate the rate of production of magnesium oxide as well:
            </Text>
            <MathBlock equation={`\\text{rate} = ${relativeRate(2, "Mg", true)} = ${relativeRate(1, "O2", true)} = ${relativeRate(2, "MgO")}`} />
            <MathBlock equation={`\\text{rate} = ${relativeRate(2, "MgO")}`} />
            <MathBlock equation={`0.19 = ${relativeRate(2, "MgO")}`} />
            <MathBlock equation={`${frac(0.19, frac(1, 2))} = ${relativeRate(1, "MgO")}`} />
            <MathBlock equation={`${relativeRate(1, "MgO")} = 0.38`} />
            <Text>
                If the rate of the reaction is 0.19 M/s, then the rate of production of magnesium oxide will be 0.38 M/s. Notice how the rate of consumption of magnesium metal is equal
                to the rate of production of magnesium oxide. This is to be expected as they both have the same stochiometric coefficient.
            </Text>
            <MathExercise {...exerciseNumber(4)} title="Relative Rate Law Calculations" prefix={relativeRate(1, "O2") + "=" + space} suffix={frac("\\text{M}", "\\text{s}")} onAnswered={onExerciseCompleted} answers={["-0.19"]}>
                Using the above information, calculate the rate of change of oxygen gas in the above reaction.
            </MathExercise>
        </>,
        <>
            <Header>Average Rates</Header>
            <Text>
                If we have multiple data points of the concentration of a reactant or product over time in a reaction, we can calculate the average rate of the reaction
                over that time period. For example, the following data was collected for the reaction <ChemIn equation="C3H8 + 5 O2 -> 3 CO2 + 4 H2O" />:
            </Text>
            <Table width={25} data={[
                ["0.00", "0.4122"],
                ["4.00", "0.3818"],
                ["10.0", "0.3267"],
                ["15.0", "0.2891"],
                ["22.0", "0.2254"]
            ]}>
                <MathIn equation={`\\text{Time}${space}(s)`} />
                <MathIn equation={`${molar("C3H8")}${space}(M)`} />
            </Table>
            <MathExercise {...exerciseNumber(5)} title="Relative Rate Laws of Reactions" prefix="\text{rate}=\text{ }" onAnswered={onExerciseCompleted} answers={["-(Delta[C_3H_8])/(Deltat)=-(1)/(5)*(Delta[O_2])/(Deltat)=(1)/(3)*(Delta[CO_2])/(Deltat)=(1)/(4)*(Delta[H_2O])/(Deltat)"]}>
                Write the relative rate law of the above reaction.
            </MathExercise>
        </>,
        <>
            <Text>
                We can calculate the average rate of the reaction over a time period by using the relative rate law of the reaction. For example, we can calculate the
                average rate between 4.00 and 10.0 seconds:
            </Text>
            <MathBlock equation={`\\text{rate} = ${relativeRate(1, "C3H8", true)} = ${relativeRate(5, "O2", true)} = ${relativeRate(3, "CO2")} = ${relativeRate(4, "H2O")}`} />
            <MathBlock equation={`\\text{rate} = ${relativeRate(1, "C3H8", true)}`} />
            <Text>
                We will use the rate of change of <ChemIn equation="C3H8" />, because it is what we have data for in the table.
                We can expand the deltas into subtraction of their final values by their initial values:
            </Text>
            <MathBlock equation={`\\text{rate} = -${frac(`${molar("C3H8")}_f - ${molar("C3H8")}_i`, "t_f - t_i")}`} />
            <MathBlock equation={`\\text{rate} = -${frac(`0.3267 - 0.3818`, "10.0 - 4.00")}`} />
            <MathBlock equation="\text{rate} = 9.18*10^{-3}" />
            <MathExercise {...exerciseNumber(6)} title="Calculating Average Rates" prefix="\text{rate}=\text{ }" suffix={frac("\\text{M}", "\\text{s}")} onAnswered={onExerciseCompleted} answers={["0.00821", "8.21*10^-3"]}>
                Calculate the average rate of the reaction between 0.00 and 15.0 seconds.
            </MathExercise>
        </>,
        <MUI.Container className="!flex flex-col justify-center items-center mb-2">
            <MUI.Typography variant="h5" textAlign="center" className="!mt-4 !mb-4" color="green">Learning Objective Completed</MUI.Typography>
            <MUI.Box className="flex justify-center gap-2">
            <MUI.Button variant="outlined" className="max-w-fit" onClick={() => navigate("/chemistry/learn")}>Back to Learn</MUI.Button>
                <MUI.Button variant="outlined" className="max-w-fit" onClick={() => navigate("/chemistry/practice/" + id)}>Practice This Learning Objective</MUI.Button>
            </MUI.Box>
        </MUI.Container>
    );
}