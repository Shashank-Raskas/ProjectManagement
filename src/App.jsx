import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";
import { useState } from 'react';

function App() {
const [projectsState, setProjectsState] = useState({
  selectedProjectId: undefined,
  projects: [],
  tasks: []
});
function handleAddTask(text) {
  setProjectsState(prevState => {
    const taskID = Math.random();
    const newTask = {
      text: text,
      projectId: prevState.selectedProjectId,
      id: taskID,
    };
    return {
      ...prevState,
      tasks: [newTask, ...prevState.tasks],
    };
  }
  );
}

function handleDeleteTask(id) {
  setProjectsState(prevState => {
    return {
      ...prevState,
      tasks: prevState.tasks.filter(task => task.id !== id)
    };
  });
}

function handleStateAddProject() {
  setProjectsState(prevState => {
    return {
      ...prevState,
      selectedProjectId: null,
    };
  });
}

function handleAddProject(projectData) {
  setProjectsState(prevState => {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId,
    };
    return {
      ...prevState,
      selectedProjectId: undefined,
      projects: [...prevState.projects, newProject],
    };
  });
}

function handleCancelAddProject() {
  setProjectsState(prevState => {
    return {
      ...prevState,
      selectedProjectId: undefined,
    };
  });
}

function handleSelectProject(projectId) {
  setProjectsState(prevState => {
    return {
      ...prevState,
      selectedProjectId: projectId,
    };
  });
}

function handleDeleteProject() {
  setProjectsState(prevState => {
    return {
      ...prevState,                 //Creates a new array with only the projects that do not match the selected project.                         
      selectedProjectId: undefined,        // project.id → ID of the current project in the loop.
      projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId),// prevState.selectedProjectId → ID of the project that needs to be deleted.
                                                                                    //! Condition: If a project’s id matches selectedProjectId, it gets removed from the new array.
    };
  });
}

const selectedProject = projectsState.projects.find(
  project => project.id === projectsState.selectedProjectId
);

let content = <SelectedProject project={selectedProject} deleteProject={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks}/>;

if(projectsState.selectedProjectId === null) {
  content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
}
else if(projectsState.selectedProjectId === undefined) {
  content = <NoProjectSelected onStartAddProject={handleStateAddProject} />;
}
  
  return (
    <main className="h-screen my-8 flex gap-8 " >
      <ProjectSidebar onStartAddProject={handleStateAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedProjectId}/>
      {content}
      
      {/* <NewProject /> */}
      {/* <NoProjectSelected /> */}
    </main>
  );
}

export default App;
