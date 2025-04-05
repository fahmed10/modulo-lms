/*import * as MUI from "@mui/material";
import SectionLink from "./SectionLink";*/

export const ANNOUNCEMENTS: Announcement[] = [
    /*{
        id: 1,
        title: "New Learning Objectives Added",
        body: <MUI.Typography>Added LO 13.1 and 13.2 in <SectionLink section="Learn" /></MUI.Typography>
    },
    {
        id: 0,
        title: "New Learning Objectives Added",
        body: <MUI.Typography>Added LO 13.1 and 13.2 in <SectionLink section="Learn" /></MUI.Typography>
    },*/
]

export interface Announcement {
    id: number,
    title: string,
    body: React.ReactNode,
}