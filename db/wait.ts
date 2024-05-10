export const wait = (ms = 600) => new Promise(resolve => {
	const t = setTimeout(() => {
		clearTimeout(t);
		resolve();
		return;
	}, ms);
});
