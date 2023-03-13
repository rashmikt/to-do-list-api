import express, { Express, Request, Response } from "express";
import cors from 'cors';
import pool from './db';

const app: Express = express();

const PORT: string | number = process.env.PORT || 5000;

app.use(cors());   //middleware
app.use(express.json());  //to get req.body

//create a new todo item

app.post("/todos", async (req: Request, res: Response) => {
    try {
        const { detail } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (detail) VALUES($1) RETURNING *",
            [detail]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        throw error;
    }
});

//To display all todo items

app.get("/todos", async (req: Request, res: Response) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        throw error;
    }
});

//To get a particular todo item

app.get("/todos/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [
            id
        ]);
        res.json(todo.rows[0]);
    } catch (error) {
        throw error;
    }
});

//To edit a todo item

app.put("/todos/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { detail } = req.body;
        const editTodo = await pool.query(
            "UPDATE todo SET detail = $1 WHERE id = $2",
            [detail, id]
        );
        res.json("Todo was updated!");
    } catch (error) {
        throw error;
    }
});

//To delete a todo item

app.delete("/todos/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [
            id
        ]);
        res.json("Todo was deleted!");
    } catch (error) {
        throw error;
    }
});

app.listen(PORT, () => {
    console.log(`Connected successfully at ${PORT}`);
});
