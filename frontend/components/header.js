import Image from "next/image";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import logo from "../public/logo.png";

export default function Header() {
	return (
		<Navbar style={{ backgroundColor: "#390050" }}>
			<Container>
				<Navbar.Brand href="/">
					<Image src={logo} alt="" style={{ height: "15vh", width: "auto" }} />
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}
