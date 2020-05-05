import { Autobind } from '@decorators';
import { Validatable } from '@interfaces';
import { validate } from '@utils';
import { ProjectState, Component } from '@classes';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;
	projectState = ProjectState.getInstance();

	constructor() {
		super('project-input', 'app', true, 'user-input');

		this.titleInputElement = this.element.querySelector(
			'#title'
		)! as HTMLInputElement;

		this.descriptionInputElement = this.element.querySelector(
			'#description'
		)! as HTMLInputElement;

		this.peopleInputElement = this.element.querySelector(
			'#people'
		)! as HTMLInputElement;

		this.configure();
		this.renderContent();
	}

	private gatherUserInput(): [string, string, string] | void {
		const enteredTitle = this.titleInputElement.value.trim();
		const enteredDescription = this.descriptionInputElement.value.trim();
		const enteredPeople = this.peopleInputElement.value.trim();

		const titleValidatable: Validatable = {
			required: true,
			value: enteredTitle
		};

		const descriptionValidatable: Validatable = {
			required: true,
			value: enteredDescription,
			minLength: 5
		};

		const peopleValidatable: Validatable = {
			required: true,
			value: +enteredPeople,
			min: 1
		};

		if (
			!(
				validate(titleValidatable) &&
				validate(descriptionValidatable) &&
				validate(peopleValidatable)
			)
		) {
			throw new Error('Invalid Input. Please try again.');
		}

		return [enteredTitle, enteredDescription, enteredPeople];
	}

	private clearInputs() {
		this.titleInputElement.value = '';
		this.descriptionInputElement.value = '';
		this.peopleInputElement.value = '';
	}

	@Autobind()
	private submitHandler(event: Event) {
		event.preventDefault();
		const userInput = this.gatherUserInput();

		if (Array.isArray(userInput)) {
			const [title, desc, people] = userInput;
			this.projectState.addProject(title, desc, +people);
			this.clearInputs();
		}
	}

	configure() {
		this.element.addEventListener('submit', this.submitHandler);
	}

	renderContent() {}
}
