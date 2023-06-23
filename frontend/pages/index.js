import Link from "next/link";

import Row from "react-bootstrap/Row";


import Footer from "../components/footer";
import Header from "../components/header";
import ChartCard from "../components/chart-card";
import { signIn, useSession } from "next-auth/react";


const MyChartsLanding = () => {
    return (
        <>
            <Header />

            <main>
                <Row className="d-flex flex-nowrap overflow-auto m-5">
                    <ChartCard
                        title="Line chart"
                        src="line-chart.png"
                    />
                    <ChartCard
                        title="Multi axis line chart"
                        src="multi-axis-line-chart.png"
                    />
                    <ChartCard
                        title="Radar"
                        src="radar.png"
                    />
                    <ChartCard
                        title="Scatter"
                        src="scatter.png"
                    />
                    <ChartCard
                        title="Bubble"
                        src="bubble.png"
                    />
                    <ChartCard
                        title="Polar area"
                        src="polar-area.png"
                    />
                </Row>

                <h4 className="m-5">
                    To start creating your diagrams, please&nbsp;
                    <Link
                        href=""
                        onClick={() => signIn("google", { callbackUrl: `${process.env.NEXT_PUBLIC_URL_BASE}/sign-in-intermediate` })}
                    >
                        login with your google account
                    </Link>
                </h4>


            </main>

            <hr />
            <Footer />
        </>
    );
};

export default MyChartsLanding;
