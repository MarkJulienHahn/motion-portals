export default {
  name: "video",
  type: "document",
  title: "Video",
  fields: [
    {
      name: "title",
      type: "object",
      fields: [
        {
          name: "de",
          type: "string",
        },
        {
          name: "en",
          type: "string",
        },
      ],
    },
    { name: "id", title: "Vimeo Video ID", type: "string" },
    {
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.title?.de,
        maxLength: 96,
      },
    },
  ],
  preview: {
    select: {
      title: "title.de",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled (de)",
      };
    },
  },
};
