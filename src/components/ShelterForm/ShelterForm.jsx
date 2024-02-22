import React, {useEffect, useState} from "react";
import "./ShelterForm.css";

function ShelterForm({onAdd, setAquariumVolume, aquariumVolume, totalVolume}) {
  const [volume, setVolume] = useState({
    height: "800",
    width: "310",
    length: "460",
  });

  const [disable, setDisable] = useState(true);

  const handleStorage = (event) => {
    setVolume({...volume, [event.target.name]: event.target.value});
  };


  // useEffect(() => {
  //   const temp =
  //     (volume.height === "" || parseInt(volume.height) === 0) &&
  //     (volume.width === "" || parseInt(volume.width) === 0) &&
  //     (volume.length === "" || parseInt(volume.length) === 0);
  //   setDisable(temp);
  // }, [volume]);
  //



  useEffect(() => {
    const updatedVolume = (volume.height * volume.width * volume.length) / 1000000;
    setAquariumVolume(updatedVolume);
  }, [volume, setAquariumVolume]);


  const handleClick = () => {
    const storageToSend = {
      height: volume.height === "" ? 0 : parseInt(volume.height),
      width: volume.width === "" ? 0 : parseInt(volume.width),
      length: volume.length === "" ? 0 : parseInt(volume.length),
    };
    onAdd(storageToSend);
    setVolume({
      height: "",
      width: "",
      length: "",
    });
  };

  const buttonStyle = {
    backgroundColor: aquariumVolume > totalVolume ? 'green' : 'red'
  };

  return (
    <div className="fish-form">
      <input
        type="number"
        min="0"
        placeholder="výška (mm)"
        name="height"
        value={volume.height}
        onChange={handleStorage}
      />
      <input
        type="number"
        min="0"
        placeholder="šířka (mm)"
        name="width"
        value={volume.width}
        onChange={handleStorage}
      />
      <input
        type="number"
        min="0"
        placeholder="Délka (mm)"
        name="length"
        value={volume.length}
        onChange={handleStorage}
      />
      {/*<button className={disable ? "btn-disabled" : "btn-enabled"} disabled={disable} onClick={handleClick}>*/}
      {/*  Schválit rozměry*/}
      {/*</button>*/}
      {/*<button disabled={disable} onClick={handleClick}>*/}
      {/*  Schválit rozměry*/}
      {/*</button>*/}

      <button style={buttonStyle} onClick={onAdd}>
        Schválit rozměry
      </button>
    </div>
  );
}

export default ShelterForm;
