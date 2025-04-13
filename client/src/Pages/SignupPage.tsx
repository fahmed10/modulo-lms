import * as MUI from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Api } from "../Api";
import { PersistentStorage } from "../PersistentStorage";
import PageContainer from "./PageContainer";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    if (PersistentStorage.has("current_user")) {
        navigate("/home");
        return;
    }

    async function signup() {
        const { data } = await Api.signup(email, password, firstName, lastName);

        if (data.error) {
            setError(data.error);
        } else {
            setError(null);
            navigate("/login?new_account=y");
        }
    }

    return (
        <PageContainer className="max-w-100 mx-auto" title="Student Sign-Up">
            <MUI.Card className="flex flex-col gap-4 p-8">
                <div className="flex gap-4">
                    <MUI.TextField value={firstName} onChange={e => setFirstName(e.target.value)} type="text" label="First Name" />
                    <MUI.TextField value={lastName} onChange={e => setLastName(e.target.value)} type="text" label="Last Name" />
                </div>
                <MUI.TextField value={email} onChange={e => setEmail(e.target.value)} type="email" label="Email" />
                <MUI.TextField value={password} onChange={e => setPassword(e.target.value)} type="password" label="Password" />
                <MUI.Typography color="text.secondary">
                    Already have an account? Log in <MUI.Link className="hover:cursor-pointer" onClick={() => navigate("/login")}>here</MUI.Link>.
                </MUI.Typography>
                <MUI.Typography color="text.secondary">
                    Faculty, contact your administrator for your account login.
                </MUI.Typography>
                {error && <MUI.Alert severity="error">
                    {error}
                </MUI.Alert>}
                <MUI.Button variant="contained" onClick={signup}>Sign up</MUI.Button>
            </MUI.Card>
        </PageContainer>
    )
}