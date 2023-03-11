import { Document, ObjectId } from "mongodb";

export const funcFilter = async (
  blogId: null | ObjectId = null,
  postId: null | ObjectId = null,
  searchNameTerm: null | string = null,
  searchLoginTerm: null | string = null,
  searchEmailTerm: null | string = null
) => {
  const filter: Document = {};

  if (blogId) {
    filter.blogId = blogId.toString();
  }

  if (postId) {
    filter.postId = postId.toString();
  }

  if (searchNameTerm) {
    filter.name = { $regex: searchNameTerm, $options: "i" };
  }

  if (searchLoginTerm || searchEmailTerm) {
    filter.$or = [];

    if (searchLoginTerm) {
      filter.$or.push({ "accountData.login": { $regex: searchLoginTerm, $options: "i" } });
    }

    if (searchEmailTerm) {
      filter.$or.push({ "accountData.email": { $regex: searchEmailTerm, $options: "i" } });
    }
  }

  return filter;
};