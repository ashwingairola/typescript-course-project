import { Component } from './Component';
import { Project } from './Project';
import { Draggable } from '@interfaces';
import { Autobind } from '@decorators';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
	implements Draggable {
	private project: Project;

	get persons() {
		if (this.project.people === 1) {
			return '1 member';
		} else {
			return `${this.project.people} members`;
		}
	}

	constructor(hostId: string, project: Project) {
		super('single-project', hostId, false, project.id);

		this.project = project;

		this.configure();
		this.renderContent();
	}

	configure() {
		this.element.addEventListener('dragstart', this.dragStartHandler);
		this.element.addEventListener('dragend', this.dragEndHandler);
	}

	renderContent() {
		this.element.querySelector('h2')!.textContent = this.project.title;
		this.element.querySelector('h3')!.textContent = this.persons;
		this.element.querySelector('p')!.textContent = this.project.description;
	}

	@Autobind()
	dragStartHandler(event: DragEvent) {
		event.dataTransfer!.setData('text/plain', this.project.id);
		event.dataTransfer!.effectAllowed = 'move';
	}

	@Autobind()
	dragEndHandler(_event: DragEvent) {
		console.log('DragEnd');
	}
}
