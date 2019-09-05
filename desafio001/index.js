const express = require("express");
const server = express();
server.use(express.json());



const projects = [{id:"1", title: 'projeto1', tasks:['tarefa1', 'tarefa2']}]

var gget = 0; var pput = 0; var ppost = 0; var ddelete = 0;



server.use((req,res, next) =>{
  
  if (req.method == 'GET') {
   
   
  }; 

  switch (req.method) {
    case 'GET': gget = gget +1; break;
    case 'PUT': pput = pput +1; break;
    case 'POST': ppost = ppost +1; break;
    case 'DELETE': ddelete = ddelete +1; break;
  }
  console.log(`Contagem de Métodos: GET : ${gget}, PUT : ${pput}, POST : ${ppost}, DELETE : ${ddelete}. No total: ${gget+pput+ppost+ddelete}`);
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