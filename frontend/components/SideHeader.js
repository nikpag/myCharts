import MyChartsServiceLogo from "@/public/MyChartsServiceLogo.png";
import Image from "next/image";
import { Col } from "react-bootstrap";

const SideHeader = ({ setPage }) => {
	const handleClick = () => {
		setPage("MyChartsLanding");
	};

	return (
		<Col xs={1} style={{ height: "100vh", width: "15vw", backgroundColor: "#390050" }}>
			<Image onClick={handleClick} className="mt-5 img-fluid" src={MyChartsServiceLogo} alt="" style={{ cursor: "pointer" }} />
		</Col>
	);
};

export default SideHeader;
