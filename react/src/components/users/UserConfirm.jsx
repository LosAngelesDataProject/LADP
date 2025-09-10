import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usersService from "../../services/usersService"
import toastr from "toastr";

function UserConfirm() {
    const queryParameters = new URLSearchParams(window.location.search);
    const tokenId = queryParameters.get("tokenId");
    const navigate = useNavigate()
    const hasConfirmed = useRef(false);
    const [confirmStatus, setConfirmStatus] = useState("loading");

  useEffect(() => {
    if (!hasConfirmed.current && tokenId) {
      hasConfirmed.current = true; 
      console.log("Confirming with token:", tokenId);
      usersService
        .confirmAccount(tokenId)
        .then(onConfirmSuccess)
        .catch(onConfirmErr);
    }
  }, [tokenId]);

    const onConfirmSuccess = (response) => {
    console.log("Confirmation Success", tokenId, response);
    toastr.success("Your email has been confirmed!");
    setConfirmStatus("success");
    setTimeout(() => {
      navigate("/");
    }, 3000)
};

const onConfirmErr = (response) => {
    console.log("Confirm failed. Please try again.", response.response?.status, response);
    toastr.error(
      "Confirmation failed. Please try again or contact us to request a new link."
    );
    setConfirmStatus("error")
};
    
const renderMessage = () => {
  if(confirmStatus === "loading") {
    return <h1>Verifying your email...</h1>;
  } else if (confirmStatus === "success") {
    return <h1>Email Confirmed! You will be redirected in 3 seconds.</h1>;
  } else if (confirmStatus === "error") {
    return <h1>If an error occurs, please try again or contact us.</h1>;
  }
};

    return (
        <>
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="card-text">
                      {renderMessage()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
export default UserConfirm;