import Heading from "@components/common/Heading/Heading";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import Input from "@components/forms/input/input";
import { Navigate } from "react-router-dom";
import useRegister from "@hooks/useRegister";

const Register = () => {
  const {
    loading,
    error,
    accessToken,
    formErrors,
    emailAvailabilityStatus,
    register,
    handleSubmit,
    submitForm,
    emailOnBlurHandler,
  } = useRegister();
  if (accessToken) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              name="firstName"
              label="First name"
              register={register}
              error={formErrors.firstName?.message}
            />
            <Input
              name="lastName"
              label="Last name"
              register={register}
              error={formErrors.lastName?.message}
            />
            <Input
              name="email"
              label="Email address"
              register={register}
              error={
                formErrors.email?.message
                  ? formErrors.email?.message
                  : emailAvailabilityStatus == "notAvailable"
                  ? "this email is used"
                  : emailAvailabilityStatus == "failed"
                  ? "error from the server"
                  : ""
              }
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabilityStatus == "checking"
                  ? "checking email please wait..."
                  : ""
              }
              success={
                emailAvailabilityStatus == "available"
                  ? "this email is available for use"
                  : ""
              }
              disabled={emailAvailabilityStatus == "checking" ? true : false}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              register={register}
              error={formErrors.password?.message}
            />
            <Input
              type="Password"
              name="confirmPassword"
              label="Confirm Password"
              register={register}
              error={formErrors.confirmPassword?.message}
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabilityStatus == "checking"
                  ? true
                  : false || loading == "pending"
              }
            >
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

export default Register;
