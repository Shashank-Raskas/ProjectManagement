import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectsSidebar";
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

let content;
if(projectsState.selectedProjectId === null) {
  content = <NewProject />
}
else if(projectsState.selectedProjectId === undefined) {
  content = <NoProjectSelected onStartAddProject={handleStateAddProject} />;
}
  
  return (
    <main className="h-screen my-8 flex gap-8 " >
      <ProjectSidebar onStartAddProject={handleStateAddProject}/>
      {content}
      
      {/* <NewProject /> */}
      {/* <NoProjectSelected /> */}
    </main>
  );
}

export default App;
