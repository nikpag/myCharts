export default function CarouselItem({ active, src }) {
	return (
		<div className={`carousel-item${active ? " active" : ""}`}>
			<div className="d-flex justify-content-center">
				<img src={src} height="250px" alt="..." />
			</div>
		</div>
	);
}
