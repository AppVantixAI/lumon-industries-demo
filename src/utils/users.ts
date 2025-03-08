import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Mark Scout',
    email: 'mark.scout@lumon.com',
    role: 'Employee',
    department: 'Macrodata Refinement',
    accessLevel: 3,  // Mid-level access reflecting his central role and balanced authority.
    profileImage: 'https://i.pravatar.cc/150?u=mark',
    bio: 'The everyman protagonist navigating the split between work and personal life.'
  },
  {
    id: '2',
    name: 'Helly Riggs',
    email: 'helly.riggs@lumon.com',
    role: 'Employee',
    department: 'Macrodata Refinement',
    accessLevel: 2,  // Slightly lower access, hinting at her rebellious, questioning nature.
    profileImage: 'https://i.pravatar.cc/150?u=helly',
    bio: 'A spirited, rebellious employee whose curiosity challenges the status quo.'
  },
  {
    id: '3',
    name: 'Irving',
    email: 'irving@lumon.com',
    role: 'Employee',
    department: 'Macrodata Refinement',
    accessLevel: 4,  // Higher access, mirroring his precise, diligent handling of corporate tasks.
    profileImage: 'https://i.pravatar.cc/150?u=irving',
    bio: 'A meticulous, almost stoic figure, representing the corporate rigor that underpins the system.'
  },
  {
    id: '4',
    name: 'Dylan George',
    email: 'dylan.george@lumon.com',
    role: 'Employee',
    department: 'Macrodata Refinement',
    accessLevel: 3,  // A balanced level, indicating his creative yet integrated position.
    profileImage: 'https://i.pravatar.cc/150?u=dylan',
    bio: 'A creative, enigmatic presence whose subtle humor hints at deeper layers of the workplace mystery.'
  },
  {
    id: '5',
    name: 'Harmony Cobel',
    email: 'cobel.admin@lumon.com',
    role: 'Administrator',
    department: 'Management',
    accessLevel: 5,  // Top-tier access for the authoritative figure overseeing operations.
    profileImage: 'https://i.pravatar.cc/150?u=cobel',
    bio: 'An authoritative figure, echoing the pervasive influence of management and the unseen hand guiding operations.'
  }
];

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};
