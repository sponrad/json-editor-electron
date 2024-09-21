import { RJSFSchema } from "@rjsf/utils";

export const nameAge: RJSFSchema = {
  title: 'Test form',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    age: {
      type: 'number',
    },
  },
};

export const numbersAndWidgets: RJSFSchema = {
  type: "object",
  title: "Number fields and widgets",
  properties: {
    schema_path: {
      title: "Schema path",
      type: "string"
    },
    integerRangeSteps: {
      title: "Integer range (by 10)",
      type: "integer",
      minimum: 50,
      maximum: 100,
      multipleOf: 10
    },
    event: {
      type: "string",
      format: "date"
    },
    sky_colour: {
      type: "string"
    },
    names: {
      type: "array",
      items: [
        {
          type: "string",
          pattern: "[a-zA-Z\-'\s]+",
          enum: ["Jack", "Jill"]
        },
        {
          type: "string",
          pattern: "[a-zA-Z\-'\s]+",
          enum: ["Alice", "Bob"]
        },
      ],
      additionalItems: {
        type: "number"
      },
    }
  }
};
