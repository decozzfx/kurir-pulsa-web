import numbro from "numbro";

function Numbro(locale = "us") {
  numbro.registerLanguage({
    languageTag: "id-ID",
    delimiters: {
      thousands: ",",
      decimal: ".",
    },
    abbreviations: {
      thousand: "rb",
      million: "jt",
      billion: "m",
      trillion: "t",
    },
    ordinal: (number) => (number === 1 ? "pertama" : `ke-${number}`),
    currency: {
      symbol: "Rp.",
      position: "prefix",
      code: "IDR",
    },
    currencyFormat: {
      thousandSeparated: true,
    },
    formats: {
      fourDigits: {
        totalLength: 4,
        spaceSeparated: false,
        average: false,
      },
      fullWithTwoDecimals: {
        output: "currency",
        mantissa: 2,
        thousandSeparated: true,
        spaceSeparated: false,
      },
      fullWithTwoDecimalsNoCurrency: {
        optionalMantissa: true,
        mantissa: 2,
        thousandSeparated: true,
      },
      fullWithNoDecimals: {
        optionalMantissa: true,
        output: "currency",
        spaceSeparated: false,
        thousandSeparated: true,
        mantissa: 2,
      },
    },
  });

  const defaultTag = locale === "id" || locale === "IDR" ? "id-ID" : "en-US";
  const fallbackTag = defaultTag === "id-ID" ? "en-US" : "id-ID";

  numbro.setLanguage(defaultTag, fallbackTag);

  return numbro;
}

function formatCurrency(value: string, locale = "id") {
  const val = Numbro(locale);
  if (value == null) {
    return undefined;
  }
  try {
    return val(parseFloat(value)).format({
      thousandSeparated: true,
      mantissa: 0,
    });
  } catch (e) {
    return value;
  }
}

function unformatCurrency(value: string, locale = "id") {
  const val = Numbro(locale);
  if (value == null) {
    return undefined;
  }
  try {
    return val.unformat(value, {
      thousandSeparated: true,
      mantissa: 0,
    });
  } catch (e) {
    return value;
  }
}

function formatDecimal(value: string, decimal = 3) {
  const val = Numbro("id");
  if (value == null) {
    return undefined;
  }
  try {
    return val(Number(value)).format({
      mantissa: decimal,
      thousandSeparated: true,
      trimMantissa: true,
      roundingFunction: (newValue) =>
        newValue >= 0 ? Math.floor(newValue) : Math.ceil(newValue),
    });
  } catch (e) {
    return value;
  }
}

export default { formatCurrency, unformatCurrency, formatDecimal };
