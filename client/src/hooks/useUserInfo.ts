import { PersistentStorage } from "../PersistentStorage";

export default function useUserInfo() {
    return PersistentStorage.get("current_user");
}