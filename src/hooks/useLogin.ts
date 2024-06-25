import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInType } from "src/validations/signInSchema";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const { error, loading, accessToken } = useAppSelector(
    (state) => state.authSlice
  );
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<signInType>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });
  const submitForm: SubmitHandler<signInType> = (data) => {
    if (searchParam.get("message")) {
      setSearchParam("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate("/"));
  };
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  return {
    error,
    loading,
    accessToken,
    formErrors,
    searchParam,
    register,
    handleSubmit,
    submitForm,
  };
};

export default useLogin;
