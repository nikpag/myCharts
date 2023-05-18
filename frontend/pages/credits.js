import Header from "../components/Header";

export default function Credits() {
    return (
        <>
            <Header></Header>

            <div className="container">
                <div className="row mt-5">
                    <h3>You are logged in as (google account goes here)</h3>
                </div>
                <div className="d-flex flex-nowrap overflow-auto row">
                    <div className="m-4 card" style={{ width: "20%" }}>
                        <div className="card-body">
                            <h5 className="card-title">5 credits</h5>
                            <a href="#" className="btn btn-dark mt-5">Buy</a>
                        </div>
                    </div>
                    <div className="m-4 card" style={{ width: "20%" }}>
                        <div className="card-body">
                            <h5 className="card-title">10 credits</h5>
                            <a href="#" className="btn btn-dark mt-5">Buy</a>
                        </div>
                    </div>
                    <div className="m-4 card" style={{ width: "20%" }}>
                        <div className="card-body">
                            <h5 className="card-title">20 credits</h5>
                            <a href="#" className="btn btn-dark mt-5">Buy</a>
                        </div>
                    </div>
                    <div className="m-4 card" style={{ width: "20%" }}>
                        <div className="card-body">
                            <h5 className="card-title">50 credits</h5>
                            <a href="#" className="btn btn-dark mt-5">Buy</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5"></div>
                    <div className="col">
                        <button className="btn btn btn-danger">
                            Cancel purchase
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
}
