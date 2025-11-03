export default {
  name: "home",
  type: "document",
  title: "Home",
  fields: [
    // {
    //   name: "headline",
    //   type: "object",
    //   fields: [
    //     { name: "en", type: "string" },
    //     { name: "de", type: "string" },
    //   ],
    //   validation: (Rule) => Rule.required()
    // },
    {
      name: "motionPortals",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: "headline",
          type: "object",
          fields: [
            { name: "de", type: "string" },
            { name: "en", type: "string" },
          ],
          validation: (Rule) => Rule.required(),
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
          validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "skulpturen",
      type: "object",
      validation: (Rule) => Rule.required(),
      options: { collapsible: true, collapsed: true },
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
      name: "anleitung",
      type: "object",
      validation: (Rule) => Rule.required(),
      options: { collapsible: true, collapsed: true },
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
          name: "diagram",
          type: "image",
          fields: [
            { name: "alt", type: "string" },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage",
      };
    },
  },
};
