import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  //const location = "New York, NY"; constant value ,rerender cannot change it
  //class is reserved name for js, so change into className
  //for is specify form id, but is reserved, so change into htmlFor

  //hooks, all start with use
  //setLocation is updater to update location, Newyork here is a default value

  //breed and animals usestate structure are similar, can create a componet for them
  const [location, setLocation] = useState("Seattle, WA");
  //const [animal, setAnimal] = useState("dog");
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  //const [breed, setBreed] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme] = useContext(ThemeContext);

  //return a promise
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    setPets(animals || []);
    //console.log(animals);
  }
  //disconnected when rerender happens, and run after render happens
  //not slow down the first render
  //we only need update when animals change
  useEffect(() => {
    //clean the current data
    setBreeds([]);
    setBreed("");
    //return promise
    //console.log("I run");
    pet.breeds(animal).then(
      ({ breeds: apiBreeds }) => {
        const breedStrings = apiBreeds.map(({ name }) => name); //destructing, breedObj=>breedObj.name
        setBreeds(breedStrings);
      },
      (error) => console.error(error)
    );
  }, [animal, setBreed, setBreeds]);
  //breed will change according to the animals,and function
  //if depend on nothing, will have infinite loop keep calling useEffect
  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        {
          //console.log("I run first")
          /* <label htmlFor="animal">
            Animal
            <select
                id="animal"
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
                onBlur={(e) => setAnimal(e.target.value)}
            >
                <option>All</option>
                {ANIMALS.map((animalString) => (
                <option key={animalString} value={animalString}>
                    {animalString}
                </option>
                ))}
            </select>
            </label>

            <label htmlFor="breed">
            Breed
            <select
                id="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                onBlur={(e) => setBreed(e.target.value)}
                disabled={breeds.length === 0}
            >
                <option>All</option>
                {breeds.map((breedString) => (
                <option key={breedString} value={breedString}>
                    {breedString}
                </option>
                ))}
            </select>
            </label>*/
        }
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
