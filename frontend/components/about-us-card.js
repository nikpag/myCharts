export default function AboutUsCard({ src, title, text, credits }) {
	return (
		<div className="m-4 card" style={{ width: "20%" }}>
			<img src={src} className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<p className="card-text">{text}</p>
				<a href="#" className="btn btn-dark">
					{credits} credit{credits === "1" ? "" : "s"}
				</a>
			</div>
		</div>
	);
}
