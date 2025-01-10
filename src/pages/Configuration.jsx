import React, { useEffect, useState } from "react";
import BuildingConfiguration from "../components/Configuration/BuildingConfiguration";
import "../assets/css/Configuration.scss";

const Configuration = () => {
  const [someState, setSomeState] = useState(null);

  useEffect(() => {
    console.log("Configuration component mounted");
    setSomeState("Some value");
  }, []);

  return (
    <div className="configuration-container">
      <BuildingConfiguration someProp={someState} />
    </div>
  );
};

export default Configuration;
