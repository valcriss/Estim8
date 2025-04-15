const adjectives = [
    'brave',
    'clever',
    'fast',
    'happy',
    'lucky',
    'green',
    'silent',
    'sharp',
    'calm',
    'wild',
  ];
  
  const nouns = [
    'lion',
    'tiger',
    'eagle',
    'panda',
    'ninja',
    'pirate',
    'robot',
    'wizard',
    'dragon',
    'phoenix',
  ];
  
  export function generateRoomCode(): string {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(10 + Math.random() * 90);
    return `${adj}-${noun}-${num}`;
  }
  