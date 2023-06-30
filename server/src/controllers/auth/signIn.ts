import { Request, Response } from "express";
import User, { IUser } from "../../models/User";

export default async function signIn(req: Request, res: Response) {
  const user: IUser = res.locals.user;
  const jwt = user.getJwt();
  res.status(200).json({ jwt });
}