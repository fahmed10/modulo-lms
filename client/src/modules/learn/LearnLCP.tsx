import * as MUI from "@mui/material";
import { useState } from "react";
import { Text, Header, ChemBlock, ChemIn, MathIn, renderSequential, Accordion } from "../Components";
import MathChoiceExercise from "../exercises/MathChoiceExercise";
import { useNavigate, useParams } from "react-router";
import { ExercisesCompletedStore, PersistentStorage } from "../../PersistentStorage";

export default function LearnLCP() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id as string;

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

    return renderSequential(exercisesCompleted + 1,
        <>
            <Header>Le Châtelier's Principle</Header>
            <Text>
                A chemical reaction at equilibrium can be stressed in two ways: by changing the concentration of the reactants/products, or by changing the temperature.
                If a change in conditions causes a chemical reaction to no longer be at equilibrium, then the reaction will move in the direction which will bring it back
                to equilibrium. For example, observe the following reaction:
            </Text>
            <ChemBlock equation="N2 (g) + 3 H2 (g) <> 2 NH3 (g)" />
            <Text>
                If we have this reaction at equilibrium, and we add more reactant (for example, <ChemIn equation="N2" /> gas), the reaction will now have too much reactant,
                and the reaction will go to the right, producing product until equilibrium is re-established. Removing reactant will have the opposite effect. The reaction will have too little
                reactant (or too much product), and will go to the left until it reaches equilibrium again.
            </Text>
            <br />
            <Text>
                Adding more product will have the opposite effect as adding more reactant. Adding product will make the reaction go to the left, while removing product will cause the
                reaction to go to the right.
            </Text>
            <MathChoiceExercise {...exerciseNumber(1)} latex={false} title="Le Châtelier's Principle: Change in Concentration" onAnswered={onExerciseCompleted} answer={1} choices={["Left", "Right", "No change"]}>
                Which direction will the above reaction at equilibrium go if <ChemIn equation="H2" /> gas is added?
            </MathChoiceExercise>
        </>,
        <MathChoiceExercise {...exerciseNumber(2)} latex={false} title="Le Châtelier's Principle: Change in Concentration" onAnswered={onExerciseCompleted} answer={0} choices={["Left", "Right", "No change"]}>
            Which direction will the above reaction at equilibrium go if <ChemIn equation="N2" /> gas is <b>removed</b>?
        </MathChoiceExercise>,
        <MathChoiceExercise {...exerciseNumber(3)} latex={false} title="Le Châtelier's Principle: Change in Concentration" onAnswered={onExerciseCompleted} answer={1} choices={["Left", "Right", "No change"]}>
            Which direction will the above reaction at equilibrium go if <ChemIn equation="NH3" /> gas is removed?
        </MathChoiceExercise>,
        <>
            <Header>Changing Volume</Header>
            <Text>Let's look at a different reaction:</Text>
            <ChemBlock equation="H2O (g) + C (s) <> H2 (g) + CO (g)" />
            <Text>
                If we change the volume of the container in which this reaction is occurring, we will change the partial pressures, and therefore the concentrations, of the
                gaseous reactants/products. If the volume of the container is decreased, the reaction will shift to the side with less moles of gas, and if the volume of the
                container is increased, the reaction will shift to the side with more moles of gas.
            </Text>
            <Accordion title="Why?">
                This is because of how the total concentrations change differently on both sides. For example, if we decrease the volume of the container, the concentrations of all gaseous
                reactants/products will increase. However, the left side has only one mole of gas, while the right side has two moles. This means that the total concentration of the products
                will increase more than that of the reactants, causing there to be too much product, which will make the reaction shift left.
            </Accordion>
            <MathChoiceExercise {...exerciseNumber(4)} latex={false} title="Le Châtelier's Principle: Change in Volume" onAnswered={onExerciseCompleted} answer={1} choices={["Left", "Right", "No change"]}>
                Which direction will the above reaction at equilibrium go if the volume of the container is increased?
            </MathChoiceExercise>
        </>,
        <MathChoiceExercise {...exerciseNumber(5)} latex={false} title="Le Châtelier's Principle: Change in Concentration" onAnswered={onExerciseCompleted} answer={2} choices={["Left", "Right", "No change"]} failedMessage={_ => "Remember that solids and liquids do not appear in the reaction quotient expression."}>
            Which direction will the above reaction at equilibrium go if <ChemIn equation="C(s)" /> is removed?
        </MathChoiceExercise>,
        <>
            <Header>Changing Temperature</Header>
            <Text>
                Assume that the above reaction is endothermic, which means that <MathIn equation="\Delta H > 0" />. This means that heat is, effectively, a reactant in the reaction.
            </Text>
            <ChemBlock equation="H2O (g) + C (s) + heat <> H2 (g) + CO (g)" />
            <Text>
                Therefore, we can treat increasing the temperature like adding product, and decreasing the temperature like removing product. The opposite would be true if the reaction
                was exothermic.
            </Text>
            <MathChoiceExercise {...exerciseNumber(6)} latex={false} title="Le Châtelier's Principle: Change in Temperature" onAnswered={onExerciseCompleted} answer={0} choices={["Left", "Right", "No change"]}>
                Which direction will the above reaction at equilibrium go if the temperature is decreased?
            </MathChoiceExercise>
        </>,
        <MathChoiceExercise {...exerciseNumber(7)} latex={false} title="Le Châtelier's Principle: Change in Temperature" onAnswered={onExerciseCompleted} answer={0} choices={["Left", "Right", "No change"]}>
            If the above reaction was <b>exothermic</b>, which direction would the reaction at equilibrium go if the temperature was increased?
        </MathChoiceExercise>,
        <MUI.Container className="!flex flex-col justify-center items-center mb-2">
            <MUI.Typography variant="h5" textAlign="center" className="!mt-4 !mb-4" color="green">Learning Objective Completed</MUI.Typography>
            <MUI.Box className="flex justify-center gap-2">
                <MUI.Button variant="outlined" className="max-w-fit" onClick={() => navigate("/chemistry/learn")}>Back to Learn</MUI.Button>
                <MUI.Button variant="outlined" className="max-w-fit" onClick={() => navigate("/chemistry/practice/" + id)}>Practice This Learning Objective</MUI.Button>
            </MUI.Box>
        </MUI.Container>
    );
}