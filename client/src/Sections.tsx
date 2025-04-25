import { BookOutlined, HelpCenterOutlined, People } from "@mui/icons-material";

export const SECTIONS = {
    student: [
        {
            name: "Learn",
            path: "learn",
            icon: <BookOutlined />,
            description: "Complete learning objectives with guided learning activities.",
        },
        {
            name: "Guide",
            path: "guide",
            icon: <HelpCenterOutlined />,
            description: "Learn how to use the website. Recommended for first-time users.",
        },
    ],
    faculty: [
        {
            name: "Manage Activities",
            path: "manage-activities",
            icon: <BookOutlined />,
            description: "View, create, edit, and delete chapters and learning activities.",
        },
    ],
    admin: [
        {
            name: "Manage Users",
            path: "/manage-users",
            icon: <People />,
            description: "Create, delete, and view accounts for faculty.",
        },
        {
            name: "Manage Courses",
            path: "/manage-courses",
            icon: <BookOutlined />,
            description: "Create and delete courses.",
        },
    ]
} as const;