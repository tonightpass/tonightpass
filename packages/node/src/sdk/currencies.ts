import { sdk } from "./builder";
import { Currency, CurrencyConversion } from "../rest/types";

export const currencies = sdk((client) => ({
  getRates: () => client.get("/currencies/rates"),
  convert: (conversion: CurrencyConversion) =>
    client.post("/currencies/convert", conversion),
  convertAmount: (from: Currency, to: Currency, amount: number) =>
    client.post("/currencies/convert", { from, to, amount }),
}));
