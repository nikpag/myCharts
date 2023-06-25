import { Button, Navbar } from "react-bootstrap";
import Image from "next/image";
import MyChartsServiceLogo from "@/public/MyChartsServiceLogo.png";
import Container from "react-bootstrap/Container";

const Header = ({ setPage }) => {
	const handleClick = () => {
		setPage("MyChartsLanding");
	};

	return (
		<Navbar style={{ backgroundColor: "#390050" }}>
			<Container>
				<Navbar.Brand onClick={handleClick} style={{ cursor: "pointer" }}>
					<Image src={MyChartsServiceLogo} style={{ height: "15vh", width: "auto" }} alt="" />
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Header;
