
import React, { useState, useMemo } from 'react';
import { Lead, LeadStatus } from '../types';
import Card from './ui/Card';
import Badge from './ui/Badge';

interface LeadListProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onAddLead: () => void;
}

const LeadList: React.FC<LeadListProps> = ({ leads, onSelectLead, onAddLead }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');

  const filteredLeads = useMemo(() => {
    return leads
      .filter(lead => 
        statusFilter === 'all' || lead.status === statusFilter
      )
      .filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [leads, searchTerm, statusFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
        <button onClick={onAddLead} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            <span>Add Lead</span>
        </button>
      </div>
      
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as LeadStatus | 'all')}
            className="w-full md:w-1/4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Statuses</option>
            {Object.values(LeadStatus).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-secondary divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLeads.map(lead => (
                <tr key={lead.id} onClick={() => onSelectLead(lead)} className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                    <div className="text-sm text-gray-500">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><Badge status={lead.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default LeadList;
