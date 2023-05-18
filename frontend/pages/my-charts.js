import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyCharts() {
    let data = [];

    let obj = {
        "type": "Line",
        "chartName": "Name",
        "createdOn": "Monday",
        "download": "pdf",
    };

    let numRows = 20;

    for (let i = 0; i < numRows; i++) {
        data.push(obj);
    }

    let list = [];

    for (let item of data) {
        let tr = [];

        let properties = ["type", "chartName", "createdOn", "download"];

        for (let property of properties) {
            tr.push(<td>{item[property]}</td>);
        }

        list.push(<tr>{tr}</tr>);
    }

    console.log(list);

    return (
        <>
            <Header></Header>

            <div class="container">
                <div class="row mt-3">
                    <div class="col-1"><h6>(something)@gmail.com</h6></div>
                    <div class="col-5"></div>
                    <div class="col-3"><h4>My Charts</h4></div>
                    <div class="col-3 text-end"><h6><a href="#">My account</a> <a href="#">Logout</a></h6></div>
                </div>
                <div class="row">
                    <div class="col-6 table-responsive" style={{ maxHeight: "600px" }}>
                        <table class="table table-hover table-bordered">
                            <thead class="table-secondary">
                                <tr>
                                    <th>Type</th>
                                    <th>Chart name</th>
                                    <th>Created on</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr></tr>
                                {list}
                            </tbody>
                        </table>
                    </div>
                    <div class="col-6">
                        <img class="img-fluid border rounded" src="bubble.png" />
                    </div>
                </div>
            </div>

            <hr />

            <Footer></Footer>
        </>
    );
}
