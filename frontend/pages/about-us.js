import Link from "next/link";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import ChartCard from "../components/chart-card";
import Header from "../components/header-old";

const AboutUs = () => {
    return (
        <>
            <Header />

            <Container className="mt-5">
                <Row>
                    <h1 className="text-center">
                        About myCharts
                    </h1>
                </Row>
                <Row>
                    <h3>
                        Who we are
                    </h3>
                    <div className="rounded py-3 border border-dark-subtle rounded">
                        <p>
                            Your big presentation is due tomorrow.
                            It wasn't easy, but you finally have everything down to the last detail.
                            You check your phone before you get some well-deserved rest,
                            only to be greeted by this <i>-overly late-</i> email:
                        </p>

                        <blockquote className="blockquote text-center">
                            <p>
                                Those charts better be going up tomorrow!
                            </p>
                            <footer className="blockquote-footer">
                                Your boss, apparently
                            </footer>
                        </blockquote>

                        <p>
                            <i><b>Charts?!</b></i> <i>No one told you anything about charts! </i>
                            Yes, you work for a sales company, so this should be <span style={{ fontSize: "13px" }}>much less surprising</span> than it is,
                            but you have bigger problems now.</p>
                        <p>
                            You could use Python for the charts but, on second thought, you <i>couldn't</i>.
                            Excel won't cut it either, because you also need radar (!) plots,
                            and you are seriously underqualified for this.</p>

                        <p>
                            During a -desperate- Google search, you stumble upon <span style={{ color: "#A700E3" }}><b>myCharts! </b></span>
                            It's your lucky <s>day</s> night.</p>

                        <hr />

                        <p>
                            We believe in a world where everyone will make professional-looking charts
                            <b> a.</b> fast and <b>b.</b> without any code.
                            All you should need to make a chart should be its type and data.</p>

                        <p>
                            Brought to you by:
                        </p>

                        <Table bordered hover>
                            <thead className="table-secondary">
                                <tr>
                                    <th colSpan={2} className="text-center">
                                        The myCharts team (saas2023-7)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                <tr>
                                    <td className="w-50 text-center">
                                        Δημήτρης Μητρόπουλος
                                    </td>
                                    <td className="text-center">
                                        el18xxx
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        Χάρης Μπότσας
                                    </td>
                                    <td className="text-center">
                                        el18xxx
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        Νίκος Παγώνας
                                    </td>
                                    <td className="text-center">
                                        el18xxx
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Row>

                <Row className="mt-5">
                    <h3>
                        Pricing
                    </h3>
                    <div className="border border-dark-subtle rounded">
                        <Row className="overflow-auto flex-nowrap">
                            <ChartCard
                                src="line-chart.png"
                                title="Line chart"
                                price={1}
                            />
                            <ChartCard
                                src="multi-axis-line-chart.png"
                                title="Multi axis line chart"
                                price={2}
                            />
                            <ChartCard
                                src="radar.png"
                                title="Radar"
                                price={4}
                            />
                            <ChartCard
                                src="scatter.png"
                                title="Scatter"
                                price={2}
                            />
                            <ChartCard
                                src="bubble.png"
                                title="Bubble"
                                price={3}
                            />
                            <ChartCard
                                src="polar-area.png"
                                title="Polar area"
                                price={4}
                            />
                        </Row>
                    </div>
                </Row>
                <Row>
                    <h3 className="mt-5">
                        For developers
                    </h3>
                    <div className="border border-dark-subtle rounded py-3">
                        <h5 className="my-3">
                            Want to join us? Feel free to submit your CV <a href="mailto:saas2023ntua@proton.me">here!</a>
                        </h5>
                    </div>
                </Row>
            </Container>

            <hr />

            <h5 className="ms-5">
                <Link href="https://github.com/ntua/SaaS23-07" target="_blank">
                    Github repo
                </Link>
                &nbsp;&nbsp;
                <Link href="https://www.instagram.com/saas2023ntua/" target="_blank">
                    Instagram
                </Link>
            </h5>
        </>
    );
};

export default AboutUs;
