import { StoreKey } from '../constant';
import { createPersistStore } from '../utils/store';
import { GetStoreState } from '../utils/sync';

export type LoginStore = GetStoreState<typeof useLoginStore>;

const DEFAULT_LOGIN_STATE = {
    permission: '0', //用户权限
    loginState: false, //用户登录状态
};

export const useLoginStore = createPersistStore(
    DEFAULT_LOGIN_STATE,
    (set, get) => ({
        getPermission() {
            return get().permission;
        },
        getLoginState() {
            return get().loginState;
        },
        async login(loginName: String, loginPwd: any) {
            const res = await fetch(
                `http://127.0.0.1:8080/console/admin/login?loginName=${loginName}&loginPwd=${loginPwd}`,
                {
                    method: 'GET',
                    mode: 'cors',
                },
            );
            const resJson = await res.json();
            if (resJson.code === 200) {
                set(() => ({
                    permission: resJson.data.roleCode,
                    loginState: true,
                }));
                sessionStorage.setItem(
                    'loginState',
                    JSON.stringify({
                        permission: resJson.data.roleCode,
                    }),
                );
                return true;
            } else {
                return false;
            }
        },
        async logout() {
            sessionStorage.removeItem('loginState');
            return true;
            // const res = await fetch('http://127.0.0.1:8080/console/admin/logout', {
            //     method: 'GET',
            //     mode: 'cors',
            //     body: null,
            // });
            // const resJson = await res.json();
            // if (resJson.code === 200) {
            //     set(() => ({
            //         loginState: false,
            //     }));
            // }
            // return resJson.code === 200;
        },
        async checkLogin() {
            const loginState = sessionStorage.getItem('loginState')
                ? JSON.parse(sessionStorage.getItem('loginState') as string)
                : null;
            // todo: 暂时通过sessionStorage记录
            if (loginState) {
                set(() => ({
                    loginState: true,
                    permission: loginState.permission,
                }));
            } else {
                const res = await fetch('http://127.0.0.1:8080/console/admin/check', {
                    method: 'GET',
                    mode: 'cors',
                });
                const resJson = await res.json();
                const loginState = resJson.data === 'OK';
                set(() => ({
                    loginState: loginState,
                }));
            }
        },
    }),
    {
        name: StoreKey.Login,
        version: 1,
    },
);
