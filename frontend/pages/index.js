import Link from "next/link";

import Row from "react-bootstrap/Row";

import Footer from "../components/footer";
import Header from "../components/header";
import LandingPageCard from "../components/landing-page-card";

export default function MyChartsLanding() {
    const lineChartText = "Hello";
    const multiAxisLineChartText = "Hello";
    const radarText = "Hello";
    const scatterText = "Hello";
    const bubbleText = "Hello";
    const polarAreaText = "Hello";

    const lineChartButtonText = "Hello";
    const multiAxisLineChartButtonText = "Hello";
    const radarButtonText = "Hello";
    const scatterButtonText = "Hello";
    const bubbleButtonText = "Hello";
    const polarAreaButtonText = "Hello";

    return (
        <>
            <Header></Header>

            <main>
                <Row className="d-flex flex-nowrap overflow-auto m-5">
                    <LandingPageCard
                        title="Line chart"
                        src="line-chart.png"
                    />
                    <LandingPageCard
                        title="Multi axis line chart"
                        src="multi-axis-line-chart.png"
                    />
                    <LandingPageCard
                        title="Radar"
                        src="radar.png"
                    />
                    <LandingPageCard
                        title="Scatter"
                        src="scatter.png"
                    />
                    <LandingPageCard
                        title="Bubble"
                        src="bubble.png"
                    />
                    <LandingPageCard
                        title="Polar area"
                        src="polar-area.png"
                    />
                </Row>

                <h4 className="m-5">
                    To start creating your diagrams, please <Link href="/account">login with your google account</Link>
                </h4>

                <hr />
            </main>

            <Footer></Footer>
        </>
    );
}
