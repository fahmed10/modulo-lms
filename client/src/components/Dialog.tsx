import * as MUI from "@mui/material";
import { useEffect, useState } from "react";

const dialogs: { [id: string]: () => void } = {};

export function showDialog(id: string) {
    dialogs[id]();
}

export default function Dialog<T extends string>({ content, id, title, actions = ["Cancel", "OK"] as T[], onAction }: DialogProps<T>) {
    const [open, setOpen] = useState(false);
    const [localState, setLocalState] = useState<any>({});

    useEffect(() => {
        dialogs[id] = () => setOpen(true);
        return () => { delete dialogs[id]; }
    }, []);

    function setDialogState(key: string, value: any) {
        setLocalState({ ...localState, [key]: value });
    }

    async function actionClicked(action: T) {
        let result = onAction?.(action, localState);

        if (result instanceof Promise) {
            result = await result;
        }

        if (result) {
            setOpen(false);
            setLocalState({});
        }
    }

    return (
        <MUI.Dialog onClose={() => setOpen(false)} open={open} id="mui-dialog-modal">
            {title && <MUI.DialogTitle>{title}</MUI.DialogTitle>}
            <MUI.DialogContent className="!pt-5">{typeof content === "function" ? content(localState, setDialogState) : content}</MUI.DialogContent>
            <MUI.DialogActions>
                {actions.map(action => (
                    <MUI.Button key={action} onClick={() => actionClicked(action)}>{action}</MUI.Button>
                ))}
            </MUI.DialogActions>
        </MUI.Dialog>
    );
}

export interface DialogProps<T extends string> {
    content: string | ((state: any, setState: (key: string, value: any) => void) => React.ReactNode),
    title?: string,
    actions?: T[],
    id: string,
    onAction?: (action: T, state: any) => boolean | void | Promise<boolean | void>
}