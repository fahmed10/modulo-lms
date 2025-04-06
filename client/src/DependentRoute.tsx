import { PersistentStorage } from "./PersistentStorage";

export default function DependentRoute(props: any) {
    const role = PersistentStorage.get("current_user")?.role;
    return props[role];
}