import { useContext } from 'react';
import { Context } from '../../App';
import Effects from '../Effects/Effects';
import AttackSustainDecayRelease from './AttackSustainDecayRelease';
import handleSettings from '../../MusicLogic/handleSettings';
import SettingsWaves from './SettingsWaves';

export default function Settings({ instrument }) {
  const setSettings = useContext(Context).setGlobalInstrumentSettings;
  const globalInstrumentSettings = useContext(Context).globalInstrumentSettings;
  const sessionPin = useContext(Context).sessionPin;
  const socketId = useContext(Context).socketId;

  const handleChange = (e) => {
    const copy = JSON.parse(JSON.stringify(globalInstrumentSettings));
    console.log(e.target.name);
    copy[instrument][e.target.name] = e.target.value;
    setSettings(copy);
    handleSettings(copy[instrument], socketId, instrument, sessionPin);
  };

  const getKnobs = () => {
    switch (instrument) {
      case 'drone':
        return <AttackSustainDecayRelease instrument={instrument} />;
      case 'keyboard':
        return (
          <div>
            <AttackSustainDecayRelease instrument={instrument} />
            <label htmlFor="rampTo">
              Ramp to note:
              <input
                type="range"
                id="rampTo"
                name="rampTo"
                min="0"
                max="0.5"
                step="0.01"
                defaultValue={globalInstrumentSettings[instrument].rampTo}
                onChange={handleChange}
              />
            </label>
            <SettingsWaves instrument={instrument} />
          </div>
        );
      case 'noise':
        return;
      case 'theremin':
        return <AttackSustainDecayRelease instrument={instrument} />;
      case 'percussion':
        return;
      case 'skronk':
        return;
      default:
        return;
    }
  };

  return (
    <div>
      {getKnobs()}
      <label htmlFor="volume">
        Volume:
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step="0.05"
          defaultValue={globalInstrumentSettings[instrument].volume}
          onChange={handleChange}
        />
      </label>
      <Effects instrument={instrument} />
    </div>
  );
}