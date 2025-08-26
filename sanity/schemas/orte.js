export default {
  name: "orte",
  type: "document",
  title: "Orte",
  fields: [
    {
      name: "orte",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "ort",
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "artist", type: "string" },
            {
              name: "coordinates",
              type: "object",
              fields: [
                { name: "longitude", type: "string" },
                { name: "latitude", type: "string" },
              ],
            },
            {
              name: "glb",
              type: "file",
              title: ".glb 3D Model",
              options: {
                accept: ".glb",
              },
            },
            {
              name: "zoom",
              type: "number",
              initialValue: 20,
            },
            { name: "image", type: "image", description: "Fallback" },
          ],
        },
      ],
    },
    {
      name: "text",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "de",
          type: "array",
          of: [
            {
              type: "block",
              styles: [],
              lists: [],
              marks: {
                decorators: [{ title: "Italic", value: "em" }],
              },
            },
          ],
        },
        {
          name: "en",
          type: "array",
          of: [
            {
              type: "block",
              styles: [],
              lists: [],
              marks: {
                decorators: [{ title: "Italic", value: "em" }],
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Orte",
      };
    },
  },
};
