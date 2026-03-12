// ------------------
// IMPORT STATEMENTS
// ------------------

import { useState, useEffect } from "react";
import "./App.css";

// ------------------
// FUNCTION DECLARATION
// ------------------

function App() {
  // ------------------
  // STATE VARIABLES
  // ------------------

  const [animals, setAnimals] = useState(null);

  // ------------------
  // HELPER FUNCTIONS
  // ------------------
  const getAllAnimals = async () => {
    const response = await fetch("/api/get-all-animals");
    const data = await response.json();
    console.log(data);
    setAnimals(data);
  };
  const deleteOneAnimal = async (id) => {
    // delete the animal by sending a POST request
    try {
      await fetch(`/api/delete-one-animal/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }

    // fetch all animals data again
    getAllAnimals();
  };
  // ------------------
  // EFFECTS
  // ------------------

  useEffect(() => {
    getAllAnimals();
  }, []);

  // ------------------
  // RENDERING JSX TO THE SCREEN
  // ------------------

  return (
    <>
      <h1>🐾 Full-Stack Animals App 🐾</h1>
      <div className="card">
        <h2>All Animals</h2>
        <div className="animals">
          {animals?.map((animal) => (
            <div className="animal" key={animal.id}>
              <h2>{animal.name}</h2>
              <p>Id: {animal.id}</p>
              <p>Category: {animal.category}</p>
              <p>Lives in: {animal.lives_in}</p>
              <p>Can fly: {animal.can_fly ? "True ✅" : "False ❌"}</p>
              <button onClick={() => deleteOneAnimal(animal.id)}>
                Delete Animal
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ------------------
// EXPORT STATEMENT
// ------------------

export default App;
