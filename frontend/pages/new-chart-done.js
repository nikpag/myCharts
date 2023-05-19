import SideHeader from "../components/side-header";

export default function NewChartDone() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <SideHeader />
                    <div className="col m-5 d-flex justify-content-center">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-3"></div>
                                <h1 className="col-6 mb-5">Your (selected type) chart is ready!</h1>
                                <div className="col-3"></div>
                            </div>
                            <div className="row">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-3"></div>
                                        <div className="col-6 p-0">
                                            <img className="img-fluid" src="line-chart.png" alt="..." />
                                        </div>
                                        <div className="col-3"></div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-3"></div>
                                        <a href="/saveChart" className="btn btn-dark col-2 me-4">Save to my charts</a>
                                        <a href="/new-chart" className="btn btn-danger col-2">Discard</a>
                                        <div className="col-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
