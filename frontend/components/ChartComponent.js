import { Line, Radar, Scatter, Bubble, PolarArea } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Given the chart's type and data, we build the corresponding chart.
// According to the myCharts manifesto:
//
// ~The only two things you should need to build a chart are its type and data.~
const ChartComponent = ({ type, data, maintainAspectRatio }) => {
	const scaleOptions = {
		// Line chart has only one axis
		line: {
			one: { type: "linear", display: true, position: "left" },
		},
		// Multi axis line chart has left and right axis
		multi: {
			left: { type: "linear", display: true, position: "left" },
			right: { type: "linear", display: true, position: "right" },
		},
		// Other charts don't care about such pedantic features
		radar: {},
		scatter: {},
		bubble: {},
		polar: {}
	};

	const options = {
		scales: scaleOptions[type],
		plugins: {
			title: { display: true, text: data.title }
		},
		maintainAspectRatio
	};

	// Want a line? Build a line!
	// Want a radar? Build a radar!
	// Want world piece? Learn to spell first...
	return {
		line: <Line data={data} options={options} />,
		multi: <Line data={data} options={options} />,
		radar: <Radar data={data} options={options} />,
		scatter: <Scatter data={data} options={options} />,
		bubble: <Bubble data={data} options={options} />,
		polar: <PolarArea data={data} options={options} />
	}[type];
};

export default ChartComponent;
