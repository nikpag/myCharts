import { Line, Radar, Scatter, Bubble, PolarArea } from "react-chartjs-2";
import Chart from "chart.js/auto";

// TODO Document inCard
const ChartComponent = ({ type, data, inCard }) => {
	return {
		"line": <Line data={data} options={{ maintainAspectRatio: inCard }} />,
		"multi": <Line data={data} options={{ maintainAspectRatio: inCard }} />,
		"radar": <Radar data={data} options={{ maintainAspectRatio: inCard }} />,
		"scatter": <Scatter data={data} options={{ maintainAspectRatio: inCard }} />,
		"bubble": <Bubble data={data} options={{ maintainAspectRatio: inCard }} />,
		"polar": <PolarArea data={data} options={{ maintainAspectRatio: inCard }} />
	}[type];
};

export default ChartComponent;
