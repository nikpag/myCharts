import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyChartsLanding() {
  return (
    <>
      <Header></Header>

      <main>
        <div className="d-flex flex-nowrap overflow-auto m-5 row">
          <div className="m-4 card" style={{ width: "20%" }}>
            <img src="line-chart.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Line chart</h5>
              <p className="card-text">Placeholder text</p>
              <a href="#" className="btn btn-dark">Placeholder text</a>
            </div>
          </div>
          <div className="m-4 card" style={{ width: "20%" }}>
            <img src="multi-axis-line-chart.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Multi Axis Line Chart</h5>
              <p className="card-text">Placeholder text</p>
              <a href="#" className="btn btn-dark">Placeholder text</a>
            </div>
          </div>
          <div className="m-4 card" style={{ width: "20%" }}>
            <img src="radar.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Radar</h5>
              <p className="card-text">Placeholder text</p>
              <a href="#" className="btn btn-dark">Placeholder text</a>
            </div>
          </div>
          <div className="m-4 card" style={{ width: "20%" }}>
            <img src="scatter.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Scatter</h5>
              <p className="card-text">Placeholder text</p>
              <a href="#" className="btn btn-dark">Placeholder text</a>
            </div>
          </div>
          <div className="m-4 card" style={{ width: "20%" }}>
            <img src="bubble.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Bubble</h5>
              <p className="card-text">Placeholder text</p>
              <a href="#" className="btn btn-dark">Placeholder text</a>
            </div>
          </div>
          <div className="m-4 card" style={{ width: "20%" }}>
            <img src="polar-area.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Polar area</h5>
              <p className="card-text">Placeholder text</p>
              <a href="#" className="btn btn-dark">Placeholder text</a>
            </div>
          </div>
        </div>

        <h4 className="m-5">Press on a diagram type to see how this works, or <a href="#">login with your google account</a> to start creating your diagrams</h4>

        <hr />
      </main>

      <Footer></Footer>
    </>
  );
}
