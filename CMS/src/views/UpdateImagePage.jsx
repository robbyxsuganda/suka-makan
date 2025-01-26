import Button from "../components/Button";

export default function UpdateImage() {
  return (
    <>
      {/* Update Section */}
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="update-product-section">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="pt-3 pb-2 mb-3">
              <form id="register-form">
                <h1 className="h3 mb-3 display-1">Update Image</h1>
                {/* <div class="mb-3"> */}
                <div className="input-group mb-3">
                  <input type="file" className="form-control pb-2" id="inputGroupFile02" autoComplete="off" required="" />
                </div>
                {/* <button className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3" type="submit">
                  Update Image
                </button> */}
                <Button />
                {/* </div> */}
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* End Update Section */}
    </>
  );
}
