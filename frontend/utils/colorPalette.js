// Chart.js color palette
const rgbValues = [
	{ r: 54, g: 162, b: 235 },
	{ r: 255, g: 99, b: 132 },
	{ r: 75, g: 192, b: 192 },
	{ r: 255, g: 159, b: 64 },
	{ r: 153, g: 102, b: 255 },
	{ r: 255, g: 205, b: 86 },
	{ r: 201, g: 203, b: 207 },
];

const backgroundColors = rgbValues.map(rgb => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);
const borderColors = rgbValues.map(rgb => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1.0)`);

export { backgroundColors, borderColors };
