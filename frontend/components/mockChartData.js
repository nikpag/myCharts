// TODO Make random
const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const mockChartData = {
	"line": {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "2022",
				data: Array(7).fill(0).map(_ => random(0, 100))
			},
			{
				label: "2023",
				data: Array(7).fill(0).map(_ => random(0, 100))
			}
		]
	},
	"multi": {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "2022",
				data: Array(7).fill(0).map(_ => random(-100, 100)),
				// TODO Add multiple axis id
			},
			{
				label: "2023",
				data: Array(7).fill(0).map(_ => random(-100, 100)),
			}
		]
	},
	"radar": {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "2022",
				data: Array(7).fill(0).map(_ => random(-100, 100))
			},
			{
				label: "2023",
				data: Array(7).fill(0).map(_ => random(-100, 100))
			}
		]
	},
	"scatter": {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "2022",
				data: Array(7).fill(0).map(_ => ({ x: random(-100, 100), y: random(-100, 100) }))
			},
			{
				label: "2023",
				data: Array(7).fill(0).map(_ => ({ x: random(-100, 100), y: random(-100, 100) }))
			}
		]
	},
	"bubble": {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "2022",
				data: Array(7).fill(0).map(_ => ({ x: random(-50, 50), y: random(-50, 50), r: random(5, 20) }))
			},
			{
				label: "2023",
				data: Array(7).fill(0).map(_ => ({ x: random(-50, 50), y: random(-50, 50), r: random(5, 20) }))
			}
		]
	},
	"polar": {
		labels: ["January", "February", "March", "April", "May"],
		datasets: [
			{
				label: "2023",
				data: Array(5).fill(0).map(_ => random(10, 100))
			}
		]
	},
};

export default mockChartData;
