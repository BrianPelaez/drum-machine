import { useEffect, useCallback } from "react";
import "./Boton.css";

const Boton = (props) => {



  const handleClick = useCallback((e) => {
    
    const changeColor = () => {
      const btn = document.getElementById(props.el.id);
      btn.classList.add("play");
      setTimeout(() => {
        btn.classList.remove("play");
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
    //console.log(props.keypress)
     
    if (props.keypress.toLowerCase() === props.el.keyTrigger.toLowerCase()) {
      handleClick();
      
    }
  }, [props.keypress, props.el.keyTrigger]);

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
