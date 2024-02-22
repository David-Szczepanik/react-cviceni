import {useEffect, useState} from "react";
import rawData from "./fishData.json";
import PageContainer from "./components/PageContainer/PageContainer";
import FishList from "./components/DogList/FishList";
import FishForm from "./components/FishForm/FishForm";
import Toggler from "./components/Toggler/Toggler";
import ShelterForm from "./components/ShelterForm/ShelterForm";

function App() {
  const [listOfFish, setListOfFish] = useState(rawData.fish);
  const [newFish, setNewFish] = useState({
    id:
      listOfFish.length > 0
        ? Math.max(...listOfFish.map((fish) => fish.id)) + 1
        : 1,
    name: "",
    type: "",
  });


  const [activeTab, setActiveTab] = useState(1);



  const [aquariumVolume, setAquariumVolume] = useState(0);




  const handleChange = (event) => {
    const updatedFish = {...newFish, [event.target.name]: event.target.value};
    // validateData(updatedFish);
    setNewFish(updatedFish);
  };

// --- ADD ---
  const handleAdd = () => {
    const newFishToAdd = {
      id: newFish.id,
      name: newFish.name,
      type: newFish.type,
    };

    setListOfFish((listOfFish) => {
      return [...listOfFish, newFishToAdd];
    });

    setNewFish({
      id: newFish.id + 1,
      name: "",
      type: "",
    });
  };

  // --- DELETE ---
  const handleDelete = (idToDelete) => {
    setListOfFish(listOfFish.filter((fish) => fish.id !== idToDelete));
  };

  //TODO:
  const handleChoose = (source) => {
    switch (source) {
      case "list-of-fish": {
        setActiveTab(1);
        break;
      }
      case "aquarium": {
        setActiveTab(2);
        break;
      }
      default:
        break;
    }
  };

  const handleAddToStorage = () => {
    console.log("handleAddToStorage function called");
  };


  const totalVolume= listOfFish.reduce((total, fish) => {
  return total + (fish.type === "mala" ? 10 : 20);
}, 0);



return (
  <div className="App">
    <PageContainer>
      <Toggler active={activeTab} onChoose={handleChoose}/>
      {activeTab === 1 && (
        <>
          <FishList data={listOfFish} onDelete={handleDelete}/>

          <FishForm
            data={newFish}
            validation={newFish.name && newFish.type}
            onChange={handleChange}
            onAdd={handleAdd}
          />
        </>
      )}
      {activeTab === 2 && (
        <>
          <h1>{}</h1>
          <h2>Návrh akvária</h2>
          <p>Potřebný objem akvária pro aktuální počet ryb {totalVolume} l</p>
          <p>Objem akvária: {aquariumVolume.toFixed(1)} l</p>
          <p>Počet rybiček: {listOfFish.length}</p>
          <p>Počet malých rybiček: {listOfFish.filter(fish => fish.type === "mala").length}</p>
          <p>Počet velkých rybiček: {listOfFish.filter(fish => fish.type === "velka").length}</p>

          <ShelterForm onAdd={handleAddToStorage} setAquariumVolume={setAquariumVolume} aquariumVolume={aquariumVolume} totalVolume={totalVolume} />
        </>
      )}
    </PageContainer>
  </div>
);

}

export default App;
