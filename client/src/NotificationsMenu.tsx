import { NotificationsOutlined } from "@mui/icons-material";
import * as MUI from "@mui/material";
import React, { useState } from "react";
import { ANNOUNCEMENTS } from "./Announcements";
import { PersistentStorage } from "./PersistentStorage";

export default function NotificationsMenu() {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    let readNotifications = PersistentStorage.get<number[]>("notifications_read", [3]);
    const [allNotificationsRead, setAllNotificationsRead] = useState(ANNOUNCEMENTS.map(a => a.id).every(a => readNotifications.includes(a)));

    function onButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        setAnchor(e.currentTarget);
        PersistentStorage.set("notifications_read", ANNOUNCEMENTS.map(a => a.id));
        setAllNotificationsRead(true);
    }

    return (
        <>
            <MUI.IconButton onClick={onButtonClick}>
                <MUI.Badge variant="dot" color="info" overlap="circular" sx={{ transform: "translate(18px, -7px)", display: allNotificationsRead ? "none !important" : "" }} />
                <NotificationsOutlined />
            </MUI.IconButton>
            <MUI.Popover open={anchor !== null} anchorEl={anchor} onClose={() => setAnchor(null)} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                <MUI.Paper className="p-2 !min-w-[35ch] !max-w-[40ch] !max-h-[55vh]">
                    <MUI.Typography variant="h5">Announcements</MUI.Typography>
                    <MUI.Divider className="!mt-1 !mb-2" />
                    <MUI.Box className="flex flex-col gap-2">
                        {ANNOUNCEMENTS.length === 0 ?
                            <MUI.Typography color="text.secondary">No Announcements</MUI.Typography> :
                            ANNOUNCEMENTS.map(announcement => (
                                <MUI.Paper key={announcement.id} elevation={2} className="p-1.5">
                                    <MUI.Typography variant="h6" className="!text-sm !mb-2">{announcement.title}</MUI.Typography>
                                    {announcement.body}
                                </MUI.Paper>
                            ))}
                    </MUI.Box>
                </MUI.Paper>
            </MUI.Popover>
        </>
    );
}