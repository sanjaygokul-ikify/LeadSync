
import React, { useState } from 'react';
import { Lead, LeadStatus, Note } from '../types';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { generateFollowUpEmail } from '../services/geminiService';

interface LeadDetailProps {
  lead: Lead;
  onUpdateLead: (updatedLead: Lead) => void;
  onBack: () => void;
}

const LeadDetail: React.FC<LeadDetailProps> = ({ lead, onUpdateLead, onBack }) => {
  const [newNote, setNewNote] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedLead = { ...lead, status: e.target.value as LeadStatus };
    onUpdateLead(updatedLead);
  };

  const handleAddNote = () => {
    if (newNote.trim() === '') return;
    const note: Note = {
      id: Date.now(),
      author: 'Current User', // In a real app, this would be the logged-in user
      content: newNote,
      timestamp: new Date().toISOString(),
    };
    const updatedLead = { ...lead, notes: [...lead.notes, note] };
    onUpdateLead(updatedLead);
    setNewNote('');
  };

  const handleGenerateEmail = async () => {
    setIsGenerating(true);
    setGeneratedEmail('');
    const email = await generateFollowUpEmail(lead);
    setGeneratedEmail(email);
    setIsGenerating(false);
  };
  
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <button onClick={onBack} className="mb-6 text-primary font-semibold hover:underline flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        <span>Back to Leads</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Lead Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl font-bold mb-4">
                {lead.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold">{lead.name}</h2>
              <p className="text-gray-500">{lead.email}</p>
              <p className="text-gray-500">{lead.phone}</p>
              <div className="mt-4"><Badge status={lead.status} /></div>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-4">Lead Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="font-medium text-gray-500">Source:</span> <span>{lead.source}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-500">Assigned To:</span> <span>{lead.assignedTo}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-500">Car of Interest:</span> <span>{lead.carOfInterest}</span></div>
              <div className="flex justify-between"><span className="font-medium text-gray-500">Created:</span> <span>{new Date(lead.createdAt).toLocaleString()}</span></div>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Update Status</h3>
             <select
                value={lead.status}
                onChange={handleStatusChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            >
                {Object.values(LeadStatus).map(status => (
                <option key={status} value={status}>{status}</option>
                ))}
            </select>
          </Card>
        </div>

        {/* Right Column: Notes & AI */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Activity & Notes</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {lead.notes.slice().reverse().map(note => (
                <div key={note.id} className="p-3 bg-light dark:bg-dark rounded-lg">
                  <p className="text-sm">{note.content}</p>
                  <p className="text-xs text-gray-500 mt-1 text-right">{note.author} - {new Date(note.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
              <button onClick={handleAddNote} className="mt-2 w-full bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">Add Note</button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">AI Assistant</h3>
            <button onClick={handleGenerateEmail} disabled={isGenerating} className="w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isGenerating ? 'Generating...' : 'Generate Follow-up Email'}
            </button>
            {generatedEmail && (
              <div className="mt-4 p-3 bg-light dark:bg-dark rounded-lg">
                <h4 className="font-semibold mb-2">Suggested Email:</h4>
                <textarea
                  readOnly
                  value={generatedEmail}
                  rows={8}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary text-sm"
                ></textarea>
                 <button 
                  onClick={() => navigator.clipboard.writeText(generatedEmail)}
                  className="mt-2 text-sm text-primary hover:underline"
                >
                  Copy to clipboard
                </button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
