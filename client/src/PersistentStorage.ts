export abstract class PersistentStorage {
    public static set(key: PersistentStorageKey, value: object) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static get<T>(key: PersistentStorageKey, defaultValue: T): T {
        let item = localStorage.getItem(key);

        if (item === null) {
            return defaultValue;
        }

        return JSON.parse(item);
    }
}

export type PersistentStorageKey = "notifications_read" | "exercises_completed" | "run_once";
export type ExercisesCompletedStore = { [key: string]: number };
export type RunOnceStore = number[];