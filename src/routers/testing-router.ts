import { Router } from "express";
import { testingController } from "../controllers/TestingController";

export const testingRouter = Router({});

testingRouter.delete("/all-data", testingController.deleteEverything);