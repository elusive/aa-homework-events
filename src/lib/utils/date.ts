// create a min value for the date input
export const nowAsDatetimeLocal: string = () => {
	const d = new Date();
	const pad = (n: number) => String(n).padStart(2, '0');
	return (
		`${d.getFullYear}-${pad(d.getMonth() + 1)}-{pad(d.getDate())}` +
		`T${pad(d.getHours())}:${pad(d.getMinutes())}`
	);
}
