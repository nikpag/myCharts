import logo from "@/public/logo.png";
import Image from "next/image";
import { Col } from "react-bootstrap";

const SideHeader = ({ setPage }) => {
	const handleClick = () => {
		setPage("MyChartsLanding");
	};

	return (
		<Col xs={1} style={{ height: "100vh", width: "15vw", backgroundColor: process.env.NEXT_PUBLIC_MYCHARTS_COLOR }}>
			<Image onClick={handleClick} className="mt-5 img-fluid" src={logo} alt="" style={{ cursor: "pointer" }} />
		</Col>
	);
};

export default SideHeader;
