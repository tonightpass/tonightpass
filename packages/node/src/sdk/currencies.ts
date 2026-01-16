import type { Currency, CurrencyConversion } from "../rest/types";
import { sdk } from "./builder";

export const currencies = sdk((client) => ({
  getRates: () => client.get("/currencies/rates"),
  convert: (conversion: CurrencyConversion) =>
    client.post("/currencies/convert", conversion),
  convertAmount: (from: Currency, to: Currency, amount: number) =>
    client.post("/currencies/convert", { from, to, amount }),
}));
