import {User} from "./user";

export interface Message {
  id: number;
  body: string;
  user: User;
  timestamp: number | Date;
  likes: number[];

  [key: string]: string | object | number;
}
