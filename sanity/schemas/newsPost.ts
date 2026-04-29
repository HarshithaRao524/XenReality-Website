import { defineField, defineType } from "sanity";

export const newsPostSchema = defineType({
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Short headline shown at the top of the card (optional).",
    }),
    defineField({
      name: "content",
      title: "Post Content",
      type: "text",
      rows: 8,
      description: "Paste the full LinkedIn post text here.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        },
      ],
      description: "Upload images from the LinkedIn post (supports carousels).",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn Post URL",
      type: "url",
      description: "Link to the original LinkedIn post (optional).",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: {
      title: "headline",
      content: "content",
      date: "publishedAt",
      media: "images.0",
    },
    prepare({ title, content, date, media }) {
      return {
        title: title || content?.slice(0, 60) || "Untitled post",
        subtitle: date ? new Date(date).toLocaleDateString() : "No date",
        media,
      };
    },
  },
});
