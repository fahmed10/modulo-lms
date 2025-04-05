import * as MUI from "@mui/material";
import React from "react";

export default function GridCard(props: React.PropsWithChildren) {
  return (
    <MUI.Paper variant="elevation" elevation={2} className="flex p-2">
        {props.children}
    </MUI.Paper>
  );
}