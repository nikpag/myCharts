import Header from "../components/Header";

export default function NewUser() {
    return (
        <>
            <Header></Header>

            <div class="container">
                <h3 class="m-5">This is the first time you are logging in with (google account goes here)</h3>
                <h4 class="m-5">If you continue, your email will be stored in our user database, so you can store your created charts and purchase chart credits.</h4>

                <div class="d-flex justify-content-center">
                    <button type="button" class="me-5 btn btn-success">Continue</button>
                    <button type="button" class="btn btn-danger">No, thanks</button>
                </div>
            </div>



        </>
    );
}
