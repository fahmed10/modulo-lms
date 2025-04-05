import { PersistentStorage, RunOnceStore } from "./PersistentStorage";

export abstract class RunOnce {
    private static functions: Array<() => void> = [
        
    ];

    public static run() {
        let store = PersistentStorage.get<RunOnceStore>("run_once", []);
        for (let i = 0; i < this.functions.length; i++) {
            if (!store.includes(i)) {
                this.functions[i]();
                store.push(i);
                PersistentStorage.set("run_once", store);
            }
        }
    }
}