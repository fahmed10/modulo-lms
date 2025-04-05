import { Utils } from "./Utils";

export abstract class Chem {
    static readonly arrow: string = "⭢";
    static readonly eqArrow: string = "⇌";

    static molecule(molecule: string, superscript: string | null = null) {
        return molecule.replaceAll("*", "•").replaceAll("#", "\\text{ }").replaceAll(/([A-Z][a-z]*)/g, "\\text{$1}").replaceAll(/(?<!(?: |^|•|\d|\/))((\d|\/)+)/g, "_{$1}").replaceAll(/\b([a-z]|\d|^\d) /g, "$1\\text{ }").replaceAll(/(\d+)\/(\d+)/g, "\\frac{$1}{$2}").replaceAll(/\^d/g, "\\Delta ") + (superscript != null ? `^{${superscript}}` : "");
    }

    static equation(equation: string) {
        return Chem.molecule(equation.replaceAll("<>", `#${Chem.eqArrow}#`).replaceAll("->", `#${Chem.arrow}#`));
    }

    static getNamedMoleculePair(type: "covalent" | "ionic_fixed" | "ionic_variable" | "binary_acid" | "oxy_acid") {
        interface Atom {
            symbol: string,
            name: string
        }

        interface Nonmetal extends Atom {
            endName: string,
            charge?: number
        }

        interface FixedMetal extends Atom {
            charge: number
        }

        interface VariableMetal extends Atom { }

        const greekPrefixes: { [key: number]: string } = {
            1: "mono",
            2: "di",
            3: "tri",
            4: "tetra",
            5: "penta",
            6: "hexa",
            7: "hepta",
            8: "octa",
            9: "nona",
            10: "deca",
        };
        const romanNumerals: { [key: number]: string } = {
            1: "I",
            2: "II",
            3: "III",
            4: "IV",
            5: "V",
            6: "VI",
            7: "VII",
            8: "VIII",
            9: "IX",
            10: "X"
        }
        const polyatomicIons = [
            { symbol: "NO3", charge: -1, name: null, endName: "nitrate", acidEndName: "nitric" },
            { symbol: "CO3", charge: -2, name: null, endName: "carbonate", acidEndName: "carbonic" },
            { symbol: "ClO3", charge: -1, name: null, endName: "chlorate", acidEndName: "chloric" },
            { symbol: "SO4", charge: -2, name: null, endName: "sulfate", acidEndName: "sulfuric" },
            { symbol: "PO4", charge: -3, name: null, endName: "phosphate", acidEndName: "phosphoric" },

            { symbol: "NO2", charge: -1, name: null, endName: "nitrite", acidEndName: "nitrous" },
            { symbol: "ClO2", charge: -1, name: null, endName: "chlorite", acidEndName: "chlorous" },
            { symbol: "SO3", charge: -2, name: null, endName: "sulfite", acidEndName: "sulfurous" },
            { symbol: "PO3", charge: -3, name: null, endName: "phosphite", acidEndName: "phosphorous" },

            { symbol: "HCO3", charge: -1, name: null, endName: "hydrogen carbonate", acidEndName: null },
            { symbol: "HSO4", charge: -1, name: null, endName: "hydrogen sulfate", acidEndName: null },
            { symbol: "HSO3", charge: -1, name: null, endName: "hydrogen sulfite", acidEndName: null },
            { symbol: "HPO4", charge: -2, name: null, endName: "hydrogen phosphate", acidEndName: null },

            { symbol: "C2H3O2", charge: -1, name: null, endName: "acetate", acidEndName: "acetic" },
            { symbol: "OH", charge: -1, name: null, endName: "hydroxide", acidEndName: null },
            { symbol: "CN", charge: -1, name: null, endName: "cyanide", acidEndName: null },
        ];
        const greekPrefix = (n: number, excludeMono: boolean = false): string => excludeMono && n == 1 ? "" : greekPrefixes[n];
        const ifnot1 = (n: number): string => n == 1 ? "" : n.toString();

        const nm = (symbol: string, name: string, endName: string, charge: number | undefined = undefined): Nonmetal => ({ symbol: symbol, name: name, endName: endName, charge: charge });
        const fm = (symbol: string, name: string, charge: number): FixedMetal => ({ symbol: symbol, name: name, charge: charge });
        const vm = (symbol: string, name: string): VariableMetal => ({ symbol: symbol, name: name });
        const nonmetals: Nonmetal[] = [nm("C", "carbon", "carbide"), nm("N", "nitrogen", "nitride", -3), nm("O", "oxygen", "oxide", -2), nm("F", "fluorine", "fluoride", -1), nm("S", "sulfur", "sulfide", -2), nm("Cl", "chlorine", "chloride"), nm("Br", "bromine", "bromide")];
        let fixedNonmetals: Nonmetal[] = nonmetals.filter(n => n.charge && n.charge < 0);
        const fixedMetals: FixedMetal[] = [fm("Li", "lithium", +1), fm("Na", "sodium", +1), fm("Mg", "magnesium", +2), fm("K", "potassium", +1), fm("Ca", "calcium", +2), fm("Al", "aluminum", +3)];
        const variableMetals: VariableMetal[] = [vm("Sc", "scandium"), vm("Ti", "titanium"), vm("V", "vanadium"), vm("Fe", "iron"), vm("Co", "cobalt"), vm("Ni", "nickel"), vm("Cu", "copper"), vm("Zn", "zinc")];
        const binaryNonmetals: Nonmetal[] = [nm("Cl", "chlorine", "chloric"), nm("Br", "bromine", "bromic"), nm("I", "iodine", "iodic"), nm("F", "fluorine", "fluoric")];

        let pair: { formula: string, name: string };

        return {
            "covalent": () => {
                // Covalent
                let [a1, a2] = Utils.getRandomElements(nonmetals, 2);
                let [s1, s2] = [Utils.randomInt(1, 4), Utils.randomInt(1, 7)];
                if (nonmetals.indexOf(a1) > nonmetals.indexOf(a2)) {
                    [a1, a2] = [a2, a1];
                }
                pair = { formula: `${a1.symbol}${ifnot1(s1)}${a2.symbol}${ifnot1(s2)}`, name: `${greekPrefix(s1, true)}${a1.name} ${greekPrefix(s2)}${a2.endName}` };
                let prefix = greekPrefix(s2);
                let lastChar = prefix[prefix.length - 1];
                if ("oa".includes(lastChar) && (a2.endName[0] == lastChar || (a2.endName[0] == 'o' && lastChar == 'a'))) {
                    pair.name = `${greekPrefix(s1, true)}${a1.name} ${prefix.substring(0, prefix.length - 1)}${a2.endName}`;
                }
                return pair;
            },
            "ionic_fixed": () => {
                // Ionic (Fixed Charge)
                let polyatomic = false;
                let hydrate: number | null = null;
                let [a1, a2] = [Utils.getRandomElement(fixedMetals), Utils.getRandomElement(fixedNonmetals)];
                if (Utils.randomChance(1 / 2)) {
                    a2 = Utils.getRandomElement(polyatomicIons) as any;
                    polyatomic = true;
                }
                if (Utils.randomChance(2 / 5)) {
                    hydrate = Utils.randomInt(1, 11);
                }
                let s2 = Math.abs(a1.charge);
                let s1 = Math.abs(a2.charge as any);
                let gcd = Utils.greatestCommonDenominator(s1, s2);
                [s1, s2] = [s1 / gcd, s2 / gcd];
                pair = { formula: `${a1.symbol}${ifnot1(s1)}${a2.symbol}${ifnot1(s2)}${hydrate ? `*${ifnot1(hydrate)}#H2O` : ""}`, name: `${a1.name} ${a2.endName}${hydrate ? ` ${greekPrefix(hydrate)}hydrate` : ""}` };
                if (polyatomic && s2 > 1) {
                    pair.formula = `${a1.symbol}${ifnot1(s1)}(${a2.symbol})${s2}${hydrate ? `*${ifnot1(hydrate)}#H2O` : ""}`;
                }
                return pair;
            },
            "ionic_variable": () => {
                // Ionic (Variable Charge)
                let polyatomic = false;
                let hydrate: number | null = null;
                let [a1, a2] = [Utils.getRandomElement(variableMetals), Utils.getRandomElement(fixedNonmetals)];
                if (Utils.randomChance(1 / 2)) {
                    a2 = Utils.getRandomElement(polyatomicIons) as any;
                    polyatomic = true;
                }
                if (Utils.randomChance(2 / 5)) {
                    hydrate = Utils.randomInt(1, 11);
                }
                let metalCharge = Utils.getRandomElement([1, 1, 2, 2, 3, 3, 4]);
                let s2 = Math.abs(metalCharge);
                let s1 = Math.abs(a2.charge as any);
                let gcd = Utils.greatestCommonDenominator(s1, s2);
                [s1, s2] = [s1 / gcd, s2 / gcd];
                //metalCharge /= gcd;
                pair = { formula: `${a1.symbol}${ifnot1(s1)}${a2.symbol}${ifnot1(s2)}${hydrate ? `*${ifnot1(hydrate)}#H2O` : ""}`, name: `${a1.name}(${romanNumerals[metalCharge]}) ${a2.endName}${hydrate ? ` ${greekPrefix(hydrate)}hydrate` : ""}` };
                if (polyatomic && s2 > 1) {
                    pair.formula = `${a1.symbol}${ifnot1(s1)}(${a2.symbol})${s2}${hydrate ? `*${ifnot1(hydrate)}#H2O` : ""}`;
                }
                return pair;
            },
            "binary_acid": () => {
                // Binary Acid
                let a2 = Utils.getRandomElement(binaryNonmetals);
                return { formula: `H${a2.symbol}`, name: `hydro${a2.endName} acid` };
            },
            "oxy_acid": () => {
                // Oxyacid
                let a2 = Utils.getRandomElement(polyatomicIons.filter(i => i.acidEndName));
                return { formula: `H${ifnot1(-a2.charge)}${a2.symbol}`, name: `${a2.acidEndName} acid` };
            }
        }[type]();
    }
}