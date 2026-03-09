import React from 'react';
import { Form, InputNumber, Button, DatePicker } from 'antd';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import type { SearchParams } from '../types';

const { RangePicker } = DatePicker;

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  initialValues: SearchParams;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, initialValues, loading }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const handleSubmit = (values: any) => {
    const { dateRange, ...rest } = values;
    onSearch({
      ...rest,
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
    } as SearchParams);
  };

  const rangePresets: { label: string; value: [dayjs.Dayjs, dayjs.Dayjs] }[] = [
    { label: t('search.recent_7d'), value: [dayjs().subtract(7, 'd'), dayjs()] },
    { label: t('search.recent_14d'), value: [dayjs().subtract(14, 'd'), dayjs()] },
    { label: t('search.recent_30d'), value: [dayjs().subtract(30, 'd'), dayjs()] },
    { label: t('search.recent_90d'), value: [dayjs().subtract(90, 'd'), dayjs()] },
  ];

  return (
    <Form
      form={form}
      initialValues={{
        ...initialValues,
        dateRange: [dayjs(initialValues.startDate), dayjs(initialValues.endDate)],
      }}
      onFinish={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-0 p-0.5 bg-white/[0.01]"
    >
      {/* Time Picker Section */}
      <div className="flex-[2] min-w-[240px] w-full px-3 border-r border-white/5 group transition-colors hover:bg-white/[0.02]">
        <div className="flex flex-col pt-1.5 pb-1">
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-0.5 flex items-center gap-1.5">
            <CalendarOutlined className="text-cyan-500/50" />
            {t('search.period_label')}
          </span>
          <Form.Item
            name="dateRange"
            rules={[{ required: true, message: '' }]}
            className="!mb-0"
          >
            <RangePicker 
              presets={rangePresets}
              variant="borderless"
              className="w-full !p-0 !h-6 text-xs font-medium" 
              suffixIcon={null}
              separator={<span className="text-gray-700 font-light mx-2">→</span>}
              placeholder={[t('search.start'), t('search.end')]}
            />
          </Form.Item>
        </div>
      </div>

      {/* Stars Section */}
      <div className="flex-1 min-w-[100px] w-full px-3 border-r border-white/5 group transition-colors hover:bg-white/[0.02]">
        <div className="flex flex-col pt-1.5 pb-1">
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-0.5">
            {t('search.min_stars')}
          </span>
          <Form.Item
            name="minStars"
            rules={[{ required: true, message: '' }]}
            className="!mb-0"
          >
            <InputNumber 
              min={0} 
              variant="borderless"
              className="w-full !p-0 !h-6 text-xs font-bold font-mono-data" 
              placeholder="100" 
              controls={false}
              prefix={<span className="text-amber-500/50 text-[9px] mt-0.5 mr-1">★</span>}
            />
          </Form.Item>
        </div>
      </div>

      {/* Depth Section */}
      <div className="flex-1 min-w-[80px] w-full px-3 group transition-colors hover:bg-white/[0.02]">
        <div className="flex flex-col pt-1.5 pb-1">
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-0.5">
            {t('search.depth')}
          </span>
          <Form.Item
            name="limit"
            rules={[{ required: true, message: '' }]}
            className="!mb-0"
          >
            <InputNumber 
              min={1} 
              max={100} 
              variant="borderless"
              className="w-full !p-0 !h-6 text-xs font-bold font-mono-data" 
              placeholder="30" 
              controls={false}
              prefix={<span className="text-cyan-500/50 text-[7px] font-black mt-0.5 mr-1 tracking-tighter">TOP</span>}
            />
          </Form.Item>
        </div>
      </div>

      {/* Action Button Section */}
      <div className="p-0.5 w-full md:w-auto">
        <Button
          type="primary"
          icon={<SearchOutlined className="text-xs" />}
          htmlType="submit"
          loading={loading}
          className="h-10 md:h-11 px-6 !rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 border-none transition-all duration-300 hover:scale-[1.01] active:scale-95 group"
        >
          <span className="ml-1">
            {t('search.init_scan')}
          </span>
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
