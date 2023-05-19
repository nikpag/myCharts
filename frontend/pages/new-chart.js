import SideHeader from "../components/side-header";
import CarouselItem from "../components/carousel-item";

export default function NewChart() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <SideHeader />
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
                                            <CarouselItem active={true} src="line-chart.png" />
                                            <CarouselItem src="multi-axis-line-chart.png" />
                                            <CarouselItem src="radar.png" />
                                            <CarouselItem src="scatter.png" />
                                            <CarouselItem src="bubble.png" />
                                            <CarouselItem src="polar-area.png" />
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
                                    <a href="new-chart-done" type="button" className="btn btn-dark mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Upload and create chart</a>
                                </div>
                                <div className="col text-end mt-2">
                                    <a href="my-charts" className="btn btn-danger">Cancel</a>
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
