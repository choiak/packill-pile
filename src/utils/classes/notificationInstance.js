export class NotificationInstance {
	constructor(type, message, details, shouldShowToast = true, isRead = false, timestamp = new Date()) {
		this.type = type;
		this.message = message;
		this.details = details;
		this.shouldShowToast = shouldShowToast;
		this.isRead = isRead;
		this.timestamp = timestamp;
	}

	read() {
		this.isRead = true;
		return(this);
	}

	unread() {
		this.isRead = false;
		return(this);
	}
}