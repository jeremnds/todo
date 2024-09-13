// declare global {
//   namespace Express {
//     interface User {
//       _id: string;
//       username: string;
//       email: string;
//     }
//   }
// }

import { Request } from "express";
import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface User {
      _id: string | ObjectId;
      username: string;
      password: string;
    }
  }
}

export {};

export interface AuthenticatedRequest extends Request {
  user?:
    | {
        _id: string | ObjectId;
        username: string;
        password: string;
      }
    | undefined;
}
