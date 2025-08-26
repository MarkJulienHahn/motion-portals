export default {
  name: "project",
  type: "document",
  title: "Project",
  fields: [
    {
      name: "intro",
      type: "object",
      options: { collapsible: true, collapsed: true },
      validation: (Rule) => Rule.required(),
      fields: [
        { name: "headline", type: "string" },
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
    },

    {
      name: "body",
      type: "array",
      options: { collapsible: true, collapsed: true },
      of: [
        {
          name: "section",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            {
              name: "headline",
              type: "object",
              fields: [
                { name: "de", type: "string" },
                { name: "en", type: "string" },
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
            {
              name: "images",
              type: "array",
              of: [
                {
                  name: "image",
                  type: "image",
                  fields: [
                    {
                      name: "caption",
                      type: "object",
                      fields: [
                        { name: "de", type: "string" },
                        { name: "en", type: "string" },
                      ],
                    },
                    { name: "alt", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Projekt",
      };
    },
  },
};
