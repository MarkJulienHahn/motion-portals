export default {
  name: "people",
  type: "document",
  title: "People",
  fields: [
    {
      name: "content",
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
