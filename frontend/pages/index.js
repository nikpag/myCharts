import { useState } from "react";
import MyChartsLanding from "@/components/MyChartsLanding";
import NewUser from "@/components/NewUser";
import Account from "@/components/Account";
import MyCharts from "@/components/MyCharts";
import NewChart from "@/components/NewChart";
import ErrorCreatingChart from "@/components/ErrorCreatingChart";
import Credits from "@/components/Credits";
import NewChartDone from "@/components/NewChartDone";
import AboutUs from "@/components/AboutUs";

const Page = () => {
	const [page, setPage] = useState("NewUser");

	if (page === "MyChartsLanding") {
		return <MyChartsLanding setPage={setPage} />;
	}
	if (page === "NewUser") {
		return <NewUser setPage={setPage} />;
	}
	if (page === "Account") {
		return <Account setPage={setPage} />;
	}
	if (page === "MyCharts") {
		return <MyCharts setPage={setPage} />;
	}
	if (page === "NewChart") {
		return <NewChart setPage={setPage} />;
	}
	// TODO This will probably be removed
	if (page === "ErrorCreatingChart") {
		return <ErrorCreatingChart setPage={setPage} />;
	}
	if (page === "Credits") {
		return <Credits setPage={setPage} />;
	}
	if (page === "NewChartDone") {
		return <NewChartDone setPage={setPage} />;
	}
	if (page === "AboutUs") {
		return <AboutUs setPage={setPage} />;
	}
};

export default Page;
