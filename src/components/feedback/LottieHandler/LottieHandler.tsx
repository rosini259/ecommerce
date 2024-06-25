import Lottie from "lottie-react";
import empty from "@assets/lottiefiles/empty.json";
import error from "@assets/lottiefiles/error.json";
import loading from "@assets/lottiefiles/loading.json";
import notFound from "@assets/lottiefiles/notFound.json";
import success from "@assets/lottiefiles/success.json";
const lottieTypes = {
  empty,
  error,
  loading,
  notFound,
  success
};
type LottieHandlerProps = {
  type: keyof typeof lottieTypes;
  message?: string;
  className?: string;
};

const LottieHandler = ({ type, message, className }: LottieHandlerProps) => {
  const lottie = lottieTypes[type];
  const messageStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px" ,marginTop:"30px"};
  return (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie
        animationData={lottie}
        style={{ width: "400px"}}
      />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
