import socket from '../clientSocketHandler';

export default function handleEffects(effects, socketId, instrument, sessionPin, fromAnotherUser, soundSet) {
  if (sessionPin === undefined) {
    throw new Error('missing sessionPin');
  }

  if (sessionPin && !fromAnotherUser) {
    socket.emit('effectsChange', effects, socketId, instrument, sessionPin);
  }
  if (soundSet) {
    soundSet.setEffects(instrument, effects);
  }
}
