import { NotificationsOutlined } from "@mui/icons-material";
import * as MUI from "@mui/material";
import React, { useState } from "react";
import { PersistentStorage } from "./PersistentStorage";
import useAxiosData from "./hooks/useAxiosData";
import { Announcement, Api } from "./Api";

export default function NotificationsMenu() {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    let readNotifications = PersistentStorage.get("notifications_read", []);
    const [allNotificationsRead, setAllNotificationsRead] = useState(true);
    const [announcements] = useAxiosData<Announcement[]>(Api.getAnnouncements, [], announcements => setAllNotificationsRead(announcements.map(a => a._id).every(a => readNotifications.includes(a))));

    function onButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        setAnchor(e.currentTarget);
        PersistentStorage.set("notifications_read", announcements.map(a => a._id));
        setAllNotificationsRead(true);
    }

    return (
        <>
            <MUI.IconButton onClick={onButtonClick}>
                <MUI.Badge variant="dot" color="info" overlap="circular" sx={{ transform: "translate(18px, -7px)", display: allNotificationsRead ? "none !important" : "" }} />
                <NotificationsOutlined />
            </MUI.IconButton>
            <MUI.Popover className="!max-h-[55vh]" open={anchor !== null} anchorEl={anchor} onClose={() => setAnchor(null)} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                <MUI.Paper className="p-2 !min-w-[35ch] !max-w-[40ch]">
                    <MUI.Typography variant="h5">Announcements</MUI.Typography>
                    <MUI.Divider className="!mt-1 !mb-2" />
                    <MUI.Box className="flex flex-col gap-2">
                        {announcements.length === 0 ?
                            <MUI.Typography color="text.secondary">No Announcements</MUI.Typography> :
                            announcements.map(announcement => (
                                <MUI.Paper key={announcement._id} elevation={2} className="p-1.5">
                                    <MUI.Typography variant="h6" className="!text-sm !mb-2">{announcement.title}</MUI.Typography>
                                    <MUI.Typography>{announcement.body}</MUI.Typography>
                                </MUI.Paper>
                            ))}
                    </MUI.Box>
                </MUI.Paper>
            </MUI.Popover>
        </>
    );
}