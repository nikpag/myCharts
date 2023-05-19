import Header from "../components/header";
import AboutUsCard from "../components/about-us-card";

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
                  <th colSpan="2" className="text-center">The myCharts team (saas2023-7)</th>
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
              <AboutUsCard
                src="line-chart.png"
                title="Line chart"
                text="Placeholder text"
                credits="1"
              />
              <AboutUsCard
                src="multi-axis-line-chart.png"
                title="Multi axis line chart"
                text="Placeholder text"
                credits="2"
              />
              <AboutUsCard
                src="radar.png"
                title="Radar"
                text="Placeholder text"
                credits="4"
              />
              <AboutUsCard
                src="scatter.png"
                title="Scatter"
                text="Placeholder text"
                credits="2"
              />
              <AboutUsCard
                src="bubble.png"
                title="Bubble"
                text="Placeholder text"
                credits="3"
              />
              <AboutUsCard
                src="polar-area.png"
                title="Polar area"
                text="Placeholder text"
                credits="4"
              />
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

      <h5 className="ms-5"><a href="https://github.com/ntua/SaaS23-07">Github repo</a>&nbsp;&nbsp;<a href="https://www.instagram.com/saas2023ntua/">Instagram</a></h5>
    </>
  );
}
