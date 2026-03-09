import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, message, ConfigProvider, theme, FloatButton, Modal, Input, Button, Dropdown } from 'antd';
import { GithubOutlined, SettingOutlined, CalendarOutlined, GlobalOutlined } from '@ant-design/icons';
import { Rocket } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { useTranslation, Trans } from 'react-i18next';
import SearchForm from './components/SearchForm';
import RepoTable from './components/RepoTable';
import { fetchFastGrowingRepos } from './services/github';
import type { GrowthRepo, SearchParams } from './types';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [repos, setRepos] = useState<GrowthRepo[]>([]);
  const [token, setToken] = useState<string>(localStorage.getItem('github_token') || '');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    minStars: 100,
    limit: 30,
  });

  const currentLocale = i18n.language.startsWith('zh') ? zhCN : enUS;

  useEffect(() => {
    dayjs.locale(i18n.language.startsWith('zh') ? 'zh-cn' : 'en');
  }, [i18n.language]);

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setSearchParams(params);
    try {
      const data = await fetchFastGrowingRepos(params, token);
      setRepos(data);
      if (data.length === 0) {
        message.info(t('app.no_repos_found'));
      }
    } catch (error: any) {
      message.error(error.message || t('app.search_failed'));
    } finally {
      setLoading(false);
    }
  };

  const saveToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('github_token', newToken);
    message.success(t('app.token_saved'));
    setIsTokenModalOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    handleSearch(searchParams);
  }, []);

  const langMenuItems = [
    { key: 'zh', label: '简体中文', onClick: () => changeLanguage('zh') },
    { key: 'en', label: 'English', onClick: () => changeLanguage('en') },
  ];

  return (
    <ConfigProvider
      locale={currentLocale}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#06b6d4',
          colorInfo: '#06b6d4',
          colorSuccess: '#10b981',
          colorWarning: '#f59e0b',
          colorError: '#ef4444',
          borderRadius: 12,
          colorBgBase: '#020617',
          colorBgContainer: '#0f172a',
          colorBgElevated: '#1e293b',
          colorBorder: 'rgba(255, 255, 255, 0.08)',
          colorBorderSecondary: 'rgba(255, 255, 255, 0.04)',
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
        },
        components: {
          Button: {
            borderRadius: 10,
            controlHeight: 40,
            fontWeight: 600,
          },
          Input: {
            borderRadius: 10,
            controlHeight: 40,
            colorBorder: 'transparent',
            activeBorderColor: 'transparent',
            hoverBorderColor: 'transparent',
          },
          InputNumber: {
            borderRadius: 10,
            controlHeight: 40,
            colorBorder: 'transparent',
            activeBorderColor: 'transparent',
            hoverBorderColor: 'transparent',
          },
          Select: {
            borderRadius: 10,
            controlHeight: 40,
            colorBorder: 'transparent',
          },
          DatePicker: {
            borderRadius: 10,
            controlHeight: 40,
            colorBorder: 'transparent',
            activeBorderColor: 'transparent',
            hoverBorderColor: 'transparent',
          },
          Card: {
            borderRadiusLG: 16,
            colorBgContainer: 'rgba(15, 23, 42, 0.6)',
          },
          Table: {
            colorBgContainer: 'transparent',
            headerBg: 'rgba(15, 23, 42, 0.4)',
            headerColor: '#94a3b8',
            fontSize: 14,
          }
        }
      }}
    >
      <Layout className="min-h-screen bg-[#020617] selection:bg-cyan-500/30 font-sans">
        <div className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
          <Header className="max-w-7xl mx-auto glass-panel border border-white/10 px-6 flex items-center justify-between h-16 rounded-2xl shadow-2xl backdrop-blur-2xl pointer-events-auto transition-all duration-300">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-gradient-to-br from-cyan-500 to-emerald-500 p-2 rounded-xl shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="text-white" size={20} />
              </div>
              <div className="flex flex-col">
                <Title level={4} className="!m-0 tracking-tight font-black flex items-center gap-1.5 leading-none">
                  <span className="text-white">Star</span>
                  <span className="text-gradient-cyan">Sprint</span>
                </Title>
                <Text className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">
                  {t('app.subtitle')}
                </Text>
              </div>
            </div>
            <Space size="middle">
              <Dropdown menu={{ items: langMenuItems }} placement="bottomRight" trigger={['click']}>
                <Button 
                  type="text" 
                  icon={<GlobalOutlined />} 
                  className="text-gray-400 hover:text-white transition-all flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/5"
                />
              </Dropdown>
              <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
              <Button 
                type="text" 
                icon={<SettingOutlined />} 
                onClick={() => setIsTokenModalOpen(true)}
                className="text-gray-400 hover:text-white transition-all flex items-center gap-2 px-3 h-9 rounded-lg hover:bg-white/5 font-semibold text-xs"
              >
                {t('app.api_config')}
              </Button>
              <a 
                href="https://github.com/trending" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all text-gray-400 hover:text-cyan-400"
                title="GitHub Trending"
              >
                <GithubOutlined style={{ fontSize: '18px' }} />
              </a>
            </Space>
          </Header>
        </div>

        <Content className="pt-24 pb-10 px-6 md:px-10 max-w-7xl mx-auto w-full relative">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up">
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 w-fit">
                  <div className="w-1 h-1 rounded-full bg-cyan-500 pulse-subtle"></div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{t('app.radar_title')}</span>
                </div>
                <Title level={1} className="!text-white !m-0 font-black tracking-tight text-3xl md:text-4xl">
                  {t('app.hero_title')} <span className="text-gradient-cyan italic">{t('app.hero_breakthrough')}</span>
                </Title>
              </div>
              <Text className="text-gray-500 text-sm max-w-md leading-relaxed md:mb-1">
                {t('app.hero_desc')}
              </Text>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden p-1 animate-fade-in-up delay-100">
              <SearchForm onSearch={handleSearch} initialValues={searchParams} loading={loading} />
            </div>

            <div className="flex flex-col gap-4 animate-fade-in-up delay-200">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                  <Title level={5} className="!m-0 !text-white font-bold">
                    {t('app.growth_leaders')}
                  </Title>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">
                  <CalendarOutlined className="text-cyan-500 text-xs" />
                  <Text className="text-[11px] text-gray-400 font-mono-data">
                    {searchParams.startDate} → {searchParams.endDate}
                  </Text>
                </div>
              </div>
              
              <div className="glass-panel rounded-xl overflow-hidden shadow-2xl">
                <RepoTable data={repos} loading={loading} />
              </div>
            </div>
          </div>
        </Content>

        <Footer className="text-center text-gray-600 py-10 bg-transparent">
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-6 text-[10px] font-medium uppercase tracking-widest opacity-40">
              <span className="hover:text-cyan-500 cursor-pointer transition-colors">Documentation</span>
              <span className="hover:text-cyan-500 cursor-pointer transition-colors">API Status</span>
              <span className="hover:text-cyan-500 cursor-pointer transition-colors">Privacy</span>
            </div>
            <div className="w-10 h-[1px] bg-white/5"></div>
            <Text className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-20">
              {t('app.engine_copyright')}
            </Text>
          </div>
        </Footer>

        <Modal
          title={t('app.set_token_title')}
          open={isTokenModalOpen}
          onCancel={() => setIsTokenModalOpen(false)}
          footer={null}
          width={400}
        >
          <div className="py-4">
            <p className="mb-6 text-gray-400 text-xs leading-relaxed">
              <Trans i18nKey="app.set_token_desc">
                为了避免 GitHub API 的频率限制 (Rate Limit)，建议提供一个 <Text className="text-cyan-400">Personal Access Token</Text>。
                Token 仅保存在您的浏览器本地存储中，不会上传。
              </Trans>
            </p>
            <div className="flex flex-col gap-6">
              <Input.Password
                placeholder={t('app.token_placeholder')}
                defaultValue={token}
                onPressEnter={(e) => saveToken(e.currentTarget.value)}
                id="token-input"
                className="h-10"
              />
              <div className="flex justify-end gap-3">
                <Button 
                  onClick={() => setIsTokenModalOpen(false)}
                  className="bg-white/5 border-white/10 text-gray-400 hover:!text-white hover:!border-white/30"
                >
                  {t('app.cancel')}
                </Button>
                <Button 
                  type="primary" 
                  className="bg-cyan-500 hover:bg-cyan-400 border-none px-8 font-bold"
                  onClick={() => {
                    const val = (document.getElementById('token-input') as HTMLInputElement).value;
                    saveToken(val);
                  }}
                >
                  {t('app.save')}
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        <FloatButton.BackTop />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
