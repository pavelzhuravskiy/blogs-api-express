import { GlobalIdStringModel } from "../global/GlobalIdStringModel";
import { MongoBlogModel } from "./MongoBlogModel";

export type MongoBlogModelWithStringId = MongoBlogModel & GlobalIdStringModel;