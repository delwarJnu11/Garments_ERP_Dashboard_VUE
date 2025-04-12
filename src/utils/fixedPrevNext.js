export const fixedPrevNext = (label) => {
	if (label === '&laquo; Previous') return 'Prev';
	if (label === 'Next &raquo;') return 'Next';
	return label;
};