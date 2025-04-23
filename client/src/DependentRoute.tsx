import { useNavigate } from "react-router";
import { UserRole } from "./Api";
import { PersistentStorage } from "./PersistentStorage";

export default function DependentRoute(props: { [key in UserRole]?: React.ReactNode }) {
    const navigate = useNavigate();
    const role = PersistentStorage.get("current_user")?.role;

    if (role in props) {
        return props[role];
    } else {
        navigate("/");
    }
}