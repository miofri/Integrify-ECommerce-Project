import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const CategoryPages = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const categoryValue = useSelector((state: RootState) => state.category.value);
  const { state } = useLocation();
  const url = `https://api.escuelajs.co/api/v1/products/?categoryId=${state.id}`;

  console.log(state);

  useEffect(() => {
    const getCurrentItems = async () => {
      const response = await axios.get(url);
      const finalData = response.data;
      setCurrentItems(finalData);
    };
    getCurrentItems();
  }, [state]);

  return (
    <>
      {currentItems.map((data: any) => (
        <div>{data.description}</div>
      ))}
    </>
  );
};
