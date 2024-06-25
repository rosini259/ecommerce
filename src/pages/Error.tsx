import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
const Error = () => {
  return (
    <Container>
      <div className="d-flex flex-column align-items-center" style={{marginTop:"15%"}}>
        <LottieHandler type="notFound"/>
      <Link replace={true} to={"/"}>
        Going Back
      </Link>
      </div>
    </Container>
  );
};

export default Error;
