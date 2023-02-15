export type PostMemoryModel =
  | {
      id: string;
      title: string;
      shortDescription: string;
      content: string;
      blogId: string;
      blogName: string;
    }
  | undefined;