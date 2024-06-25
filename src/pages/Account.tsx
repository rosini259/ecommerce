import Heading from "@components/common/Heading/Heading";
import { useAppSelector } from "@store/hooks";

const Account = () => {
  const accountInfo = useAppSelector((state) => state.authSlice.user);

  return (
    <>
      <Heading title="Account Info" />
      <ul>
        <li>First Name: {accountInfo?.firstName}</li>
        <li>Last Name: {accountInfo?.lastName}</li>
        <li>Email: {accountInfo?.email}</li>
      </ul>
    </>
  );
};

export default Account;
