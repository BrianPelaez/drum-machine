import { useEffect, useCallback } from "react";
import "./Boton.css";

const Boton = (props) => {



  const handleClick = useCallback((e) => {

    const changeColor = (e) => {
      const btn = document.getElementById(props.el.id);
      btn.classList.toggle("play");
      const interval = setInterval(() => {
        btn.classList.toggle("play");
        clearInterval(interval);
      }, 100);
    };

    if (!props.power) return;
    const audio = document.getElementById(props.el.keyTrigger);
    audio.currentTime = 0;
    audio.volume = props.volume;
    audio.play();
    changeColor();
    props.setString(props.el.id);
  }, [props]);


  useEffect(() => {
    if (props.keypress === props.el.keyCode) {
      handleClick();
    
    }
  }, [handleClick, props.keypress, props.el.keyCode]);

  return (
    <div className="drum-pad" id={props.el.id} onClick={(e) => handleClick(e)}>
      <audio
        className="clip"
        id={props.el.keyTrigger}
        src={props.el.url}
      ></audio>
      {props.el.keyTrigger}
    </div>
  );
};

export default Boton;
