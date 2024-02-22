import React, { useState } from "react";
import "./FishForm.css";

function FishForm({data, onChange, validation, onAdd}) {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    onChange(event);
  };


  return (
    <div className="fish-form">
      <input
        type="text"
        placeholder="jméno ryby"
        name="name"
        value={data.name}
        onChange={onChange}
      />
      <div>
        <label>
          <input
            type="radio"
            name="type"
            value="mala"
            checked={data.type === "mala"}
            onChange={handleTypeChange}
          />
          Malá
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="velka"
            checked={data.type === "velka"}
            onChange={handleTypeChange}
          />
          Velká
        </label>
      </div>
      {/*<p>Selected type: {selectedType}</p>*/}
      <button disabled={!validation} onClick={onAdd}>
        Přidat
      </button>
    </div>
  );
}


export default FishForm;
