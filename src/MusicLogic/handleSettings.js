import socket from '../clientSocketHandler';

export default function handleSettings(settings, socketId, instrument, sessionPin, fromAnotherUser, soundSet) {
  if (sessionPin === undefined) {
    throw new Error('missing sessionPin');
  }
  if (sessionPin && !fromAnotherUser) {
    socket.emit('settingsChange', settings, socketId, instrument, sessionPin);
  }
  if (soundSet) {
    soundSet.setSettings(instrument, settings);
  }
}
