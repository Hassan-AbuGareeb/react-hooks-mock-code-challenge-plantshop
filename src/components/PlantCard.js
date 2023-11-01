import React, { useState } from "react";

function PlantCard({ onDelete, id, name, image, price, onPriceChange }) {
  const [inStock, setInStock] = useState(true);
  const [changePrice, setChangePrice] = useState(false);
  const [newPrice, setNewPrice] = useState(0);
  function handleInStockClick() {
    setInStock(!inStock);
  }

  function handleChangePrice() {
    setChangePrice(!changePrice);
  }

  function handleDelete() {
    //delete from state
    onDelete(id);
    //fetch delete
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setChangePrice(!changePrice);
    //change state here
    onPriceChange(newPrice, id);
    //fetch patch
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      {changePrice ? (
        <>
          <form onSubmit={handleSubmit}>
            <label>new price:</label>
            <input
              type="number"
              name="price"
              step="0.01"
              placeholder="Price"
              value={newPrice}
              onChange={(event) => setNewPrice(event.target.value)}
            />
          </form>
        </>
      ) : (
        <p>Price: {price}</p>
      )}
      <button onClick={handleChangePrice}>change price</button>
      {inStock ? (
        <button className="primary" onClick={handleInStockClick}>
          In Stock
        </button>
      ) : (
        <button onClick={handleInStockClick}>Out of Stock</button>
      )}
      <button className="primary" onClick={handleDelete}>
        Delete plant
      </button>
    </li>
  );
}

export default PlantCard;
