export default function NewChart() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2" style={{ height: "100vh", backgroundColor: "#390050" }}>
                        <img className="mt-5 img-fluid" src="logo.png" alt="..." />
                    </div>
                    <div className="col m-5 d-flex justify-content-center">
                        <div className="container-fluid">
                            <div className="row">
                                <h1 className="mb-5 text-center">Let's create your own chart!</h1>
                            </div>
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col">
                                    <div id="carouselExample" className="carousel carousel-dark slide">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <div className="d-flex justify-content-center">
                                                    <img src="line-chart.png" height="250px" alt="..." />
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="d-flex justify-content-center">
                                                    <img src="multi-axis-line-chart.png" height="250px" alt="..." />
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="d-flex justify-content-center">
                                                    <img src="radar.png" height="250px" alt="..." />
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="d-flex justify-content-center">
                                                    <img src="scatter.png" height="250px" alt="..." />
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="d-flex justify-content-center">
                                                    <img src="bubble.png" height="250px" alt="..." />
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="d-flex justify-content-center">
                                                    <img src="polar-area.png" height="250px" alt="..." />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-2"></div>
                            </div>
                            <div className="row text-center mt-4">
                                <h5>Download chart description template for (selected type)</h5>
                            </div>
                            <div className="row mt-5">
                                <div className="col-3"></div>
                                <div className="col">
                                    <label htmlFor="formFile" className="mb-2 form-label"><h6>Select or drag file</h6></label>
                                    <br />
                                    <input className="border border-secondary" type="file" id="formFile" style={{ height: "200px", width: "100%" }} />
                                </div>
                                <div className="col-3"></div>
                            </div>
                            <div className="row">
                                <div className="col-3"></div>
                                <div className="col">
                                    <button type="button" className="btn btn-dark mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Upload and create chart</button>
                                </div>
                                <div className="col text-end mt-2">
                                    <button className="btn btn-danger">Cancel</button>
                                </div>
                                <div className="col-3"></div>
                            </div>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Oops</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Cannot prepare your chart. Your uploaded file contains errors.</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>;

        </>
    );
}
