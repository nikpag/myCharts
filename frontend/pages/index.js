import Header from "../components/header";
import Footer from "../components/footer";
import LandingPageCard from "../components/landing-page-card";
import Link from "next/link";
import { Row } from "react-bootstrap";
import lineChart from "../public/line-chart.png";
import multiAxisLineChart from "../public/multi-axis-line-chart.png";
import radar from "../public/radar.png";
import scatter from "../public/scatter.png";
import bubble from "../public/bubble.png";
import polarArea from "../public/polar-area.png";

export default function MyChartsLanding() {
    return (
        <>
            <Header></Header>

            <main>
                <Row className="d-flex flex-nowrap overflow-auto m-5">
                    <LandingPageCard
                        title="Line chart"
                        text="Placeholder text"
                        buttonText="Placeholder text"
                        src="line-chart.png"
                    />
                    <LandingPageCard
                        title="Multi axis line chart"
                        text="Placeholder text"
                        buttonText="Placeholder text"
                        src="multi-axis-line-chart.png"
                    />
                    <LandingPageCard
                        title="Radar"
                        text="Placeholder text"
                        buttonText="Placeholder text"
                        src="radar.png"
                    />
                    <LandingPageCard
                        title="Scatter"
                        text="Placeholder text"
                        buttonText="Placeholder text"
                        src="scatter.png"
                    />
                    <LandingPageCard
                        title="Bubble"
                        text="Placeholder text"
                        buttonText="Placeholder text"
                        src="bubble.png"
                    />
                    <LandingPageCard
                        title="Polar area"
                        text="Placeholder text"
                        buttonText="Placeholder text"
                        src="polar-area.png"
                    />
                </Row>

                {/* TODO: Implement /login endpoint */}
                <h4 className="m-5">
                    Press on a diagram type to see how this works, or
                    <Link href="/account"> login with your google account</Link> to start creating your diagrams
                </h4>

                <hr />
            </main>

            <Footer></Footer>
        </>
    );
}
