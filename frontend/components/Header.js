import { Container, Navbar } from "react-bootstrap";
import Image from "next/image";
import logo from "@/public/logo.png";

const Header = ({ setPage }) => {
	const handleClick = () => {
		setPage("MyChartsLanding");
	};

	return (
		<Navbar style={{ backgroundColor: process.env.NEXT_PUBLIC_MYCHARTS_PRIMARY_COLOR }}>
			<Container>
				<Navbar.Brand onClick={handleClick} style={{ cursor: "pointer" }}>
					<Image src={logo} style={{ height: "15vh", width: "auto" }} alt="" priority={true} />
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Header;
