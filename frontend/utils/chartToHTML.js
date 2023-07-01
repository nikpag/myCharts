const chartToHTML = (chart) => {
	const config = {
		type: chart.type,
		data: { datasets: chart.datasets, labels: chart.labels },
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: chart.title
				}
			}
		},
	};


	return `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>myChart</title>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body>
	<div style="max-height: 60vh">
		<canvas id="myChart"></canvas>
	</div>

	<script>
		const ctx = document.getElementById('myChart');

		new Chart(ctx, ${JSON.stringify(config)});
	</script>
</body>

</html>`;
};

export default chartToHTML;
