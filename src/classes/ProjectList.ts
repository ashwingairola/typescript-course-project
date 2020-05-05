import { TProjectType } from '@types';
import { ProjectState, Project, Component } from '@classes';
import { ProjectStatus } from '@enums';
import { ProjectItem } from './ProjectItem';
import { DragTarget } from '@interfaces';
import { Autobind } from '@decorators';

export class ProjectList extends Component<HTMLDivElement, HTMLElement>
	implements DragTarget {
	assignedProjects: Project[];
	projectState = ProjectState.getInstance();

	constructor(private type: TProjectType) {
		super('project-list', 'app', false, `${type}-projects`);

		this.assignedProjects = [];

		this.configure();
		this.renderContent();
	}

	private renderProjects() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		)! as HTMLUListElement;

		listEl.innerHTML = '';

		for (const project of this.assignedProjects) {
			new ProjectItem(this.element.querySelector('ul')!.id, project);
		}
	}

	configure() {
		this.element.addEventListener('dragover', this.dragOverHandler);
		this.element.addEventListener('dragleave', this.dragLeaveHandler);
		this.element.addEventListener('drop', this.dropHandler);

		this.projectState.addListener((projects: Project[]) => {
			const relevantProjects = projects.filter(project => {
				if (this.type === 'active') {
					return project.status === ProjectStatus.Active;
				}
				return project.status === ProjectStatus.Finished;
			});
			this.assignedProjects = relevantProjects;
			this.renderProjects();
		});
	}

	renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector(
			'h2'
		)!.textContent = `${this.type.toUpperCase()} PROJECTS`;
	}

	@Autobind()
	dragOverHandler(event: DragEvent) {
		if (event.dataTransfer?.types[0] === 'text/plain') {
			event.preventDefault();
			const listEl = this.element.querySelector('ul')!;
			listEl.classList.add('droppable');
		}
	}

	@Autobind()
	dragLeaveHandler(_event: DragEvent) {
		const listEl = this.element.querySelector('ul')!;
		listEl.classList.remove('droppable');
	}

	@Autobind()
	dropHandler(event: DragEvent) {
		const projectId = event.dataTransfer!.getData('text/plain');
		this.projectState.moveProject(
			projectId,
			this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
		);
	}
}
