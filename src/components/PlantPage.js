import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((resp) => resp.json())
      .then((data) => setPlants([...data]));
  }, []);

  function addPlant(plantObj) {
    setPlants([...plants, plantObj]);
  }

  function handleDelete(plantId) {
    const updatedPlants = plants.filter((plant) => {
      if (plant.id === plantId) return false;
      return true;
    });
    setPlants(updatedPlants);
  }

  function handlePriceChange(newPrice, id) {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === id) return { ...plant, price: newPrice };
      return plant;
    });
    setPlants(updatedPlants);
  }

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search search={search} onSearch={setSearch} />
      <PlantList
        plants={plants}
        search={search}
        onDelete={handleDelete}
        onPriceChange={handlePriceChange}
      />
    </main>
  );
}

export default PlantPage;
