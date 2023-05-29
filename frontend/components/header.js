import logo from "../public/logo.png";
import Image from "next/image";
import { Container, Navbar } from "react-bootstrap";

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
