import React from 'react';
import { Table, Avatar, Typography, Space, Tooltip } from 'antd';
import { StarFilled, RiseOutlined, CalendarOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { GrowthRepo } from '../types';
import dayjs from 'dayjs';

const { Text, Link } = Typography;

interface RepoTableProps {
  data: GrowthRepo[];
  loading: boolean;
}

const RepoTable: React.FC<RepoTableProps> = ({ data, loading }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('table.rank'),
      key: 'rank',
      width: 90,
      align: 'center' as const,
      render: (_: any, __: any, index: number) => (
        <div className="flex flex-col items-center justify-center">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center font-mono-data text-sm font-black transition-all duration-300
            ${index === 0 ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 
              index === 1 ? 'bg-white/10 text-cyan-400 border border-cyan-500/20' :
              index === 2 ? 'bg-white/5 text-cyan-500/70 border border-white/5' : 
              'text-gray-600'}
          `}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      ),
    },
    {
      title: t('table.repository'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: GrowthRepo) => (
        <div className="flex items-center gap-4 py-2 group/repo">
          <div className="relative">
            <Avatar 
              src={record.owner.avatar_url} 
              size={48} 
              className="rounded-xl border border-white/10 shadow-xl bg-slate-800 transition-transform group-hover/repo:scale-110 duration-300"
            />
            {record.stargazers_count > 10000 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-[#0f172a] flex items-center justify-center">
                <StarFilled className="text-white text-[8px]" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Link 
              href={record.html_url} 
              target="_blank" 
              className="!text-white !font-bold text-[15px] hover:!text-cyan-400 transition-all flex items-center gap-2 group/link"
            >
              <span className="group-hover/link:underline decoration-cyan-500/30 underline-offset-4">{record.full_name}</span>
              <RiseOutlined className="text-[10px] text-cyan-500 opacity-0 group-hover/link:opacity-100 -translate-y-1 group-hover/link:translate-y-0 transition-all" />
            </Link>
            <Text className="text-gray-500 text-xs max-w-xl line-clamp-1 font-medium leading-relaxed">
              {record.description || t('table.no_description')}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: t('table.stars'),
      dataIndex: 'stargazers_count',
      key: 'stars',
      width: 140,
      sorter: (a: GrowthRepo, b: GrowthRepo) => a.stargazers_count - b.stargazers_count,
      render: (stars: number) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-300">
            <StarFilled className="text-amber-500 text-xs" />
            <span className="font-mono-data font-bold text-[14px] tracking-tight">{stars.toLocaleString()}</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">{t('table.total_stars')}</span>
        </div>
      ),
    },
    {
      title: t('table.momentum'),
      dataIndex: 'growthRate',
      key: 'growthRate',
      width: 200,
      sorter: (a: GrowthRepo, b: GrowthRepo) => a.growthRate - b.growthRate,
      render: (rate: number) => (
        <div className="flex flex-col gap-2.5 pr-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <span className="text-cyan-400 font-mono-data font-black text-sm">+{rate.toFixed(1)}</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">{t('table.per_day')}</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 p-[1px]">
            <div 
              className="bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(6,182,212,0.3)]" 
              style={{ width: `${Math.min(100, (rate / 40) * 100)}%` }}
            ></div>
          </div>
        </div>
      ),
    },
    {
      title: t('table.launched'),
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (date: string) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-400 font-mono-data text-xs font-bold">
            <CalendarOutlined className="text-[10px] text-gray-600" />
            {dayjs(date).format('DD MMM YYYY')}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
            {t('table.days_ago', { count: dayjs().diff(dayjs(date), 'day') })}
          </span>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{ 
        pageSize: 10, 
        showSizeChanger: true,
        className: "!mt-8 !mb-4",
      }}
      scroll={{ x: 800 }}
      size="middle"
      className="repo-table-custom"
    />
  );
};

export default RepoTable;
