import { useState } from "react";
import MyChartsLanding from "@/components/page-components/MyChartsLanding";
import NewUser from "@/components/page-components/NewUser";
import Account from "@/components/page-components/Account";
import MyCharts from "@/components/page-components/MyCharts";
import NewChart from "@/components/page-components/NewChart";
import Credits from "@/components/page-components/Credits";
import NewChartDone from "@/components/page-components/NewChartDone";
import AboutUs from "@/components/page-components/AboutUs";
import { useSession } from "next-auth/react";

const Page = () => {
	// Whenever the page variable is changed, a new page is rendered
	const [page, setPage] = useState();
	// This chartData will be filled after the user uploads a file, and our client-side business logic is called
	const [chartData, setChartData] = useState();
	// Session data, such as email
	const { data, status } = useSession();

	// This is called when there is no page set, which implies the user has either refreshed the page, or they have clicked on the sign-in button
	const handleLogin = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_URL_USER_GET}/${data.user.email}`);

			if (!response.ok) {
				throw new Error("Network error");
			}

			const json = await response.json();

			// Empty object means there is no user with that email in the database, so we must redirect to the NewUser page
			if (JSON.stringify(json) === "{}") {
				setPage("NewUser");
			}
			else {
				// This is set in the MyChartsLanding page. Refer to MyChartsLanding.js for more info
				const shouldUpdateLastLogin = sessionStorage.getItem("shouldUpdateLastLogin");

				// If you should, then you should...
				if (shouldUpdateLastLogin === "true") {
					const url = `${process.env.NEXT_PUBLIC_URL_LAST_LOGIN_UPDATE}`;
					const options = {
						method: "POST",
						body: JSON.stringify({ email: data.user.email }),
						headers: {
							"Content-Type": "application/json"
						}
					};

					const response = await fetch(url, options);

					if (!response.ok) {
						throw new Error("Network error");
					}

					// We've updated the lastLogin, no need to do it again until told so by our superiors
					sessionStorage.setItem("shouldUpdateLastLogin", "false");
				}

				setPage("Account");
			}
		}
		catch (error) {
			console.log("A network error was detected.");
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
	// The rest are pretty straightforward...
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
		return <NewChart setPage={setPage} setChartData={setChartData} data={data} />;
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
