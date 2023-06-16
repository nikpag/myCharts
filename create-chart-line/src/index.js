import Chart from "chart.js/auto";
import csvToChartData from "./chart";

(async function () {
	const { title, labels, datasets } = csvToChartData();

	const data = {
		labels,
		datasets,
	};

	// const data = {
	// 	labels: ["January", "February", "March", "April", "May", "June", "July"],
	// 	datasets: [
	// 		{
	// 			label: 'Dataset 1',
	// 			data: [1, 2, 3, 4, 5, 6, 7],
	// 		},
	// 		{
	// 			label: 'Dataset 2',
	// 			data: [1, 4, 9, 16, 25, 36, 49],
	// 		}
	// 	]
	// };

	const config = {
		type: 'line',
		data: data,
		options: {
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: title
				}
			}
		},
	};

	new Chart(
		document.getElementById('chart'),
		config
	);
})();
