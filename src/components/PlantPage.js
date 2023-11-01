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

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search search={search} onSearch={setSearch} />
      <PlantList plants={plants} search={search} />
    </main>
  );
}

export default PlantPage;
