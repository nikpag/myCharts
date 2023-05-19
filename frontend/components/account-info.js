export default function AccountInfo({ labelText, ID, value }) {
	return (
		<div className="ms-5 mt-3 row">
			<div className="col-3"></div>
			<div className="col-3">
				<h4 className="text-end">
					<label htmlFor={ID}>{labelText}</label>
				</h4>
			</div>
			<div className="col-3">
				<input id={ID} type="text" className="form-control" value={value} readOnly />
			</div>
		</div>
	);
}
