import logo from "@/public/logo.png";
import Image from "next/image";
import { Col } from "react-bootstrap";

// A vertical header with the myCharts app logo
const SideHeader = ({ setPage }) => {
	const handleClick = () => {
		// This redirects to MyChartsLanding, but if the user is signed in,
		// MyChartsLanding will make sure the user ends up at his account page,
		// resulting in a smoother user experience
		setPage("MyChartsLanding");
	};

	return (
		<Col xs={1} style={{ height: "100vh", width: "15vw", backgroundColor: process.env.NEXT_PUBLIC_MYCHARTS_PRIMARY_COLOR }}>
			<Image onClick={handleClick} className="mt-5 img-fluid" src={logo} alt="" style={{ cursor: "pointer" }} />
		</Col>
	);
};

export default SideHeader;
