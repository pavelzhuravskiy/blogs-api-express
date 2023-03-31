import {Request, Response} from "express";
import {postsService} from "../domain/posts-service";
import {
  RequestWithParamsAndQuery,
  RequestWithQuery
} from "../types/request-types";
import {QueryModel} from "../models/global/QueryModel";
import {
  postsQueryRepository
} from "../repositories/query-repos/posts-query-repository";
import {SortOrder} from "mongoose";
import {ObjectId} from "mongodb";
import {commentsService} from "../domain/comments-service";
import {StringIdModel} from "../models/global/StringIdModel";
import {
  commentsQueryRepository
} from "../repositories/query-repos/comments-query-repository";

class PostsController {
 async createPost(req: Request, res: Response){
   const newPost = await postsService.createNewPost(req.body);
   res.status(201).json(newPost);
 }

 async getPosts(req: RequestWithQuery<QueryModel>, res: Response){
   const foundPosts = await postsQueryRepository.findPosts(
       Number(req.query.pageNumber) || 1,
       Number(req.query.pageSize) || 10,
       req.query.sortBy,
       req.query.sortDirection as SortOrder
   );
   res.json(foundPosts);
 }

 async getPost(req: Request, res: Response){
   const foundPost = await postsQueryRepository.findPostById(
       new ObjectId(req.params.id)
   );
   res.json(foundPost);
 }

 async updatePost(req: Request, res: Response){
   const isUpdated = await postsService.updatePost(
       new ObjectId(req.params.id),
       req.body
   );

   if (isUpdated) {
     const updatedPost = await postsQueryRepository.findPostById(req.body.id);
     res.status(204).json(updatedPost);
   }
 }

 async deletePost(req: Request, res: Response){
   const isDeleted = await postsService.deletePost(
       new ObjectId(req.params.id)
   );
   if (isDeleted) {
     res.sendStatus(204);
   }
 }

 async deletePosts(req: Request, res: Response){
   const isDeleted = await postsService.deleteAll();
   if (isDeleted) {
     res.sendStatus(204);
   } else {
     res.sendStatus(404);
   }
 }

 async createComment(req: Request, res: Response){
   const newComment = await commentsService.createNewCommentByPostId(
       new ObjectId(req.params.id),
       req.body.content,
       req.user!._id
   );
   res.status(201).json(newComment);
 }

 async getComments(
     req: RequestWithParamsAndQuery<StringIdModel, QueryModel>,
     res: Response
 ){
   const foundComments = await commentsQueryRepository.findComments(
       Number(req.query.pageNumber) || 1,
       Number(req.query.pageSize) || 10,
       req.query.sortBy,
       req.query.sortDirection as SortOrder,
       new ObjectId(req.params.id)
   );
   res.json(foundComments);
 }
}

export const postsController = new PostsController();