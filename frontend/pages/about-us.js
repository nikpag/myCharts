import Header from "../components/Header";

export default function AboutUs() {
  return (
    <>
      <Header></Header>

      <div className="container m-5">
        <div className="row mb-5">
          <h1 className="text-center">About myCharts</h1>
        </div>
        <div className="row mb-5">
          <h3 className="mb-3">Who we are</h3>
          <div className="rounded py-3 border border-dark-subtle rounded">
            <p>Your big presentation is due tomorrow. It wasn't easy, but you finally have everything down to the last detail. You check your phone before you get some well-deserved rest, only to be greeted by this <i>-overly late-</i> email:</p>

            <blockquote className="blockquote text-center">
              <p>Those charts better be going up tomorrow!</p>
              <footer className="blockquote-footer">Your boss, apparently<cite title="Source Title"></cite> </footer>
            </blockquote>

            <p><i><b>Charts?!</b></i> <i> No one told you anything about charts!</i> Yes, you work for a sales company, so this should be <span style={{ fontSize: "13px" }}>much less surprising</span> than it is, but you have bigger problems now.</p>
            <p>You could use Python for the charts but, on second thought, you <i>couldn't</i>. Excel won't cut it either, because you also need radar (!) plots, and you are seriously underqualified for this.</p>

            <p>During a -desperate- Google search, you stumble upon <span style={{ color: "#A700E3" }}><b>myCharts!</b></span> It's your lucky <s>day</s> night.</p>

            <hr />

            <p>We believe in a world where everyone will make professional-looking charts <b>a.</b> fast and <b>b.</b> without any code. All you should need to make a chart should be its type and data.</p>

            <p>Brought to you by:</p>

            <table className="table table-hover table-bordered">
              <thead className="table-secondary">
                <tr>
                  <th colspan="2" className="text-center">The myCharts team (saas2023-7)</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                <tr>
                  <td className="w-50 text-center">Δημήτρης Μητρόπουλος</td>
                  <td className="w-50 text-center">el18xxx</td>
                </tr>
                <tr>
                  <td className="w-50 text-center">Χάρης Μπότσας</td>
                  <td className="w-50 text-center">el18xxx</td>
                </tr>
                <tr>
                  <td className="w-50 text-center">Νίκος Παγώνας</td>
                  <td className="w-50 text-center">el18xxx</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mb-5">
          <h3>Pricing</h3>
          <div className="border border-dark-subtle rounded mt-3">
            <div className="d-flex flex-nowrap overflow-auto m-5 row">
              <div className="m-4 card" style={{ width: "20%" }}>
                <img src="line-chart.png" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Line chart</h5>
                  <p className="card-text">Placeholder text</p>
                  <a href="#" className="btn btn-dark">1 credit</a>
                </div>
              </div>
              <div className="m-4 card" style={{ width: "20%" }}>
                <img src="multi-axis-line-chart.png" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Multi Axis Line Chart</h5>
                  <p className="card-text">Placeholder text</p>
                  <a href="#" className="btn btn-dark">2 credits</a>
                </div>
              </div>
              <div className="m-4 card" style={{ width: "20%" }}>
                <img src="radar.png" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Radar</h5>
                  <p className="card-text">Placeholder text</p>
                  <a href="#" className="btn btn-dark">4 credits</a>
                </div>
              </div>
              <div className="m-4 card" style={{ width: "20%" }}>
                <img src="scatter.png" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Scatter</h5>
                  <p className="card-text">Placeholder text</p>
                  <a href="#" className="btn btn-dark">2 credits</a>
                </div>
              </div>
              <div className="m-4 card" style={{ width: "20%" }}>
                <img src="bubble.png" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Bubble</h5>
                  <p className="card-text">Placeholder text</p>
                  <a href="#" className="btn btn-dark">3 credits</a>
                </div>
              </div>
              <div className="m-4 card" style={{ width: "20%" }}>
                <img src="polar-area.png" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Polar area</h5>
                  <p className="card-text">Placeholder text</p>
                  <a href="#" className="btn btn-dark">4 credits</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h3 className="mb-3">For developers</h3>
          <div className="border border-dark-subtle rounded py-3">
            <h5 className="my-3">Want to join us? Feel free to submit your CV <a href="mailto:saas2023ntua@proton.me">here!</a></h5>
          </div>
        </div>
      </div>

      <hr className="mb-3" />

      <h5 className="ms-5"><a href="#">Github repo</a>&nbsp;&nbsp;<a href="#">Instagram</a></h5>
    </>
  );
}
