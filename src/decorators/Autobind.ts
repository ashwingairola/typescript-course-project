// Method Decorator
export function Autobind() {
	return (
		_target: any,
		_methodName: string | symbol,
		descriptor: PropertyDescriptor
	) => {
		const originalMethod = descriptor.value;
		const adjustedDescriptor: PropertyDescriptor = {
			enumerable: false,
			configurable: true,
			get() {
				const boundFn = originalMethod.bind(this);
				return boundFn;
			}
		};

		return adjustedDescriptor;
	};
}
