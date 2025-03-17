import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";
import { useState } from 'react';

function App() {
const [projectsState, setProjectsState] = useState({
  selectedProjectId: undefined,
  projects: []
});

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

const selectedProject = projectsState.projects.find(
  project => project.id === projectsState.selectedProjectId
);

let content = <SelectedProject project={selectedProject}/>;

if(projectsState.selectedProjectId === null) {
  content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
}
else if(projectsState.selectedProjectId === undefined) {
  content = <NoProjectSelected onStartAddProject={handleStateAddProject} />;
}
  
  return (
    <main className="h-screen my-8 flex gap-8 " >
      <ProjectSidebar onStartAddProject={handleStateAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject}/>
      {content}
      
      {/* <NewProject /> */}
      {/* <NoProjectSelected /> */}
    </main>
  );
}

export default App;
