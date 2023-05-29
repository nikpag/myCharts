import logo from "../public/logo.png";
import Image from "next/image";
import { Col } from "react-bootstrap";
import Link from "next/link";

export default function SideHeader() {
	return (
		<Col xs={2} style={{ height: "100vh", width: "15vw", backgroundColor: "#390050" }}>
			<Link href="/">
				<Image className="mt-5 img-fluid" src={logo} alt="" />
			</Link>
		</Col>
	);
}
