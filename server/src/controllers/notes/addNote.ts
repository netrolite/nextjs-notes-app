import { Request, Response } from "express";
import Note from "../../models/Note";

export default async function addNote(req: Request, res: Response) {
  const { title, content, tags } = req.body;
  const { description } = res.locals;
  const userId = res.locals.jwtPayload.userId;

  const note = await Note.create({
    owner: userId,
    title,
    tags,
    content,
    description,
  });
  res.status(201).json(note);
}
