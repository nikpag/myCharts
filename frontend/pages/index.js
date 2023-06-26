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
import { useSession } from "next-auth/react";

const Page = () => {
	const [page, setPage] = useState();
	const [chartData, setChartData] = useState();
	const { data, status } = useSession();

	const handleLogin = async () => {
		console.log("handleLogin: entering");

		const response = await fetch(`${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/getUser/${data.user.email}`);

		console.log("handleLogin: just fetched");

		const json = await response.json();

		if (JSON.stringify(json) === "{}") {
			setPage("NewUser");
		}
		else {
			const url = `${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/updateLastLogin`;
			const options = {
				method: "POST",
				body: JSON.stringify({ email: data.user.email }),
				headers: {
					"Content-Type": "application/json"
				}
			};

			await fetch(url, options);
			setPage("Account");
		}
	};

	// Don't render anything if loading
	if (status === "loading") {
		return false;
	}
	// About us page is accessible by everyone...
	if (page === "AboutUs") {
		return <AboutUs setPage={setPage} />;
	}
	// ...but all other pages aren't! Redirect to landing page
	if (status === "unauthenticated") {
		console.log("unathenticated");
		return <MyChartsLanding setPage={setPage} />;
	}
	// User just signed in, hasn't picked a page yet
	if (page === undefined) {
		handleLogin();
	}
	// If user has signed in, his landing page is his account page
	if (page === "MyChartsLanding") {
		return <Account setPage={setPage} data={data} />;
	}
	if (page === "NewUser") {
		return <NewUser setPage={setPage} data={data} />;
	}
	if (page === "Account") {
		return <Account setPage={setPage} data={data} />;
	}
	if (page === "MyCharts") {
		return <MyCharts setPage={setPage} data={data} />;
	}
	if (page === "NewChart") {
		return <NewChart setPage={setPage} setChartData={setChartData} />;
	}
	// TODO This will probably be removed
	if (page === "ErrorCreatingChart") {
		return <ErrorCreatingChart setPage={setPage} />;
	}
	if (page === "Credits") {
		return <Credits setPage={setPage} data={data} />;
	}
	if (page === "NewChartDone") {
		return <NewChartDone setPage={setPage} data={data} chartData={chartData} />;
	}
	if (page === "AboutUs") {
		return <AboutUs setPage={setPage} />;
	}

};

export default Page;
