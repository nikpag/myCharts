import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import Footer from "../components/footer-old";
import Header from "../components/header-old";

import bubble from "../public/bubble.png";
import lineChart from "../public/line-chart.png";
import polarArea from "../public/polar-area.png";
import emptyChartPreview from "../public/empty-chart-preview.png";
import { signOut, useSession } from "next-auth/react";
import { fetchData } from "next-auth/client/_utils";

const MyCharts = () => {
    let [src, setSrc] = useState(emptyChartPreview);
    let [selectedItem, setSelectedItem] = useState();
    let [chartData, setChartData] = useState([]);

    const { data: session, status } = useSession();

    async function fetchData() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/allCharts`);

        const jsonData = await response.json();

        console.log(jsonData);

        setChartData(jsonData["data"]);
    }

    useEffect(() => {
        if (status === "loading") {
            return;
        }

        if (status === "unauthenticated") {
            return;
        }

        fetchData();
    }, [status]);

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
            <Image className="img-fluid border rounded" src={src} alt="" width="300" height="300" />
        );
    }

    let i = 0;

    let list = [];

    for (let item of chartData) {
        let tr = [];

        let properties = ["type", "chartName", "createdOn", "download"];

        let j = 0;
        for (let property of properties) {
            tr.push(<td key={j}>{item[property]}</td>);
            j++;
        }

        list.push(<Tr
            key={i}
            type={item["type"]}
            chartName={item["chartName"]}
            createdOn={item["createdOn"]}
            src={`data:image/png;base64,${item["src"]}`}
            item={i}
        />);

        i++;
    }

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
                    <Col xs={3} className="text-end">
                        <h6>
                            <Link href="/account">My account</Link> <Link href="#!" onClick={() => signOut({ callbackUrl: "/" })}>Logout</Link>
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
};

export default MyCharts;
