
import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LeadList from './components/LeadList';
import LeadDetail from './components/LeadDetail';
import { mockLeads } from './data';
import { Lead } from './types';

type View = 'dashboard' | 'leads';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleNavigate = (newView: View) => {
    setView(newView);
    setSelectedLead(null); // Deselect lead when changing main views
  };

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
  };
  
  const handleBackToList = () => {
      setSelectedLead(null);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(prevLeads => 
      prevLeads.map(l => l.id === updatedLead.id ? updatedLead : l)
    );
    if(selectedLead && selectedLead.id === updatedLead.id) {
        setSelectedLead(updatedLead);
    }
  };
  
  const handleAddLead = () => {
    // In a real app, this would open a form/modal to add a new lead
    alert("Functionality to add a new lead would be here.");
  };

  const renderContent = () => {
    if (selectedLead) {
      return <LeadDetail lead={selectedLead} onUpdateLead={handleUpdateLead} onBack={handleBackToList} />;
    }
    switch (view) {
      case 'dashboard':
        return <Dashboard leads={leads} />;
      case 'leads':
        return <LeadList leads={leads} onSelectLead={handleSelectLead} onAddLead={handleAddLead} />;
      default:
        return <Dashboard leads={leads} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header currentView={view} onNavigate={handleNavigate} />
      <main className="max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
