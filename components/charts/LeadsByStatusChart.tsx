
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Lead, LeadStatus } from '../../types';

interface LeadsByStatusChartProps {
  leads: Lead[];
}

const COLORS: Record<LeadStatus, string> = {
    [LeadStatus.New]: '#3b82f6',
    [LeadStatus.Contacted]: '#06b6d4',
    [LeadStatus.Qualified]: '#8b5cf6',
    [LeadStatus.Proposal]: '#a855f7',
    [LeadStatus.Won]: '#22c55e',
    [LeadStatus.Lost]: '#ef4444',
};

const LeadsByStatusChart: React.FC<LeadsByStatusChartProps> = ({ leads }) => {
  const data = useMemo(() => {
    const statusCounts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<LeadStatus, number>);

    return Object.entries(statusCounts).map(([name, value]) => ({
      name: name as LeadStatus,
      value,
    }));
  }, [leads]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default LeadsByStatusChart;
