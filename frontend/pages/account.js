import Header from "../components/Header";

export default function Account() {
  return (
    <>
      <Header></Header>

      <div class="container">
        <h2 class="m-5 text-center">Hello (google account goes here)</h2>

        <div class="ms-5 mt-3 row">
          <div class="col-3"></div>
          <div class="col-3"><h4 class="text-end">Number of charts</h4></div>
          <div class="col-3"><input type="text" class="form-control" readonly /></div>
        </div>
        <div class="ms-5 mt-3 row">
          <div class="col-3"></div>
          <div class="col-3"><h4 class="text-end">Available credits</h4></div>
          <div class="col-3"><input type="text" class="form-control" readonly /></div>
        </div>
        <div class="ms-5 mt-3 row">
          <div class="col-3"></div>
          <div class="col-3"><h4 class="text-end">Last Login</h4></div>
          <div class="col-3"><input type="text" class="form-control" readonly /></div>
        </div>
      </div>

      <div class="ms-5 mt-5 d-flex justify-content-center">
        <button type="button" class="ms-5 me-5 btn btn-dark">My charts</button>
        <button type="button" class="me-5 btn btn-dark">New chart</button>
        <button type="button" class="btn btn-dark">Buy credits</button>
      </div>



    </>
  );
}
