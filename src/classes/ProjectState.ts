import { Project } from '@classes';
import { ProjectStatus } from '@enums';
import { State } from './State';

export class ProjectState extends State<Project> {
	private projects: Project[] = [];
	private static instance: ProjectState;

	private constructor() {
		super();
	}

	static getInstance(): ProjectState {
		return (
			ProjectState.instance || (ProjectState.instance = new ProjectState())
		);
	}

	addProject(title: string, description: string, numOfPeople: number) {
		const project = new Project(
			Math.random().toString(),
			title,
			description,
			numOfPeople,
			ProjectStatus.Active
		);

		this.projects.push(project);
		this.updateListeners();
	}

	moveProject(id: string, newStatus: ProjectStatus) {
		const project = this.projects.find(prj => prj.id === id);

		if (project && project.status !== newStatus) {
			project.status = newStatus;
			this.updateListeners();
		}
	}

	private updateListeners() {
		for (const listener of this.listeners) {
			listener(this.projects.slice());
		}
	}
}
