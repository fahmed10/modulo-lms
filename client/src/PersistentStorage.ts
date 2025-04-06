export abstract class PersistentStorage {
    public static has(key: PersistentStorageKey) {
        return localStorage.getItem(key) !== null;
    }

    public static set<T extends PersistentStorageKey>(key: T, value: StoreMap[T]) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static get<T extends PersistentStorageKey>(key: T, defaultValue?: StoreMap[T]): StoreMap[T] {
        let item = localStorage.getItem(key);

        if (item === null) {
            return defaultValue!;
        }

        return JSON.parse(item);
    }

    public static delete(key: PersistentStorageKey) {
        localStorage.removeItem(key);
    }
}

export type PersistentStorageKey = "notifications_read" | "current_user";
type StoreMap = {
    "notifications_read": string[],
    "current_user": { role: "admin" | "faculty" | "student", name: string, token: string }
}