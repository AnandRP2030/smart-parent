import { Container } from "react-bootstrap";
import { ParentSignupForm } from "./parentSignupForm";
import { CommonFooter } from "../../../components/common/footer/footer";
import "./parentSignup.css";
import { useNavigate } from "react-router-dom";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
export const ParentSignupPage = () => {
  const navigate = useNavigate();
  const navigateParentLogin = () => {
    navigate("/parent/login");
  };

  return (
    <>
      <ParentNavbar />
      <div className="mt-5" id="user-signup-page">
        <Container className="user-signup-container">
          <div className="user-signup-form">
            <div className="user-signup-form-heading">
              {" "}
              <h3 className="text-center">Register as Parent</h3>{" "}
            </div>

            <div className="user-signup-input-container">
              <div className="users-signup-form-components p-3 shadow">
                <ParentSignupForm />
              </div>
            </div>
          </div>
          <p className="ms-3 mt-5">
            Already have an account?{" "}
            <span
              className="font-weight-bold user-forgot-password text-primary"
              onClick={navigateParentLogin}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Sign In{" "}
            </span>
          </p>
        </Container>

        <div className="mt-5">
          <CommonFooter />
        </div>
      </div>
    </>
  );
};
