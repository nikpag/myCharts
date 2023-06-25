import NewChartDone from "@/components/new-chart-done";
import NewChartUpload from "../components/new-chart-upload";
import { useState } from "react";

const NewChart = () => {
	const [data, setData] = useState(null);

	return data === null
		? <NewChartUpload setData={setData} />
		: <NewChartDone data={data} />;
};

export default NewChart;
