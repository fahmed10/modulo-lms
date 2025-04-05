import { APP_NAME } from "../Constants";

export abstract class PageUtils {
    public static setTitle(title: string) {
        document.title = `${APP_NAME} - ${title}`;
    }
}