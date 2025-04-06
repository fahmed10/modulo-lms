import { BookOutlined, HelpCenterOutlined, PendingActionsOutlined } from "@mui/icons-material";

export interface Section {
    name: string,
    path: string,
    icon: React.ReactNode,
    description: string,
}

export const SECTIONS: { [key: string]: Section } = {
    "Learn": {
        name: "Learn",
        path: "learn",
        icon: <BookOutlined />,
        description: "Complete learning objectives with guided learning activities.",
    },
    "Practice": {
        name: "Practice",
        path: "practice",
        icon: <PendingActionsOutlined />,
        description: "Practice learning objectives with randomly generated problems.",
    },
    "Guide": {
        name: "Guide",
        path: "guide",
        icon: <HelpCenterOutlined />,
        description: "Learn how to use the website. Recommended for first-time users.",
    },
}