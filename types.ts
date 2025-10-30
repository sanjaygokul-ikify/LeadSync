
export enum LeadStatus {
  New = 'New',
  Contacted = 'Contacted',
  Qualified = 'Qualified',
  Proposal = 'Proposal Sent',
  Won = 'Won',
  Lost = 'Lost',
}

export enum LeadSource {
  Website = 'Website',
  Facebook = 'Facebook',
  Twitter = 'Twitter',
  Google = 'Google',
  Offline = 'Offline Event',
  Referral = 'Referral',
}

export interface Note {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  assignedTo: string;
  carOfInterest: string;
  createdAt: string;
  notes: Note[];
}
