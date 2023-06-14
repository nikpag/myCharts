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
import emptyChartPreview from "../public/empty-chart-preview.png";
import { signOut, useSession } from "next-auth/react";

export default function MyCharts() {
    let [src, setSrc] = useState(emptyChartPreview);
    let [selectedItem, setSelectedItem] = useState();

    function Tr({ type, chartName, createdOn, src, item }) {
        return (
            <tr
                onClick={() => { setSelectedItem(item); setSrc(src); }}
                style={{ backgroundColor: item === selectedItem ? "#C486DB" : "#ffffff" }}
            >
                <td>{type}</td>
                <td>{chartName}</td>
                <td>{createdOn}</td>
                <td>
                    {/* TODO: download endpoints must have an id */}
                    <Link href="downloadChart/pdf">pdf</Link>&nbsp;
                    <Link href="downloadChart/png">png</Link>&nbsp;
                    <Link href="downloadChart/svg">svg</Link>&nbsp;
                    <Link href="downloadChart/html">html</Link>&nbsp;
                </td>
            </tr>
        );
    }

    function Img() {
        return (
            <Image className="img-fluid border rounded" src={src} alt="" />
        );
    }

    let data = [];

    let obj1 = {
        type: "Line",
        chartName: "Name",
        createdOn: "Monday",
        src: lineChart
    };
    let obj2 = {
        type: "Polar area",
        chartName: "OtherName",
        createdOn: "Tuesday",
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
            src={item["src"]}
            item={i}
        />);

        i++;
    }

    const { data: session, status } = useSession();

    if (status === "loading") {
        return false;
    }

    if (status === "unauthenticated") {
        return <h1>Not authorized</h1>;
    }

    return (
        <>
            <Header></Header>

            <Container>
                <Row className="mt-3">
                    <Col xs={1}>
                        <h6>
                            {session.user.email}
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
                            <Link href="/account">My account</Link> <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>Logout</Link>
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
                        <Img src="" />
                    </Col>
                </Row>
            </Container>

            <hr />

            <Footer></Footer>
        </>
    );
}
