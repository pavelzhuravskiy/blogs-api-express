import { Request } from "express";

export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithBodyAndQuery<B, T> = Request<{}, {}, B, T>;