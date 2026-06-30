import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../api/auth.api';
import { useAuth } from '../hooks/useAuth';

const { Title } = Typography;

// 後端尚未建立時的假資料 mock
const MOCK_USERS = [
  { email: 'admin@taskflow.com', password: 'Admin1234!', role: 'admin', display_name: '系統管理員', id: 1 },
  { email: 'manager@taskflow.com', password: 'Manager1234!', role: 'manager', display_name: '專案主管', id: 2 },
  { email: 'user@taskflow.com', password: 'User1234!', role: 'user', display_name: '一般成員', id: 3 },
];

async function mockLogin({ email, password }) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
  if (!found) {
    const err = new Error('帳號或密碼錯誤');
    err.response = { data: { error: { message: '帳號或密碼錯誤' } } };
    throw err;
  }
  const { password: _, ...user } = found;
  return { token: `mock-jwt-token-${user.role}`, user };
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { loginAction, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // 已登入則直接導向儀表板
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  async function handleSubmit(values) {
    setErrorMsg('');
    setLoading(true);
    try {
      // 後端完成後改為：const { token, user } = await login(values);
      const { token, user } = await mockLogin(values);
      loginAction(token, user);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.error?.message ||
        err.message ||
        '登入失敗，請稍後再試';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <Card style={styles.card} variant='outlined'>
        <div style={styles.header}>
          <Title level={2} style={styles.title}>
            TaskFlow Pro
          </Title>
          <Typography.Text type='secondary'>企業任務管理系統</Typography.Text>
        </div>

        {errorMsg && (
          <Alert
            message={errorMsg}
            type='error'
            showIcon
            closable
            onClose={() => setErrorMsg('')}
            style={{ marginBottom: 24 }}
          />
        )}

        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          autoComplete='off'
          requiredMark={false}
        >
          <Form.Item
            name='email'
            label='電子郵件'
            rules={[
              { required: true, message: '請輸入電子郵件' },
              { type: 'email', message: '請輸入有效的電子郵件格式' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder='請輸入電子郵件'
              size='large'
              autoFocus
            />
          </Form.Item>

          <Form.Item
            name='password'
            label='密碼'
            rules={[{ required: true, message: '請輸入密碼' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='請輸入密碼'
              size='large'
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              loading={loading}
              block
            >
              {loading ? '登入中...' : '登入'}
            </Button>
          </Form.Item>
        </Form>

        <div style={styles.hint}>
          <Typography.Text type='secondary' style={{ fontSize: 12 }}>
            測試帳號：admin@taskflow.com / Admin1234!
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f2f5',
  },
  card: {
    width: 420,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
  },
  title: {
    marginBottom: 4,
    color: '#1677ff',
  },
  hint: {
    textAlign: 'center',
    marginTop: 16,
  },
};
