import { Request, Response } from "express";
import { RequestWithQuery } from "../types/request-types";
import { QueryModel } from "../models/global/QueryModel";
import { SortOrder } from "mongoose";
import { ObjectId } from "mongodb";
import { UsersService } from "../domain/users-service";
import { UsersQueryRepository } from "../repositories/query-repos/users-query-repository";

class UsersController {
  private usersService: UsersService;
  private usersQueryRepository: UsersQueryRepository;
  constructor() {
    this.usersService = new UsersService();
    this.usersQueryRepository = new UsersQueryRepository();
  }
  async createUser(req: Request, res: Response) {
    const newUser = await this.usersService.createUser(
      req.body.login,
      req.body.password,
      req.body.email
    );
    res.status(201).json(newUser);
  }

  async getUsers(req: RequestWithQuery<QueryModel>, res: Response) {
    const foundUsers = await this.usersQueryRepository.findUsers(
      Number(req.query.pageNumber) || 1,
      Number(req.query.pageSize) || 10,
      req.query.sortBy,
      req.query.sortDirection as SortOrder,
      req.query.searchLoginTerm,
      req.query.searchEmailTerm
    );
    res.json(foundUsers);
  }

  async deleteUser(req: Request, res: Response) {
    const isDeleted = await this.usersService.deleteUser(
      new ObjectId(req.params.id)
    );
    if (isDeleted) {
      res.sendStatus(204);
    }
  }

  async deleteUsers(req: Request, res: Response) {
    const isDeleted = await this.usersService.deleteAll();
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
}

export const usersController = new UsersController();