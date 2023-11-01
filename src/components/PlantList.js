import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ onDelete, search, plants, onPriceChange }) {
  const searchedPlants = plants.filter((plant) => {
    if (plant.name.toLowerCase().trim().includes(search.toLowerCase().trim()))
      return true;
    return false;
  });

  const plantItems = searchedPlants.map((plant) => {
    return (
      <PlantCard
        key={plant.id}
        id={plant.id}
        name={plant.name}
        image={plant.image}
        price={plant.price}
        onDelete={onDelete}
        onPriceChange={onPriceChange}
      />
    );
  });

  return <ul className="cards">{plantItems}</ul>;
}

export default PlantList;
