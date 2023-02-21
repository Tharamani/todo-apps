const craeteTodoTable = `CREATE TABLE todoSchema.todo (
    todo_id serial PRIMARY KEY,
    title VARCHAR (50), 
     notes TEXT,
    due_date DATE,
    priority VARCHAR(20),
    is_checked BOOLEAN DEFAULT 'false' 
);`
