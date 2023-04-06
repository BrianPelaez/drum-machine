import { useEffect, useState } from "react";
import "./App.css";
import Boton from "./components/Boton";
import { keysBat } from "./helpers/keys";
import { keysPiano } from "./helpers/keys-piano";

function App() {
  const [key, setKey] = useState("");
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [string, setString] = useState("");
  const [keypressed, setKeypressed] = useState(false);
  const [currentkeys, setCurrentKeys] = useState(keysBat);

  const handlePower = () => {
    const inner = document.getElementById("inner");
    inner.style.float = inner.style.float === "left" ? "right" : "left";
    inner.style.float =
      inner.style.float === "left" ? setPower(false) : setPower(true);
    setString("");
  };

  const handleBank = () => {
    if (!power) return
    const inner = document.getElementById("bank");
    inner.style.float = inner.style.float === "left" ? "right" : "left";

    if (currentkeys === keysBat) {
      setCurrentKeys(keysPiano);
      setString("Smooth Piano Kit");
    } else {
      setCurrentKeys(keysBat);
      setString("Heater Kit");
    }
  };
  const handleVolume = (e) => {

    setVolume(e.target.value);
    setString(`VOLUMEN: ${e.target.value}`);
  };

  const handleKeyDown = (e) => {
    setKeypressed(true);
    setKey(e.key);
    //console.log(e.key)
  };

  const handleKeyUp = (e) => {
    setKey("");
    setKeypressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="App">
      <div className="container" id="drum-machine">
        <div className="botonera">
          {currentkeys.map((el) => (
            <Boton
              key={el.keyCode}
              el={el}
              keypress={key}
              power={power}
              setString={setString}
              keypressed={keypressed}
              volume={volume}
            />
          ))}
        </div>
        <div className="controles-container">
          <div className="controles">
            <p>Power</p>
            <div className="select" onClick={handlePower}>
              <div className="inner" id="inner"></div>
            </div>
          </div>
          <p id="display">&nbsp;{string}</p>
          <div className="volume-slider">
            <input
              max={1}
              min={0}
              step={0.01}
              type="range"
              value={volume}
              onChange={handleVolume}
            ></input>
          </div>
          <div className="controles">
            <p>Bank</p>
            <div className="select" onClick={handleBank}>
              <div className="inner" id="bank"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
