import express from "express";
import addNote from "../controllers/notes/addNote";
import deleteNote from "../controllers/notes/deleteNote";
import getNote from "../controllers/notes/getNote";
import getNotesMeta from "../controllers/notes/getNotesMeta";
import updateNote from "../controllers/notes/updateNote";
import validateAddNote from "../middleware/notes/validateAddNote";
import validateDeleteNote from "../middleware/notes/validateDeleteNote";
import validateGetNote from "../middleware/notes/validateGetNote";
import validateUpdateNote from "../middleware/notes/updateNote/validateUpdateNote";
import noteGetDescription from "../middleware/notes/getDescription";
const router = express.Router();

router.get("/", getNotesMeta);
router.post("/add", validateAddNote, noteGetDescription, addNote);

router
  .route("/:noteId")
  .get(validateGetNote, getNote)
  .patch(validateUpdateNote, noteGetDescription, updateNote)
  .delete(validateDeleteNote, deleteNote);

export default router;
