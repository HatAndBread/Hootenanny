import { useState, useContext } from 'react';
import { Context } from '../../../App';
import '../../../Styles/Components/Keyboard.css';

const onStyle = { backgroundColor: '#9d8df1', borderRadius: '0px' };
const offStyle = { backgroundColor: 'gray', borderRadius: '0px' };

export default function OctaveSetter({ setPointerDown, setOctave }) {
  const keyboardInfinity = useContext(Context).keyboardInfinity;
  const setKeyboardInfinity = useContext(Context).setKeyboardInfinity;
  const [infinityStyle, setInfinityStyle] = useState(keyboardInfinity ? onStyle : offStyle);
  const [colors, setColors] = useState([offStyle, offStyle, onStyle, offStyle, offStyle, offStyle]);

  const handleClick = (e) => {
    setOctave(parseInt(e.target.value, 10));
    const newColors = [];
    for (let i = 0; i < colors.length; i++) {
      i === parseInt(e.target.value, 10) ? newColors.push(onStyle) : newColors.push(offStyle);
    }
    setColors(newColors);
  };
  const handleInifinityClick = () => {
    if (keyboardInfinity) {
      setKeyboardInfinity(false);
      setPointerDown(false);
      setInfinityStyle(offStyle);
    } else {
      setKeyboardInfinity(true);
      setInfinityStyle(onStyle);
    }
  };
  const buttons = [];
  const text = ['Very low', 'Low', 'Medium', 'High', 'Very high', '🙉', '🚥'];
  for (let i = 0; i < 7; i++) {
    buttons.push(
      <button
        style={i < 6 ? colors[i] : infinityStyle}
        value={i}
        key={i}
        onClick={i < 6 ? handleClick : handleInifinityClick}
      >
        {text[i]}
      </button>
    );
  }
  return (
    <div className="octave-setter-container">
      {buttons.map((button) => {
        return button;
      })}
    </div>
  );
}
