import React, { useState } from "react";
import axios from "axios";

const Drink = () => {
  const [drinkName, setDrinkName] = useState("");
  const [drinkPrice, setDrinkPrice] = useState("");

  const handleDrinkNameChange = (event) => {
    setDrinkName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setDrinkPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newDrink = { DrinkName: drinkName, DrinkPrice: drinkPrice };
      const response = await axios.post(
        "http://localhost:4000/api/drink",
        newDrink
      );
      console.log("New drink created:", response.data);
      // Reset the input field after successful creation
      setDrinkName("");
    } catch (error) {
      console.log("Error creating new drink:", error);
    }
  };

  return (
    <div>
      <h2>Create Drink</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Drink Name:</label>
          <input
            type="text"
            value={drinkName}
            onChange={handleDrinkNameChange}
          />
        </div>
        <div>
          <label>Drink Price:</label>
          <input type="text" value={drinkPrice} onChange={handlePriceChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Drink;
