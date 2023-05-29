import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import Footer from "../components/footer";
import Header from "../components/header";

import bubble from "../public/bubble.png";
import lineChart from "../public/line-chart.png";
import polarArea from "../public/polar-area.png";

export default function MyCharts() {
    let [src, setSrc] = useState();
    let [selectedItem, setSelectedItem] = useState();

    function Tr({ type, chartName, createdOn, download, src, item }) {
        return (
            <tr
                onClick={() => { setSelectedItem(item); setSrc(src); }}
                style={{ backgroundColor: item === selectedItem ? "#C486DB" : "#ffffff" }}
            >
                <td>{type}</td>
                <td>{chartName}</td>
                <td>{createdOn}</td>
                <td>{download}</td>
            </tr>
        );
    }

    function Img() {
        return (
            <Image className="img-fluid border rounded" src={src} />
        );
    }

    let data = [];

    let obj1 = {
        type: "Line",
        chartName: "Name",
        createdOn: "Monday",
        download: "pdf",
        src: lineChart
    };
    let obj2 = {
        type: "Polar area",
        chartName: "OtherName",
        createdOn: "Tuesday",
        download: "png",
        src: polarArea
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
        />);

        i++;
    }

    return (
        <>
            <Header></Header>

            <Container>
                <Row className="mt-3">
                    <Col xs={1}>
                        <h6>
                            (something)@gmail.com
                        </h6>
                    </Col>
                    <Col xs={5} />
                    <Col xs={3}>
                        <h4>
                            My Charts
                        </h4>
                    </Col>
                    {/* TODO: /logout endpoint */}
                    <Col xs={3} className="text-end">
                        <h6>
                            <Link href="/account">My account</Link> <Link href="/logout">Logout</Link>
                        </h6>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} className="table-responsive" style={{ maxHeight: "600px" }}>
                        <Table hover>
                            <thead className="table-secondary" style={{ position: "sticky", top: "0px" }}>
                                <tr>
                                    <th>Type</th>
                                    <th>Chart name</th>
                                    <th>Created on</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr></tr>
                                {list}
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs={6}>
                        <Img src={bubble} />
                    </Col>
                </Row>
            </Container>

            <hr />

            <Footer></Footer>
        </>
    );
}