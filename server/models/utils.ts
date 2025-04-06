export function req(type: any, unique: boolean = false) {
    return { type, required: true, unique };
}