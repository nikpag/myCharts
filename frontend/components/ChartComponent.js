import { Line, Radar, Scatter, Bubble, PolarArea } from "react-chartjs-2";
import Chart from "chart.js/auto";

const ChartComponent = ({ type, data, maintainAspectRatio }) => {
	const scaleOptions = {
		line: {
			one: { type: "linear", display: true, position: "left" },
		},
		multi: {
			left: { type: "linear", display: true, position: "left" },
			right: { type: "linear", display: true, position: "right" },
		},
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
