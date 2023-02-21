import { Request } from "express";

export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>;
export type RequestWithBodyAndQuery<B, Q> = Request<{}, {}, B, Q>;