import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";



export default function MyCharts() {
    let [src, setSrc] = useState();
    let [selectedItem, setSelectedItem] = useState();

    function Tr({ type, chartName, createdOn, download, src, item }) {
        return (
            <tr onClick={() => { setSelectedItem(item); setSrc(src); }} style={{ backgroundColor: item === selectedItem ? "#bbbbbb" : "#ffffff" }}>
                <td>{type}</td>
                <td>{chartName}</td>
                <td>{createdOn}</td>
                <td>{download}</td>
            </tr >
        );
    }

    function Img() {
        return (
            <img className="img-fluid border rounded" src={src}></img>
        );
    }

    let data = [];

    let obj1 = {
        type: "Line",
        chartName: "Name",
        createdOn: "Monday",
        download: "pdf",
        src: "line-chart.png"
    };
    let obj2 = {
        type: "Polar area",
        chartName: "OtherName",
        createdOn: "Tuesday",
        download: "png",
        src: "polar-area.png"
    };

    let numRows = 10;

    for (let i = 0; i < numRows; i++) {
        data.push(obj1);
        data.push(obj2);
    }

    let list = [];

    let i = 0;
    for (let item of data) {
        let tr = [];

        let properties = ["type", "chartName", "createdOn", "download"];

        let j = 0;
        for (let property of properties) {
            tr.push(<td key={j}>{item[property]}</td>);
            j++;
        }

        // list.push(<tr key={i}> {tr}</tr >);

        list.push(<Tr
            key={i}
            type={item["type"]}
            chartName={item["chartName"]}
            createdOn={item["createdOn"]}
            download={item["download"]}
            src={item["src"]}
            item={i}
        ></Tr>);
        i++;
    }

    return (
        <>
            <Header></Header>

            <div className="container">
                <div className="row mt-3">
                    <div className="col-1"><h6>(something)@gmail.com</h6></div>
                    <div className="col-5"></div>
                    <div className="col-3"><h4>My Charts</h4></div>
                    {/* TODO: /logout endpoint */}
                    <div className="col-3 text-end"><h6><a href="/account">My account</a> <a href="/logout">Logout</a></h6></div>
                </div>
                <div className="row">
                    <div className="col-6 table-responsive" style={{ maxHeight: "600px" }}>
                        <table className="table table-hover table-bordered">
                            <thead className="table-secondary">
                                <tr>
                                    <th>Type</th>
                                    <th>Chart name</th>
                                    <th>Created on</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                <tr></tr>
                                {list}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6">
                        <Img src="bubble.png" />
                    </div>
                </div>
            </div>

            <hr />

            <Footer></Footer>
        </>
    );
}
