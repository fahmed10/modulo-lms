import { useNavigate } from "react-router";
import { UserRole } from "./Api";
import useUserInfo from "./hooks/useUserInfo";

export default function DependentRoute(props: { [key in UserRole | "other"]?: React.ReactNode }) {
    const navigate = useNavigate();
    const { role } = useUserInfo();

    if (role in props) {
        return props[role];
    } else if (props.other) {
        return props.other;
    } else {
        navigate("/");
    }
}