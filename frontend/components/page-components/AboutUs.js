import { Container, Row, Table } from "react-bootstrap";
import Header from "@/components/Header";
import Link from "next/link";
import ChartCard from "@/components/ChartCard";

// About us page
const AboutUs = ({ setPage }) => {
	return (
		<>
			<Header setPage={setPage} />

			<Container className="mt-5">
				<h1 className="text-center">About myCharts</h1>

				<Row>
					<h3>Who we are</h3>

					<div className="p-5 border rounded">
						<p>Your big presentation is due tomorrow. It wasn't easy, but you finally have everything down to the last detail. You check your phone before you get some well-deserved rest, only to be greeted by this <i>-overly late-</i> email:</p>

						<blockquote className="blockquote text-center">
							<p>Those charts better be going up tomorrow!</p>
							<p className="blockquote-footer">Your boss, apparently</p>
						</blockquote>

						<p><i><b>Charts?!</b></i> <i>No one told you anything about charts!</i> Yes, you work for a sales company, so this should be <span style={{ fontSize: "12px" }}>much less suprising</span> than it is, but you have bigger problems now.</p>
						<p>You could use Python for the charts but, on second thought, you <i>couldn't</i>. Excel won't cut it either, because you also need radar (!) plots, and you are seriously underqualified for this.</p>
						<p>During a -desperate- Google search, you stumble upon <span style={{ color: "#A700E3" }}><b>myCharts!</b></span>. It's your lucky <s>day</s> night.</p>

						<hr />

						<p>We believe in a world where everyone will make professional-looking charts <b>a.</b> fast and <b>b.</b> without any code. All you should need to make a chart should be its type and data.</p>
						<p>Brought to you by:</p>

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
									<td className="text-center">Νίκος Παγώνας</td>
									<td className="text-center">el18175</td>
								</tr>
								<tr>
									<td className="w-50 text-center">Δημήτρης Μητρόπουλος</td>
									<td className="text-center">el18608</td>
								</tr>
								<tr>
									<td className="text-center">Χάρης Μπότσας</td>
									<td className="text-center">el18121</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</Row>

				<Row>
					<h3 className="mt-5">Pricing</h3>

					<div className="border rounded">
						<Row className="overflow-auto flex-nowrap">
							<ChartCard type="line" title="Line chart" price={1} />
							<ChartCard type="multi" title="Multi axis line chart" price={2} />
							<ChartCard type="radar" title="Radar chart" price={4} />
							<ChartCard type="scatter" title="Scatter chart" price={2} />
							<ChartCard type="bubble" title="Bubble chart" price={3} />
							<ChartCard type="polar" title="Polar area chart" price={4} />
						</Row>
					</div>
				</Row>

				<Row>
					<h3 className="mt-5">For developers</h3>

					<div className="border rounded">
						<h5 className="m-5">Want to join us? Feel free to submit your CV <Link href="mailto:saas2023ntua@proton.me">here!</Link></h5>
					</div>
				</Row>

				<hr />

				<h5 className="mb-5"><Link href="https://github.com/ntua/SaaS23-07" target="_blank">Github repo</Link>&nbsp;&nbsp;<Link href="https://www.instagram.com/saas2023ntua" target="_blank">Instagram</Link></h5>
			</Container>
		</>
	);
};

export default AboutUs;
