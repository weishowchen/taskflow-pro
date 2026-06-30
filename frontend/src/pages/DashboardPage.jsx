import { Button, Typography, Space, Tag } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ROLE_LABEL = { admin: '管理員', manager: '主管', user: '一般成員' };
const ROLE_COLOR = { admin: 'red', manager: 'blue', user: 'green' };

export default function DashboardPage() {
  const { user, logoutAction } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logoutAction();
    navigate('/login', { replace: true });
  }

  return (
    <div style={{ padding: 40 }}>
      <Space direction='vertical' size='large'>
        <Typography.Title level={3}>
          歡迎回來，{user?.display_name} 👋
        </Typography.Title>
        <Space>
          <Typography.Text>角色：</Typography.Text>
          <Tag color={ROLE_COLOR[user?.role]}>{ROLE_LABEL[user?.role]}</Tag>
        </Space>
        <Typography.Text type='secondary'>
          儀表板功能開發中...
        </Typography.Text>
        <Button onClick={handleLogout}>登出</Button>
      </Space>
    </div>
  );
}
