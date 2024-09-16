// declare global {
//   namespace Express {
//     interface User {
//       _id: string;
//       username: string;
//       email: string;
//     }
//   }
// }

import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface User {
      _id: ObjectId;
      username: string;
      password: string;
    }
    interface Request {
      user?: User;
    }
  }
}

export {};
