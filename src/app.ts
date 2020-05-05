import '../styles/app.css';
import { ProjectInput, ProjectList, ProjectState } from '@classes';

const projectInput = new ProjectInput();
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');
const projectState = ProjectState.getInstance();

console.log(
	projectInput,
	activeProjectsList,
	finishedProjectsList,
	projectState
);
