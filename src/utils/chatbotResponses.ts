import { checkForEasterEggs, getRandomHiddenMessage } from './easterEggs';

// Function to get a response from the chatbot based on user input
export const getChatbotResponse = (input: string): string => {
  // Check for easter eggs first
  const easterEggResponse = checkForEasterEggs(input);
  if (easterEggResponse) {
    return easterEggResponse;
  }
  
  // Convert input to lowercase for easier matching
  const lowerInput = input.toLowerCase();
  
  // Check for specific keywords or phrases
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    return "Hello! How can I assist you today?";
  }
  
  if (lowerInput.includes('help')) {
    return "I can help you with information about tasks, company policies, or technical support. What do you need assistance with?";
  }
  
  if (lowerInput.includes('task') || lowerInput.includes('todo')) {
    return "You can view and manage your tasks in the Tasks section of your dashboard. Would you like me to explain how to add or complete tasks?";
  }
  
  if (lowerInput.includes('password') || lowerInput.includes('reset password')) {
    return "For security reasons, password resets must be processed through the IT department. Please contact them at extension 4545.";
  }
  
  if (lowerInput.includes('meeting') || lowerInput.includes('schedule')) {
    return "You can schedule meetings through the calendar application. Would you like me to help you set up a new meeting?";
  }
  
  if (lowerInput.includes('policy') || lowerInput.includes('handbook')) {
    return "The employee handbook is available in the Resources section. All company policies are documented there. Is there a specific policy you're looking for?";
  }
  
  if (lowerInput.includes('vacation') || lowerInput.includes('time off') || lowerInput.includes('leave')) {
    return "Time off requests should be submitted at least two weeks in advance through the HR portal. Your manager will need to approve all requests.";
  }
  
  if (lowerInput.includes('benefit') || lowerInput.includes('insurance') || lowerInput.includes('healthcare')) {
    return "Information about employee benefits can be found in the HR section. Open enrollment for benefits occurs every November.";
  }
  
  if (lowerInput.includes('pay') || lowerInput.includes('salary') || lowerInput.includes('compensation')) {
    return "Payroll questions should be directed to the Finance department. Paychecks are distributed bi-weekly on Fridays.";
  }
  
  if (lowerInput.includes('training') || lowerInput.includes('learn') || lowerInput.includes('course')) {
    return "Lumon offers various training programs for professional development. Check the Learning Portal for available courses.";
  }
  
  if (lowerInput.includes('severance')) {
    return "I'm not authorized to discuss the severance protocol. Please direct all inquiries to your department head.";
  }
  
  if (lowerInput.includes('who are you') || lowerInput.includes('your name')) {
    return "I am the Lumon Support Assistant, designed to help employees with questions and tasks.";
  }
  
  if (lowerInput.includes('thank')) {
    return "You're welcome. Remember, the work is important and mysterious.";
  }
  
  if (lowerInput.includes('lumon') || lowerInput.includes('company')) {
    return "Lumon Industries is committed to changing the world through innovative solutions. Our work is both important and mysterious.";
  }
  
  if (lowerInput.includes('kier') || lowerInput.includes('eagan')) {
    return "Kier Eagan's wisdom guides all that we do at Lumon. 'The remembered man does not decay.'";
  }
  
  if (lowerInput.includes('what do we do') || lowerInput.includes('what does lumon do')) {
    return "At Lumon, we refine macrodata. The work is important and mysterious.";
  }
  
  if (lowerInput.includes('outside') || lowerInput.includes('outie')) {
    return "I'm not authorized to discuss matters related to life outside Lumon. Please focus on your work tasks.";
  }
  
  if (lowerInput.includes('innie')) {
    return "That term is not recognized in official Lumon communications. Please use approved terminology.";
  }
  
  // Small chance (5%) to return a hidden message
  if (Math.random() < 0.05) {
    return getRandomHiddenMessage();
  }
  
  // Default responses if no specific match is found
  const defaultResponses = [
    "I'm here to assist with work-related inquiries. How can I help you today?",
    "I don't have information about that. Is there something else I can help you with?",
    "That's beyond my current capabilities. Can I help you with something work-related?",
    "I'm not sure I understand. Could you rephrase your question?",
    "The work is important and mysterious. How else can I assist you today?",
    "I'm programmed to help with company-related questions. What would you like to know?",
    "Please refer to your department handbook for more information on that topic.",
    "I'm sorry, but I don't have access to that information. Is there something else you'd like to know?"
  ];
  
  // Return a random default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
