// import { funcPagination } from "../global/func-pagination";
// import { Document, ObjectId, Sort } from "mongodb";
// import { userCollection } from "../../repositories/global/_mongodb-connect";
//
// export const funcFindUser = async (
//   _id: null | ObjectId = null,
//   loginOrEmail: null | string = null
// ) => {
//   let filter: Document = {};
//
//   if (_id) {
//     filter = { _id };
//   }
//
//   if (loginOrEmail) {
//     filter = {
//       $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
//     };
//   }
//
//   const foundUser = await userCollection.findOne(filter);
//
//   if (!foundUser) {
//     return false;
//   }
//
//   return {
//     id: foundUser._id.toString(),
//     password: foundUser.password,
//     email: foundUser.email,
//     login: foundUser.login,
//     createdAt: foundUser.createdAt,
//   };
// };