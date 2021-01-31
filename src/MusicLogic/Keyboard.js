import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';

class Keyboard extends Instrument {
  constructor() {
    super();
    this.envelope = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.oscillator = new Tone.Oscillator().connect(this.envelope);
    this.rampTo = 0;
    this.playing = false;
  }

  play() {
    this.playing = true;
    this.oscillator.start(Tone.now());
    this.envelope.triggerAttack(Tone.now());
  }
  stop() {
    this.playing = false;
    this.oscillator.stop(`+${this.envelope.release}`);
    this.envelope.triggerRelease(Tone.now());
  }
}

export default Keyboard;
