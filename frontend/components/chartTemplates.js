import { RadialLinearScale } from "chart.js";
import csvToJSON from "./csvToJson";

// TODO Add titles (generally options to the charts). Not only here, but in the NewChartDone page
// TODO Code duplication. Find where this is used, delete it, and extract it to a file
// ChartJS color palette
const backgroundColors = [
	"rgba(54, 162, 235, 0.5)",
	"rgba(255, 99, 132, 0.5)",
	"rgba(75, 192, 192, 0.5)",
	"rgba(255, 159, 64, 0.5)",
	"rgba(153, 102, 255, 0.5)",
	"rgba(255, 205, 86, 0.5)",
	"rgba(201, 203, 207, 0.5)",
];

// TODO Check for custom errors when uploading the chart. It doesn't have to be that rigorously defined as an error, anything will do.
const chartTemplates = {
	line: `Title
,2022,2023
January,1,2
February,2,4
March,3,6
April,4,8
May,5,10
June,6,12
July,7,14`,

	multi:
		`Title
,2022,left,2023,right
January,1,,2
February,2,,4
March,3,,6
April,4,,8
May,5,,10
June,6,,12
July,7,,14`,

	radar:
		`Title
,2022,2023
January,1,2
February,2,4
March,3,6
April,4,8
May,5,10
June,6,12
July,7,14`,

	scatter: `Title
,2022,,2023
January,1,1,1,2
February,2,2,2,4
March,3,3,3,6
April,4,4,4,8
May,5,5,5,10
June,6,6,6,12
July,7,7,7,14`,

	bubble: `Title
,2022,,,2023
January,1,1,1,1,2,2
February,2,2,2,2,4,4
March,3,3,3,3,6,6
April,4,4,4,4,8,8
May,5,5,5,5,10,10
June,6,6,6,6,12,12
July,7,7,7,7,14,14`,

	polar: `Title
,2022,2023
January,1,2
February,2,4
March,3,6
April,4,8
May,5,10`,
};

// TODO This could be dynamically generated from the chartTemplates above,
// but performance would take a hit
// (plus some obscure bugs are showing up that are not worth exploring)
const chartDemoData = {
	line: {
		datasets: [
			{
				label: "2022",
				data: [1, 2, 3, 4, 5, 6, 7],
			},
			{
				label: "2023",
				data: [2, 4, 6, 8, 10, 12, 14],
			}
		],
		labels: ["January", "February", "March", "April", "May", "June", "July"],
	},
	// TODO Take care of multi axis line chart different axes
	multi: {
		datasets: [
			{
				label: "2022",
				data: [1, 2, 3, 4, 5, 6, 7],
			},
			{
				label: "2023",
				data: [2, 4, 6, 8, 10, 12, 14],
			}

		],
		labels: ["January", "February", "March", "April", "May", "June", "July"],
	},
	radar: {
		datasets: [
			{
				label: "2022",
				data: [1, 2, 3, 4, 5, 6, 7],
			},
			{
				label: "2023",
				data: [2, 4, 6, 8, 10, 12, 14],
			}

		],
		labels: ["January", "February", "March", "April", "May", "June", "July"],
	},
	scatter: {
		datasets: [
			{
				label: "2022",
				data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 },],
			},
			{
				label: "2023",
				data: [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }, { x: 4, y: 8 }, { x: 5, y: 10 }, { x: 6, y: 12 }, { x: 7, y: 14 },],
			}

		],
		labels: ["January", "February", "March", "April", "May", "June", "July"],
	},
	bubble: {
		datasets: [
			{
				label: "2022",
				data: [{ x: 1, y: 1, r: 1 }, { x: 2, y: 2, r: 2 }, { x: 3, y: 3, r: 3 }, { x: 4, y: 4, r: 4 }, { x: 5, y: 5, r: 5 }, { x: 6, y: 6, r: 6 }, { x: 7, y: 7, r: 7 },],
			},
			{
				label: "2023",
				data: [{ x: 1, y: 2, r: 2 }, { x: 2, y: 4, r: 4 }, { x: 3, y: 6, r: 6 }, { x: 4, y: 8, r: 8 }, { x: 5, y: 10, r: 10 }, { x: 6, y: 12, r: 12 }, { x: 7, y: 14, r: 14 },],
			}

		],
		labels: ["January", "February", "March", "April", "May", "June", "July"],
	},
	polar: {
		datasets: [
			{
				label: "2022",
				data: [1, 2, 3, 4, 5],
				backgroundColor: [
					backgroundColors[0],
					backgroundColors[1],
					backgroundColors[2],
					backgroundColors[3],
					backgroundColors[4],
				]
			},
			{
				label: "2023",
				data: [2, 4, 6, 8, 10],
				backgroundColor: [
					backgroundColors[0],
					backgroundColors[1],
					backgroundColors[2],
					backgroundColors[3],
					backgroundColors[4]
				]
			}

		],
		labels: ["January", "February", "March", "April", "May"],
	},
};


export { chartTemplates, chartDemoData };
