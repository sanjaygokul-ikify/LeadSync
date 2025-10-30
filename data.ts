
import { Lead, LeadStatus, LeadSource } from './types';

export const mockLeads: Lead[] = [
  {
    id: 'lead-001',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '555-0101',
    source: LeadSource.Facebook,
    status: LeadStatus.New,
    assignedTo: 'Sales Team A',
    carOfInterest: 'SUV Model X',
    createdAt: '2023-10-26T10:00:00Z',
    notes: [
      { id: 1, author: 'System', content: 'Lead created from Facebook campaign.', timestamp: '2023-10-26T10:00:00Z' }
    ],
  },
  {
    id: 'lead-002',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    phone: '555-0102',
    source: LeadSource.Website,
    status: LeadStatus.Contacted,
    assignedTo: 'Sales Team B',
    carOfInterest: 'Sedan Model S',
    createdAt: '2023-10-25T14:30:00Z',
    notes: [
      { id: 1, author: 'System', content: 'Lead from website "Contact Us" form.', timestamp: '2023-10-25T14:30:00Z' },
      { id: 2, author: 'John Doe', content: 'Called Bob, he is interested in a test drive next week.', timestamp: '2023-10-26T11:00:00Z' }
    ],
  },
  {
    id: 'lead-003',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    phone: '555-0103',
    source: LeadSource.Google,
    status: LeadStatus.Qualified,
    assignedTo: 'Sales Team A',
    carOfInterest: 'Hatchback Model H',
    createdAt: '2023-10-24T09:00:00Z',
    notes: [
      { id: 1, author: 'Jane Smith', content: 'Met with Charlie, he has a budget of $25,000 and is looking for a reliable city car.', timestamp: '2023-10-25T16:00:00Z' }
    ],
  },
  {
    id: 'lead-004',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    phone: '555-0104',
    source: LeadSource.Offline,
    status: LeadStatus.Proposal,
    assignedTo: 'Sales Team C',
    carOfInterest: 'Luxury Sedan L',
    createdAt: '2023-10-23T11:00:00Z',
    notes: [
      { id: 1, author: 'John Doe', content: 'Sent proposal with financing options.', timestamp: '2023-10-26T15:00:00Z' }
    ],
  },
  {
    id: 'lead-005',
    name: 'Ethan Hunt',
    email: 'ethan.h@example.com',
    phone: '555-0105',
    source: LeadSource.Referral,
    status: LeadStatus.Won,
    assignedTo: 'Sales Team B',
    carOfInterest: 'Sports Car Z',
    createdAt: '2023-10-20T17:00:00Z',
    notes: [
      { id: 1, author: 'Jane Smith', content: 'Deal closed. Customer is very happy with the purchase.', timestamp: '2023-10-25T12:00:00Z' }
    ],
  },
  {
    id: 'lead-006',
    name: 'Fiona Glenanne',
    email: 'fiona.g@example.com',
    phone: '555-0106',
    source: LeadSource.Twitter,
    status: LeadStatus.Lost,
    assignedTo: 'Sales Team A',
    carOfInterest: 'SUV Model X',
    createdAt: '2023-10-22T13:00:00Z',
    notes: [
      { id: 1, author: 'John Doe', content: 'Customer decided to go with a competitor.', timestamp: '2023-10-24T18:00:00Z' }
    ],
  },
  {
    id: 'lead-007',
    name: 'George Costanza',
    email: 'george.c@example.com',
    phone: '555-0107',
    source: LeadSource.Website,
    status: LeadStatus.New,
    assignedTo: 'Sales Team C',
    carOfInterest: 'Minivan Model M',
    createdAt: '2023-10-26T18:00:00Z',
    notes: [
       { id: 1, author: 'System', content: 'New lead from website.', timestamp: '2023-10-26T18:00:00Z' }
    ],
  },
];
