import styles from './register.module.scss';
import { IconButton } from './button';

import { useNavigate } from 'react-router-dom';
import { Path } from '../constant';
import { useAccessStore } from '../store';
import Locale from '../locales';

import BotIcon from '../icons/bot.svg';
import { useEffect, useState } from 'react';
import { getClientConfig } from '../config/client';

export function RegisterPage() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const goChat = () => {
        if (phone === 'admin' && password === 'admin') {
            localStorage.setItem('loaginState', 'admin');
            navigate(Path.Chat);
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

            <div className={styles['auth-tips']}>请确认密码</div>
            <input
                className={styles['auth-input']}
                type="password"
                placeholder="请输入内容"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <div className={styles['auth-actions']}>
                <IconButton text="注册" type="primary" onClick={goChat} />
                <div className={styles['auth-rule']}>
                    <input type="checkbox" id="rule" value="rule" />
                    {/* <label for="rule">我已阅读并同意 《用户协议》 、 《隐私政策》、《服务协议》</label> */}
                </div>
            </div>
        </div>
    );
}
