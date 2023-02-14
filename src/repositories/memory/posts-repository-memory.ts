import { PostViewModel } from "../../models/PostViewModel";

const posts: PostViewModel[] = [];

export const postsRepositoryMemory = {
  // Return all posts
  async findAllPosts(): Promise<PostViewModel[]> {
    return posts;
  },

  // Return all posts
  async findPostById(id: string): Promise<PostViewModel> {
    return posts.find((post) => post?.id === id);
  },

  // Create new post
  async createNewPost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  ): Promise<PostViewModel> {
    const newPost: PostViewModel = {
      id: id,
      title: title,
      shortDescription: shortDescription,
      content: content,
      blogId: blogId,
      blogName: blogName,
    };
    posts.push(newPost);
    return newPost;
  },

  // Update existing post
  async updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  ): Promise<boolean> {
    const postToUpdate = posts.find((post) => post?.id === id);
    if (postToUpdate) {
      postToUpdate.id = id;
      postToUpdate.title = title;
      postToUpdate.shortDescription = shortDescription;
      postToUpdate.content = content;
      postToUpdate.blogId = blogId;
      postToUpdate.blogName = blogName;
      return true;
    }
    return false;
  },

  // Delete existing post
  async deletePost(id: string): Promise<boolean> {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i]?.id === id) {
        posts.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};