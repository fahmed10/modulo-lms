import * as MUI from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Api } from "../Api";
import { PersistentStorage } from "../PersistentStorage";
import { useSearchParams } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const newAccount = searchParams.get("new_account");

    if (PersistentStorage.has("current_user")) {
        navigate("/home");
        return;
    }

    async function login() {
        const { data } = await Api.login(email, password);

        if (data.error) {
            setError(data.error);
        } else {
            setError(null);
            PersistentStorage.set("current_user", { role: data.role, token: data.token, name: data.role === "student" ? data.firstName : data.lastName });
            navigate("/home");
        }
    }

    return (
        <MUI.Container>
            <MUI.Typography variant="h4" textAlign="center" className="pb-4">Login</MUI.Typography>
            <MUI.Box className="flex flex-wrap gap-4 justify-center max-w-100 mx-auto">
                <MUI.Card className="flex flex-col gap-4 p-8">
                    <MUI.TextField value={email} onChange={e => setEmail(e.target.value)} type="email" label="Email" />
                    <MUI.TextField value={password} onChange={e => setPassword(e.target.value)} type="password" label="Password" />
                    <MUI.Typography color="text.secondary">
                        Don't have an account? Sign up <MUI.Link className="hover:cursor-pointer" onClick={() => navigate("/signup")}>here</MUI.Link>.
                    </MUI.Typography>
                    {error ? <MUI.Alert severity="error">
                        {error}
                    </MUI.Alert> : newAccount && <MUI.Alert severity="info">
                        Account created. Please log in.
                    </MUI.Alert>}
                    <MUI.Button variant="contained" onClick={login}>Login</MUI.Button>
                </MUI.Card>
            </MUI.Box>
        </MUI.Container>
    )
}