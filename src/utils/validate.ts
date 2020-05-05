import { Validatable } from '@interfaces';

export function validate(validatableInput: Validatable): boolean {
	let isValid = true;
	const value = validatableInput.value;

	// Validations checks begin here
	if (validatableInput.required) {
		isValid = isValid && !!value.toString().trim().length;
	}

	if (validatableInput.minLength != null && typeof value === 'string') {
		isValid = isValid && value.length >= validatableInput.minLength;
	}

	if (validatableInput.maxLength != null && typeof value === 'string') {
		isValid = isValid && value.length <= validatableInput.maxLength;
	}

	if (validatableInput.min != null && typeof value === 'number') {
		isValid = isValid && value >= validatableInput.min;
	}

	if (validatableInput.max != null && typeof value === 'number') {
		isValid = isValid && value <= validatableInput.max;
	}

	return isValid;
}
