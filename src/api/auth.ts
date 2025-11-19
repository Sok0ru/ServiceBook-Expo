    import { api } from './client';

    export type JwtPair = { accessToken: string; refreshToken: string };

    export const authAPI = {
    requestCode: (email: string) =>
        api.post('/email/request', { email }).then(() => null),

    signUp: (email: string, password: string, code: number) => 
        api.post<{ id: string; jwt: JwtPair }>('/user/sign-up', { email, password, code })
        .then(r => r.data),

    logIn: (email: string, password: string) =>
        api.post<{ id: string; jwt: JwtPair }>('/user/log-in', { email, password }).then((r) => r.data),

    resetPassword: (email: string, newPassword: string, code: string) =>
        api.post<{ id: string; jwt: JwtPair }>('/user/reset-password', { email, newPassword, code }).then((r) => r.data),

    refresh: () =>
        api.get<{ jwt: JwtPair }>('/user/refresh').then((r) => r.data),
    };