import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // Fetch food list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message || "Error fetching data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.response?.data?.message || "Error fetching data");
    }
  };

  // Remove food item
  const removeFood = async (foodId) => {
    if (!foodId) {
      toast.error("Invalid food ID");
      return;
    }

    try {
      const response = await axios.delete(`${url}/api/food/remove/${foodId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setList((prevList) => prevList.filter((item) => item._id !== foodId));
      } else {
        toast.error(response.data.message || "Error removing food");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Error removing food");
    }
  };

  useEffect(() => {
    fetchList();
  }, [url]); // Re-fetch when `url` changes

  const formatPrice = (price, type) =>
    price ? `Rs ${price} (${type})` : "-";

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length > 0 ? (
          list.map((item) => (
            <div key={item._id} className="list-table-format">
              <img
                src={item.Image ? `${url}/images/${item.Image}` : "/placeholder.jpg"}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.description || "-"}</p>
              <p>{item.category || "Uncategorized"}</p>
              <p>
                {formatPrice(item.fullPrice, "Full")} <br />
                {formatPrice(item.normalPrice, "Normal")} <br />
                {formatPrice(item.price, "Portion")}
              </p>
              <p
                onClick={() => removeFood(item._id)}
                className="cursor"
                style={{ cursor: "pointer", color: "red" }}
              >
                ❌
              </p>
            </div>
          ))
        ) : (
          <p>No food items available</p>
        )}
      </div>
    </div>
  );
};

export default List;
