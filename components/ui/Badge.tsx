
import React from 'react';
import { LeadStatus } from '../../types';

interface BadgeProps {
  status: LeadStatus;
}

const statusColors: Record<LeadStatus, string> = {
  [LeadStatus.New]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [LeadStatus.Contacted]: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  [LeadStatus.Qualified]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  [LeadStatus.Proposal]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  [LeadStatus.Won]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [LeadStatus.Lost]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const Badge: React.FC<BadgeProps> = ({ status }) => {
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusColors[status]}`}>
      {status}
    </span>
  );
};

export default Badge;
