import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [plantData, setPlantData] = useState({
    name: "",
    image: "",
    price: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    //add plant to plants state
    const newPlant = { ...plantData };
    for (const property in plantData) {
      setPlantData((prevObj) => {
        return { ...prevObj, [property]: "" };
      });
    }

    //fetch to add plant to the database
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((resp) => resp.json())
      .then((data) => onAddPlant(data));
  }

  function handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    setPlantData({ ...plantData, [key]: value });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={plantData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={plantData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={plantData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
