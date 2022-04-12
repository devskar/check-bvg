/**
 *
 * @param dateString String in the following format "8:30"
 * @returns The date represented in the string as Date object
 */

export const numberToDate = (dateString: string): Date => {
	//8:30
	const [hours, minutes] = dateString.split(':');
	// [8, 30]
	const date = new Date();
	date.setHours(Number.parseInt(hours));
	date.setMinutes(Number.parseInt(minutes));
	return date;
};
