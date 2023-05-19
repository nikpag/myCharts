import Header from "../components/header";
import AccountInfo from "../components/account-info";

export default function Account() {
  return (
    <>
      <Header></Header>

      <div className="container">
        <h2 className="m-5 text-center">Hello (google account goes here)</h2>

        <AccountInfo
          labelText="Number of charts"
          ID="numberOfCharts"
          value="1"
        />
        <AccountInfo
          labelText="Available credits"
          ID="availableCredits"
          value="2"
        />
        <AccountInfo
          labelText="Last login"
          ID="lastLogin"
          value="3"
        />
      </div>

      <div className="ms-5 mt-5 d-flex justify-content-center">
        <a href="my-charts" className="ms-5 me-5 btn btn-dark">My charts</a>
        <a href="new-chart" className="me-5 btn btn-dark">New chart</a>
        <a href="credits" className="btn btn-dark">Buy credits</a>
      </div >



    </>
  );
}
