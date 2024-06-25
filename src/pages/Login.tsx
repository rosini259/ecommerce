import Heading from "@components/common/Heading/Heading";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Input from "@components/forms/input/input";
import useLogin from "@hooks/useLogin";

const Login = () => {
  const {
    error,
    loading,
    accessToken,
    formErrors,
    searchParam,
    register,
    handleSubmit,
    submitForm,
  } = useLogin();

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParam.get("message") == "login_required" && (
            <Alert variant="success">
              you need to login to view this content
            </Alert>
          )}

          {searchParam.get("message") == "account_created" && (
            <Alert variant="success">
              your account is successfully created, please login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              name="email"
              label="Email address"
              register={register}
              error={formErrors.email?.message}
            />

            <Input
              name="password"
              label="Password"
              register={register}
              error={formErrors.password?.message}
              type="password"
            />

            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading == "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>

            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
