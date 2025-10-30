
import React, { useMemo } from 'react';
import { Lead, LeadStatus } from '../types';
import Card from './ui/Card';
import LeadsByStatusChart from './charts/LeadsByStatusChart';
import LeadsBySourceChart from './charts/LeadsBySourceChart';

interface DashboardProps {
  leads: Lead[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Card className="flex items-center p-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
    </Card>
);

const Dashboard: React.FC<DashboardProps> = ({ leads }) => {
  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === LeadStatus.New).length;
    const wonLeads = leads.filter(l => l.status === LeadStatus.Won).length;
    const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) + '%' : '0%';
    return { totalLeads, newLeads, wonLeads, conversionRate };
  }, [leads]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value={stats.totalLeads} icon={<UsersIcon />} />
        <StatCard title="New Leads" value={stats.newLeads} icon={<PlusIcon />} />
        <StatCard title="Deals Won" value={stats.wonLeads} icon={<TrophyIcon />} />
        <StatCard title="Conversion Rate" value={stats.conversionRate} icon={<ChartBarIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-medium mb-4">Leads by Status</h3>
          <LeadsByStatusChart leads={leads} />
        </Card>
        <Card>
          <h3 className="text-lg font-medium mb-4">Leads by Source</h3>
          <LeadsBySourceChart leads={leads} />
        </Card>
      </div>
    </div>
  );
};

// Icons
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m9-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;


export default Dashboard;
