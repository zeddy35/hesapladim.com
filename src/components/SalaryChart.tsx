'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MaasHesapSonucu } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

interface Props {
  sonuc: MaasHesapSonucu;
}

const RENKLER = ['#1e40af', '#ef4444', '#f59e0b', '#6366f1'];

export default function SalaryChart({ sonuc }: Props) {
  const vergiVeDiger = sonuc.gelirVergisi + sonuc.damgaVergisi - sonuc.agiTutari;
  const data = [
    { name: 'Net Maaş', value: Math.round(sonuc.netMaas) },
    { name: 'SGK İşçi', value: Math.round(sonuc.sgkIsciBrut + sonuc.issizlikIsciBrut) },
    { name: 'Gelir Vergisi', value: Math.round(Math.max(0, vergiVeDiger)) },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={RENKLER[index % RENKLER.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => formatCurrency(value)}
          contentStyle={{ fontSize: '13px', borderRadius: '8px' }}
        />
        <Legend
          iconType="circle"
          formatter={(value) => (
            <span className="text-sm text-gray-700">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
