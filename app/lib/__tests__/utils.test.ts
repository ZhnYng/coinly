import {
  formatCurrency,
  formatDateToLocal,
  formatMoney,
  toLocalISOString,
} from "../utils";

describe("Utility functions", () => {
  describe("formatCurrency", () => {
    it("should format 0 cents to SGD 0.00", () => {
      const currency = formatCurrency(0); // In cents
      expect(currency.replace(/\s/g, " ")).toEqual("SGD 0.00");
    });

    it("should format 1 cent to SGD 0.01", () => {
      const currency = formatCurrency(1); // In cents
      expect(currency.replace(/\s/g, " ")).toEqual("SGD 0.01");
    });

    it("should format 999 cents to SGD 9.99", () => {
      const currency = formatCurrency(999); // In cents
      expect(currency.replace(/\s/g, " ")).toEqual("SGD 9.99");
    });

    it("should format 1000 cents to SGD 10.00", () => {
      const currency = formatCurrency(1000); // In cents
      expect(currency.replace(/\s/g, " ")).toEqual("SGD 10.00");
    });

    it("should format 1234567 cents to SGD 12345.67", () => {
      const currency = formatCurrency(1234567); // In cents
      expect(currency.replace(/\s/g, " ")).toEqual("SGD 12,345.67");
    });
  });

  describe("formatMoney", () => {
    it("should format 0 cents to 0.00", () => {
      const money = formatMoney(0); // In cents
      expect(money).toEqual("0.00");
    });

    it("should format 1 cent to 0.01", () => {
      const money = formatMoney(1); // In cents
      expect(money).toEqual("0.01");
    });

    it("should format 99 cents to 0.99", () => {
      const money = formatMoney(99); // In cents
      expect(money).toEqual("0.99");
    });

    it("should format 100 cents to 1.00", () => {
      const money = formatMoney(100); // In cents
      expect(money).toEqual("1.00");
    });

    it("should format 123 cents to 1.23", () => {
      const money = formatMoney(123); // In cents
      expect(money).toEqual("1.23");
    });

    it("should format 1000 cents to 10.00", () => {
      const money = formatMoney(1000); // In cents
      expect(money).toEqual("10.00");
    });

    it("should format 9999 cents to 99.99", () => {
      const money = formatMoney(9999); // In cents
      expect(money).toEqual("99.99");
    });
  });

  describe("formatDateToLocal", () => {
    it("should format '2024-03-03' to 'Mar 3, 2024' in en-US locale", () => {
      const formattedDate = formatDateToLocal("2024-03-03"); // Date string
      expect(formattedDate).toEqual("Mar 3, 2024");
    });

    it("should format '2024-12-25' to 'Dec 25, 2024' in en-US locale", () => {
      const formattedDate = formatDateToLocal("2024-12-25"); // Date string
      expect(formattedDate).toEqual("Dec 25, 2024");
    });

    it("should format '2024-01-01' to 'Jan 1, 2024' in en-US locale", () => {
      const formattedDate = formatDateToLocal("2024-01-01"); // Date string
      expect(formattedDate).toEqual("Jan 1, 2024");
    });

    it("should format '2024-03-03' to '3 mar 2024' in es-ES locale", () => {
      const formattedDate = formatDateToLocal('2024-03-03', 'es-ES'); // Date string with Spanish locale
      expect(formattedDate).toEqual('3 mar 2024');
    });

  });

  describe("toLocalISOString", () => {
    it("should convert UTC date to local ISO string", () => {
      const utcDate = new Date(Date.UTC(2024, 2, 3, 12, 30, 0)); // UTC date
      const localISOString = toLocalISOString(utcDate);
      // Check if the converted ISO string matches the local time zone
      expect(localISOString).toMatch(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/
      );
    });

    it("should convert UTC date with milliseconds to local ISO string", () => {
      const utcDate = new Date(Date.UTC(2024, 2, 3, 12, 30, 45, 500)); // UTC date with milliseconds
      const localISOString = toLocalISOString(utcDate);
      // Check if the converted ISO string matches the local time zone
      expect(localISOString).toMatch(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/
      );
    });

  });
});
