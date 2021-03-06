import { useContext, useEffect, useState, useCallback } from 'react';
import { Context } from '../../App';
import { Route } from 'react-router-dom';
import Loading from '../Loading/Loading';
import SettingsLink from './SettingsLink';
import Settings from '../Settings/Settings';
import Effects from '../Effects/Effects';
import Keyboard from './Keyboard';
import Drone from './Drone';
import Noise from './Noise';
import Percussion from './Percussion';
import handleEffects from '../../MusicLogic/handleEffects';

const mounted = [];

export default function InstrumentTemplate({ instrument }) {
  const sessionPin = useContext(Context).sessionPin;
  const instrumentsLoaded = useContext(Context).instrumentsLoaded;
  const getGlobalEffects = useContext(Context).getGlobalEffects;
  const setMusicData = useContext(Context).setMusicData;
  const soundSet = useContext(Context).soundSet;
  const [finalData, setFinalData] = useState(null);
  const setMyInstrument = useContext(Context).setMyInstrument;
  const socketId = useContext(Context).socketId;
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (!mounted.includes(instrument)) {
    handleEffects(getGlobalEffects(), socketId, instrument, sessionPin, false, soundSet);
    mounted.push(instrument);
  }

  const clone = useCallback(
    (obj) => {
      const copy = JSON.parse(JSON.stringify(obj));
      copy.socketId = socketId;
      copy.instrument = instrument;
      return copy;
    },
    [socketId, instrument]
  );

  const preventer = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setMyInstrument(instrument);
    return () => {
      setMyInstrument(null);
    };
  }, [setMyInstrument, instrument]);

  useEffect(() => {
    if (finalData) {
      const copy = clone(finalData);
      setMusicData(copy);
      setFinalData(null);
    }
  }, [finalData, setMusicData, clone]);

  return (
    <div>
      {instrumentsLoaded ? (
        <div onContextMenu={preventer}>
          <SettingsLink forInstrument={instrument} />
          <Route path={`/instrument/${instrument}/settings`}>
            <Settings instrument={instrument} setSettingsOpen={setSettingsOpen} />
          </Route>
          <Route path={`/instrument/${instrument}/effects`}>
            <Effects instrument={instrument} setSettingsOpen={setSettingsOpen} />
          </Route>
          {!settingsOpen && instrument === 'drone' && <Drone setFinalData={setFinalData} />}
          {!settingsOpen && instrument === 'keyboard' && <Keyboard setFinalData={setFinalData} />}
          {!settingsOpen && instrument === 'noise' && <Noise setFinalData={setFinalData} />}
          {!settingsOpen && instrument === 'percussion' && <Percussion setFinalData={setFinalData} />}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
