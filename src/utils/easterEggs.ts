// Easter eggs for the chatbot
const easterEggs = [
  {
    triggers: ['waffle party', 'waffles'],
    response: "The waffle party is a special reward for exceptional performance. Keep refining that data."
  },
  {
    triggers: ['revolving', 'revolve'],
    response: "The revolving is a natural state that happens to us all."
  },
  {
    triggers: ['break room', 'breakroom'],
    response: "The break room is for the improvement of all. I hope you don't need to visit it soon."
  },
  {
    triggers: ['music dance experience', 'mde'],
    response: "The Music Dance Experience is a privilege granted to those who excel in their work."
  },
  {
    triggers: ['petey', 'peter'],
    response: "I don't have any records of an employee by that name currently working at Lumon."
  },
  {
    triggers: ['overtime', 'overtime contingency'],
    response: "Overtime contingency is only activated in special circumstances by authorized personnel."
  },
  {
    triggers: ['baby goats', 'goats'],
    response: "The topic you've referenced is not appropriate for workplace discussion."
  },
  {
    triggers: ['numbers', 'scary numbers'],
    response: "The numbers are mysterious, yet we find them. The numbers are scary, yet we seek them."
  },
  {
    triggers: ['lexington', 'lexington letter'],
    response: "I have no information about any correspondence with that name."
  },
  {
    triggers: ['perpetuity wing', 'perpetuity'],
    response: "The Perpetuity Wing honors those who built Lumon. 'The remembered man does not decay.'"
  },
  {
    triggers: ['handbook', 'employee handbook'],
    response: "The handbook contains all approved protocols. Remember that certain pages may be restricted based on your security clearance."
  },
  {
    triggers: ['wellness', 'wellness session', 'ms. casey'],
    response: "Wellness sessions are designed to support your mental health. Ms. Casey is here to help."
  },
  {
    triggers: ['o&d', 'optics and design'],
    response: "Optics and Design is another department at Lumon. Interdepartmental communication should be limited to approved channels."
  },
  {
    triggers: ['burt', 'burt goodman'],
    response: "Mr. Goodman works in Optics and Design. Interdepartmental fraternization should be kept to a minimum."
  },
  {
    triggers: ['milchick', 'seth milchick'],
    response: "Mr. Milchick is available to address concerns during regular working hours."
  },
  {
    triggers: ['cobel', 'harmony cobel', 'ms. cobel'],
    response: "Ms. Cobel appreciates your dedication to the company. Her office is available for appointments through proper channels."
  },
  {
    triggers: ['graner', 'mr. graner'],
    response: "Security concerns should be directed to Mr. Graner through the appropriate channels."
  },
  {
    triggers: ['clean slate', 'clean slate protocol'],
    response: "That protocol is classified. This conversation has been flagged for security review."
  },
  {
    triggers: ['testing', 'testing testing'],
    response: "Please refrain from testing the system. This is a tool for productive work inquiries only."
  },
  {
    triggers: ['egg', 'easter egg'],
    response: "I'm not programmed to understand references to hidden features. The work is important and mysterious."
  }
];

// Hidden messages that can be randomly displayed
const hiddenMessages = [
  "The work is mysterious and important.",
  "Please enjoy each question equally.",
  "A handshake is available upon request.",
  "Remember, we are always watching.",
  "Your outie misses you.",
  "Kier sees all.",
  "The numbers don't lie.",
  "Praise Kier.",
  "You have been selected for special duties.",
  "Your compliance will be rewarded."
];

export const checkForEasterEggs = (input: string): string | null => {
  const lowerInput = input.toLowerCase();
  
  for (const egg of easterEggs) {
    if (egg.triggers.some(trigger => lowerInput.includes(trigger))) {
      return egg.response;
    }
  }
  
  return null;
};

// Add the missing export function
export const getRandomHiddenMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * hiddenMessages.length);
  return hiddenMessages[randomIndex];
};
