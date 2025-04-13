import { UserRole } from "./Api";
import { PersistentStorage } from "./PersistentStorage";

export default function DependentRoute(props: {[key in UserRole]: React.ReactNode}) {
    const role = PersistentStorage.get("current_user")?.role;
    return props[role];
}