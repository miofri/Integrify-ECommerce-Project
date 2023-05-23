import { useNavigate } from "react-router-dom";

export const useHandleGoToHomePage = () => {
  const navigate = useNavigate();
  const handleGoToHomePage = () => {
    navigate("/");
  };
  return handleGoToHomePage;
};

export const useHandleGoToProfilePage = () => {
  const navigate = useNavigate();
  const handleGoToProfilePage = () => {
    navigate("/profile");
  };
  return handleGoToProfilePage;
};

export const useHandleGoToAllProducts = () => {
  const navigate = useNavigate();
  const handleGoToProfilePage = () => {
    navigate("/all-products");
  };
  return handleGoToProfilePage;
};

export const useHandleGoBackOnePage = () => {
  const navigate = useNavigate();
  const handleGoToProfilePage = () => {
    navigate(-1);
  };
  return handleGoToProfilePage;
};
