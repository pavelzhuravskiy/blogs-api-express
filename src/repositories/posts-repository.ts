import { PostViewModel, PostViewModelArray } from "../models/PostViewModel";

const posts: PostViewModelArray = [];

export const postsRepository = {
  // Return all posts
  findAllPosts() {
    return posts;
  },

  // Return all posts
  findPostById(id: string) {
    const foundPost = posts.find((post) => post.id === id);
    if (id) {
      return foundPost;
    } else {
      return posts;
    }
  },

  // Create new post
  createNewPost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  ) {
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
  updatePost(
      id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  ) {
    const postToUpdate = posts.find((post) => post.id === id);
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
  deletePost(id: string) {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        posts.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};