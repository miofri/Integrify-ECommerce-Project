import { useNavigate } from "react-router-dom";

export const useHandleGoToHomePage = () => {
  const navigate = useNavigate();
  const handleGoToHomePage = () => {
    navigate("/");
  };
  return handleGoToHomePage;
};
