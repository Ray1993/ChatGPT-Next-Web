import styles from './login.module.scss';
import { IconButton } from './button';

import { useNavigate } from 'react-router-dom';
import { Path } from '../constant';
import { useLoginStore } from '../store';
import { Checkbox, message } from 'antd';

import BotIcon from '../icons/bot.svg';
import { useEffect, useState } from 'react';
import { getClientConfig } from '../config/client';

export function LoginPage() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [checkRule, setCheckRule] = useState(true);
    const loginStore = useLoginStore();

    const goChat = async () => {
        if (checkRule) {
            if (password && phone) {
                const loginState = await loginStore.login(phone, password);
                if (loginState) {
                    navigate(Path.Chat);
                } else {
                    message.warning('登陆失败');
                }
            } else {
                message.info('请填写账号密码');
            }
        } else {
            message.info('请勾选协议');
        }
    };

    useEffect(() => {
        if (getClientConfig()?.isApp) {
            navigate(Path.Settings);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles['auth-page']}>
            <div className={`no-dark ${styles['auth-logo']}`}>
                <BotIcon />
            </div>
            <div className={styles['auth-tips']}>请输入手机号码</div>

            <input
                className={styles['auth-input']}
                type="text"
                placeholder="请输入内容"
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
            />

            <div className={styles['auth-tips']}>请输入密码</div>
            <input
                className={styles['auth-input']}
                type="password"
                placeholder="请输入内容"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <div className={styles['auth-actions']}>
                <IconButton text="登陆" type="primary" onClick={goChat} />
                <div className={styles['auth-rule']}>
                    <Checkbox
                        onChange={(e) => {
                            setCheckRule(e.target.checked);
                        }}
                        checked={checkRule}
                    >
                        我已阅读并同意 《用户协议》 、 《隐私政策》、《服务协议》
                    </Checkbox>
                </div>
            </div>
        </div>
    );
}
