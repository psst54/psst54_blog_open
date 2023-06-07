import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `post/**/*.mdx`, // Type of file to parse (every mdx in all subfolders)
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Title of the post",
      required: true,
    },
    published_at: {
      type: "date",
      description: "Published time of the post",
      required: true,
    },
    last_modified_at: {
      type: "date",
      description: "Last modified time of the post",
      required: true,
    },
    category: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    tag: {
      type: "list",
      of: { type: "string" },
    },
    summary: {
      type: "string",
    },
  },
  computedFields: {
    fileName: {
      type: "string",
      resolve: (post) => `${post._raw.flattenedPath.slice("path/".length)}`,
    },
  },
}));

export const Category = defineDocumentType(() => ({
  name: "Category",
  filePathPattern: `category/**/*.mdx`, // Type of file to parse (every mdx in all subfolders)
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    id: {
      type: "string",
      required: true,
    },
    index: {
      type: "number",
      required: true,
    },
    subCategoryId: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields: {
    cnt: {
      type: "number",
      resolve: () => 0,
    },
  },
}));

export const Main = defineDocumentType(() => ({
  name: "Main",
  filePathPattern: `main.mdx`,
  contentType: "mdx",
}));

export default makeSource({
  contentDirPath: "files",
  documentTypes: [Post, Category, Main],
  mdx: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
