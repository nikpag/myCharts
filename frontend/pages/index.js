import Header from "../components/header";
import Footer from "../components/footer";
import LandingPageCard from "../components/landing-page-card";

export default function MyChartsLanding() {
  return (
    <>
      <Header></Header>

      <main>
        <div className="d-flex flex-nowrap overflow-auto m-5 row">
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
        </div>

        {/* TODO: Implement /login endpoint */}
        <h4 className="m-5">Press on a diagram type to see how this works, or <a href="/account">login with your google account</a> to start creating your diagrams</h4>

        <hr />
      </main>

      <Footer></Footer>
    </>
  );
}
