const express = require("express");
const server = express();
server.use(express.json());



const projects = [{id:"1", title: 'projeto1', tasks:['tarefa1', 'tarefa2']}]

const _get = 0; const _put = 0; const _post = 0; const _delete = 0;


server.use((req,res, next) =>{
  
  if (req.method == "get") {
    ++_get;
  }

  console.log(req.method);
  console.log(_get);
  
  next();

});

function checkIDInArray(req,res,next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if (project == null){
    return res.status(400).json({Error: 'id of project not exist'})
  }
  
  return next();
}


server.get("/projects", (req,res,next) =>{
  return res.json(projects);
})


server.post("/projects", (req,res,next) =>{
const {id, title, tasks} = req.body;

const project = {
  id,
  title,
  tasks,
}
projects.push(project);
return res.json(projects);
})

server.put("/projects/:id", checkIDInArray, (req,res,next) =>{
  const { id } = req.params;
  const {title} = req.body;
  const project = projects.find(p => p.id == id);
  project.title = title;
  return res.json(projects);
})

server.delete("/projects/:id", checkIDInArray, (req,res,next) =>{
  const {id} = req.params; 
  const project = projects.findIndex(p => p.id == id);
    projects.splice(project, 1);
    return res.send();
})

server.post("/projects/:id/tasks", (req,res,next) =>{
  const {id,} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id == id);
  
  project.tasks.push(title)
  
  
  return res.json(project);
  })

server.listen(3001);