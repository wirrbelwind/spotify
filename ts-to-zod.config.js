/**
 * ts-to-zod configuration.
 *
 * @type {import("ts-to-zod").TsToZodConfig}
 */
module.exports = {
  input: "src/shared/api/spotify-types.ts",
  output: "src/shared/api/spotify-types.zod.ts",
  customJSDocFormatTypes: {
    "country-iso-alpha-2": {
      regex: "^[A-Z]{2}$",
    },
    "spotify-id": {
      regex: "^[A-Za-z0-9]+$"
    },
    "spotify-uri": {
      regex: "^spotify:[^:]+:[^:]+$"
    },
    "isrc": {
      regex: "^[A-Z]{2}[0-9A-Z]{3}[0-9]{2}[0-9]{5}$"
    },
    "ean": {
      regex: "^(?:\d{8}|\d{13})$"
    },
    "upc": {
      regex: "^(?:\d{8}|\d{12})$"
    }
  }
};
