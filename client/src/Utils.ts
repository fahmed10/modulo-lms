import BigNumber from "bignumber.js";
import { renderRichText } from "./MathUtils";

export abstract class Utils {
    public static getRandomElement<T>(array: T[]): T {
        if (array === null || array.length === 0) {
            console.error("Empty array passed to getRandomElement<T>(T[]).");
            return null as any as T;
        }

        return array[Math.floor(Math.random() * array.length)];
    }

    public static getRandomElementWhere<T>(array: T[], predicate: (item: T) => boolean): T {
        if (array === null || array.length === 0) {
            console.error("Empty array passed to getRandomElement<T>(T[], (T) => boolean).");
            return null as any as T;
        }

        array = array.filter(predicate);

        if (array.length === 0) {
            console.error("No element in the array satisfied the predicate passed to getRandomElement<T>(T[], (T) => boolean).");
            return null as any as T;
        }

        return array[Math.floor(Math.random() * array.length)];
    }

    public static getRandomElements<T>(array: T[], elements: number): T[] {
        if (elements > array.length) {
            console.error("Invalid number of elements passed to getRandomElements<T>(T[], number).");
            return null as any as T[];
        }

        let elementsArray: T[] = [];
        for (let i = 0; i < elements; i++) {
            let element: T = Utils.getRandomElement(array);
            while (elementsArray.includes(element)) {
                element = Utils.getRandomElement(array);
            }
            elementsArray.push(element);
        }

        return elementsArray;
    }

    public static randomChance(chance: number): boolean {
        return Math.random() <= chance;
    }

    public static randomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static randomNumberPrecise(min: number, max: number, precision: number): number {
        let num = null;
        while (num === null || this.toPrecision(num, precision).includes("<u>")) {
            num = Math.random() * (max - min) + min;
        }
        return num;
    }

    public static randomNumber2(min1: number, max1: number, min2: number, max2: number): number {
        return Utils.getRandomElement([this.randomNumber(min1, max1), this.randomNumber(min2, max2)]);
    }

    public static randomNumber2Precise(min1: number, max1: number, min2: number, max2: number, precision: number): number {
        return Utils.getRandomElement([this.randomNumberPrecise(min1, max1, precision), this.randomNumberPrecise(min2, max2, precision)]);
    }

    public static randomInt(min: number, maxEx: number): number {
        return Math.floor(Math.random() * (maxEx - min) + min);
    }

    public static round(value: number, places: number = 0): number {
        return Math.round(value * Math.pow(10, places)) / Math.pow(10, places);
    }

    public static toPrecision(value: number, precision: number, latex: boolean = false): string {
        let pre = new BigNumber(value).toPrecision(precision);
        let val = pre.includes("e") ? new BigNumber(pre).toString() : pre;
        if (!val.includes('.') && val[val.length - 1] === "0" && val.replace("-", "")[precision - 1] === "0") {
            val = val.replace(RegExp(`(?<=-?[^-]{${precision - 1}})(.)`), latex ? "\\underline{$1}" : "<u>$1</u>");
        }
        return val;
    }

    public static toPrecisionRich(value: number, precision: number) {
        return renderRichText(this.toPrecision(value, precision));
    }

    public static toPrecisionNumber(value: number, precision: number): number {
        return Number(new BigNumber(value).toPrecision(precision));
    }

    public static greatestCommonDenominator(a: number, b: number): number {
        [a, b] = [Math.abs(a), Math.abs(b)];
        if (b > a) {
            [a, b] = [b, a];
        }
        while (true) {
            if (b == 0) return a;
            a %= b;
            if (a == 0) return b;
            b %= a;
        }
    }
}