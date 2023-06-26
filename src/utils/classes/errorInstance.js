export class ErrorInstance {
	constructor(type, name, message, details) {
		this.type = type;
		this.name = name;
		this.message = message;
		this.details = details;
		this.timestamp = new Date();
	}
}
