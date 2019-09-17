import React from "react";

export default function() {
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Omamori App</h1>
              <p className="lead"> Connect with your patients</p>
              <hr />
              <a
                href="https://connect.pointclickcare.com/auth/login?client_id=nKNIGveljvRUIsL2oGwN1NT80sDgHuyw&response_type=code&redirect_uri=https://localhost:3443/api/login/callback"
                className="btn btn-lg btn-light"
              >
                {" "}
                Login{" "}
              </a>
            </div>
          </div>
          <footer className="bg-dark text-white mt-5 p-4 text-center">
            Copyright &copy; {new Date().getFullYear()} Omamori
          </footer>
        </div>
      </div>
    </div>
  );
};
