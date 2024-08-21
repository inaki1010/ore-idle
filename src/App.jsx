import { useState } from "react";
import "./css/App.css";
import Mineral from "./components/Mineral";
import Rock from "./components/Rock";
import UnlockNextButton from "./components/UnlockNextButton";
import Sidebar from "./components/SideBar.jsx";

function App() {
  const [rockCount, setRockCount] = useState(0);
  const [coalCount, setCoalCount] = useState(0);
  const [ironCount, setIronCount] = useState(0);
  const [coalUnlocked, setCoalUnlocked] = useState(false);
  const [ironUnlocked, setIronUnlocked] = useState(false);

  const handleRockClick = () => {
    setRockCount(rockCount + 1000);
  };

  const handleBuyCoal = () => {
    if (rockCount >= 10) {
      setRockCount(rockCount - 10);
      setCoalCount(coalCount + 100);
    }
  };

  const handleBuyIron = () => {
    if (coalCount >= 10) {
      setCoalCount(coalCount - 10);
      setIronCount(ironCount + 1);
    }
  };

  const handleUnlockCoal = () => {
    setCoalUnlocked(true);
  };

  const handleUnlockIron = () => {
    setIronUnlocked(true);
  };

  const shopItems = [
    {
      name: "Coal",
      cost: 10,
      currencyCount: rockCount,
      onBuy: handleBuyCoal,
      isVisible: coalUnlocked,
    },
    {
      name: "Iron",
      cost: 10,
      currencyCount: coalCount,
      onBuy: handleBuyIron,
      isVisible: ironUnlocked,
    },
  ];

  return (
    <div className="app-container">
      <Sidebar items={shopItems.filter((item) => item.isVisible)} />

      <div className="main-content">
        {/*Rock container*/}
        <div className="card">
          <p className="counter">
            <span
              className={`counter-content ${
                rockCount.toString().length > 4 ? "small-text" : ""
              }`}
            >
              {rockCount} rocks
            </span>
          </p>

          {/*Coal unlock button*/}
          <Rock
            onClick={handleRockClick}
            imageUrl={"/rock.svg"}
            altText={"rock"}
          />
          {!coalUnlocked && rockCount >= 5 && (
            <UnlockNextButton onClick={handleUnlockCoal} next="Unlock Coal" />
          )}
        </div>

        {/*Coal container*/}
        {coalUnlocked && (
          <div className="card">
            <p className="counter">
              <span
                className={`counter-content ${
                  coalCount.toString().length > 4 ? "small-text" : ""
                }`}
              >
                {coalCount} coal
              </span>
            </p>
            <Mineral
              count={coalCount}
              imageUrl={"/coal.svg"}
              altText={"coal"}
            />

            {/*Unlock iron button*/}
            {!ironUnlocked && coalCount >= 5 && (
              <UnlockNextButton onClick={handleUnlockIron} next="Unlock Iron" />
            )}
          </div>
        )}

        {/*Iron container*/}
        {ironUnlocked && (
          <div className="card">
            <p className="counter">
              <span
                className={`counter-content ${
                  ironCount.toString().length > 4 ? "small-text" : ""
                }`}
              >
                {ironCount} iron
              </span>
            </p>
            <Mineral
              count={ironCount}
              imageUrl={"/iron.svg"}
              altText={"iron"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
