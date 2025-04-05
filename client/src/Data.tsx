import { BookOutlined, HelpCenterOutlined, PendingActionsOutlined } from "@mui/icons-material";
import LearnRelRateLaw from "./modules/learn/LearnRelRateLaw";
import LearnLCP from "./modules/learn/LearnLCP";
import PracticeLoader from "./modules/practice/PracticeLoader";
import { PracticeQuestions } from "./modules/practice/PracticeQuestions";

export const SECTIONS: { [key: string]: Section } = {
    "Learn": {
        name: "Learn",
        path: "/chemistry/learn",
        icon: <BookOutlined />,
        description: "Complete learning objectives with guided learning activities.",
    },
    "Practice": {
        name: "Practice",
        path: "/chemistry/practice",
        icon: <PendingActionsOutlined />,
        description: "Practice learning objectives with randomly generated problems.",
    },
    "Guide": {
        name: "Guide",
        path: "/chemistry/guide",
        icon: <HelpCenterOutlined />,
        description: "Learn how to use the website. Recommended for first-time users.",
    },
}

export const CHAPTERS: { [key: number]: Chapter } = {
    12: {
        number: 12,
        name: "Kinetics",
        objectives: [
            "12.1",
        ]
    },
    13: {
        number: 13,
        name: "Fundamental Equilibrium Concepts",
        objectives: [
            "13.1",
        ]
    },
    14: {
        number: 14,
        name: "Fundamental Equilibrium Concepts",
        objectives: [
            "14.1",
            "14.2"
        ]
    },
};

export const LEARNING_OBJECTIVES: { [key: string]: LearningObjective } = {
    "12.1": {
        id: "12.1",
        title: "Using Relative Rate Laws",
        description: "Learn to interpret and write relative rate laws for chemical reactions.",
        exercises: 6,
        learnElement: <LearnRelRateLaw />,
        practiceElement: <PracticeLoader question={PracticeQuestions.relRateLaw} />,
    },
    "13.1": {
        id: "13.1",
        title: "Le Châtelier's Principle",
        description: "Learn to use Le Châtelier's principle to predict which direction a reaction will go when stressed.",
        exercises: 7,
        learnElement: <LearnLCP />,
        practiceElement: <PracticeLoader question={PracticeQuestions.lcp} />,
    },
    "14.1": {
        id: "14.1",
        title: "Naming Acids",
        description: "Learn to convert between the name and formula of an acid.",
        exercises: -999,
        learnElement: null,
        practiceElement: <PracticeLoader question={PracticeQuestions.acidNaming} />,
    },
    "14.2": {
        id: "14.2",
        title: "Calculating pH of Acid and Base Solutions",
        description: "Learn to calculate the pH of solutions containg acids and bases.",
        exercises: -999,
        learnElement: null,
        practiceElement: <PracticeLoader question={PracticeQuestions.calcPh} />,
    },
};

export interface Section {
    name: string,
    path: string,
    icon: React.ReactNode,
    description: string,
}

export interface Chapter {
    number: number,
    name: string,
    objectives: LearningObjectiveId[],
}

export interface LearningObjective {
    id: LearningObjectiveId,
    title: string,
    description: string,
    exercises: number,
    learnElement: React.ReactNode,
    practiceElement: React.ReactNode,
}

export type LearningObjectiveId = "12.1" | "13.1" | "14.1" | "14.2";