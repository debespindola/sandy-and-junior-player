 const playButton = document.querySelector('.play-button');

const getNote = (string) => {
  const notes = {
    C: 16.35,
    'C#': 17.32,
    Db: 17.32,
    D: 18.35,
    'D#': 19.45,
    Eb: 19.45,
    E: 20.60,
    F: 21.83,
    'F#': 23.12,
    Gb: 23.12,
    G: 24.5,
    'G#': 25.96,
    Ab: 25.96,
    A: 27.50,
    'A#': 29.14,
    Bb: 29.14,
    B: 30.87,
    //mute note:
    M: 0,
  };
  
  const [noteName, noteOctaveString] = string.split(/(\d+)/);

  const noteOctave = Number(noteOctaveString);

  return notes[noteName] * (2 ** noteOctave);
};

const fullsong = [
  'B4', 'M0', 'B4', 'M0', 'G#4', 'M0', 'M0', 'F#4', 'M0', 'M0', 'Eb4', 'M0', 'M0', 'C#4', 'M0', 'B3', 'M0', 'C#4', 'M0', 'Eb4', 'M0', 'M0', 'M0',
  'Eb4', 'M0', 'B4', 'M0', 'B4', 'M0', 'G#4', 'M0', 'M0', 'F#4', 'M0', 'M0', 'Eb4', 'M0', 'M0', 'C#4', 'M0', 'B3', 'M0', 'C#4', 'M0', 'B3', 'B3', 'M0'
];

const createOscillator = () => {
  const context = new AudioContext();
  
  const oscillator = context.createOscillator();
  
  oscillator.connect(context.destination);
  oscillator.type = 'sine';

  return oscillator;
}

const playSong = (song) => {
  let i = 1;

  const oscillator = createOscillator();
  oscillator.start();
  oscillator.frequency.value = getNote(song[0]);


  const interval = setInterval(() => {
    oscillator.frequency.value = getNote(song[i]);

    i += 1;

    if (i === song.length) {
      clearInterval(interval);
      oscillator.stop();
      
      setTimeout(() => {
        oscillator.frequency.value = getNote('B3');
      }, 100);
    }
  }, 100);
};

playButton.addEventListener('click', () => {
  playSong(fullsong);
});
