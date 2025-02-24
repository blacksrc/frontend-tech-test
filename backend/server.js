"use strict";
const app = require("express")();
const tasksContainer = require("./tasks.json");
const frontendOrigin = "http://localhost:3001";

/**
 * This is added in order to handle CORS issue in development
 * It also can be handled via setting proxy in frontend
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", frontendOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/**
 * GET /tasks
 *
 * Return the list of tasks with status code 200.
 */
app.get("/tasks", (req, res) => {
  return res.status(200).json(tasksContainer);
});

/**
 * Get /task/:id
 *
 * id: Number
 *
 * Return the task for the given id.
 *
 * If found return status code 200 and the resource.
 * If not found return status code 404.
 * If id is not valid number return status code 400.
 */
app.get("/task/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isNaN(id)) {
    const task = tasksContainer.tasks.find(item => item.id === id);

    if (task !== null && task !== undefined) {
      return res.status(200).json({
        task
      });
    } else {
      return res.status(404).json({
        message: "Not found."
      });
    }
  } else {
    return res.status(400).json({
      message: "Bad request."
    });
  }
});

/**
 * PUT /task/update/:id/:title/:description
 *
 * id: Number
 * title: string
 * description: string
 *
 * Update the task with the given id.
 * If the task is found and update as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.put("/task/update/:id/:title/:description", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!Number.isNaN(id)) {
    const task = tasksContainer.tasks.find(item => item.id === id);

    if (task !== null) {
      task.title = req.params.title;
      task.description = req.params.description;
      return res.status(204).json({
        message: "Updated successfully"
      });
    } else {
      return res.status(404).json({
        message: "Not found"
      });
    }
  } else {
    return res.status(400).json({
      message: "Bad request"
    });
  }
});

/**
 * POST /task/create/:title/:description
 *
 * title: string
 * description: string
 *
 * Add a new task to the array tasksContainer.tasks with the given title and description.
 * Return status code 201.
 */
app.post("/task/create/:title/:description", (req, res) => {
  const taskId =
    tasksContainer.tasks.length == 0
      ? 1
      : tasksContainer.tasks[tasksContainer.tasks.length - 1].id + 1;
  const task = {
    // This is not proper way to generate id what if we delete some tasks so the ids will be duplicated
    // on next addition and it throws expeptions in frontend because of the key attribute inside mapping
    // through the tasks. So, I will change the code a little bit.
    // id: tasksContainer.tasks.length,
    id: taskId,
    title: req.params.title,
    description: req.params.description
  };

  tasksContainer.tasks.push(task);

  return res.status(201).json({
    message: "Resource created"
  });
});

/**
 * DELETE /task/delete/:id
 *
 * id: Number
 *
 * Delete the task linked to the  given id.
 * If the task is found and deleted as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.delete("/task/delete/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!Number.isNaN(id)) {
    const task = tasksContainer.tasks.find(item => item.id === id);

    if (task !== undefined) {
      const taskIndex = tasksContainer.tasks;
      tasksContainer.tasks.splice(taskIndex, 1);
      return res.status(200).json({
        message: "Deleted successfully"
      });
    } else {
      return res.status(404).json({
        message: "Not found"
      });
    }
  } else {
    return res.status(400).json({
      message: "Bad request"
    });
  }
});

app.listen(9001, () => {
  process.stdout.write("the server is available on http://localhost:9001/\n");
});
