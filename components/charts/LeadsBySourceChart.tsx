
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Lead, LeadSource } from '../../types';

interface LeadsBySourceChartProps {
  leads: Lead[];
}

const LeadsBySourceChart: React.FC<LeadsBySourceChartProps> = ({ leads }) => {
  const data = useMemo(() => {
    const sourceCounts = leads.reduce((acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {} as Record<LeadSource, number>);

    return Object.entries(sourceCounts).map(([name, value]) => ({
      name,
      leads: value,
    }));
  }, [leads]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="leads" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LeadsBySourceChart;
