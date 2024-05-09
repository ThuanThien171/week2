import axios from "@/plugins/axios";
export default {
    namespaced : true,
    state() {
        return{
            token: null,
            userId: null,
        }
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getUserId(state) {
            return state.userId;
        },
        isAuthenticated(state) {
            return !!state.token;
        },
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
        }
    },
    actions: {
        async login(context, payload) {
            const res = await axios({
                baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8NnBm3AzBCDYwNE60faxNQewix0ZGzqc',
                method: 'POST',
                data: {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                }
            });
            if(res.status === 200) {
                const loginTime = new Date().getTime();
                context.commit('setUser', {
                    token: res.data.idToken,
                    userId: res.data.localId,
                });
                if(payload.keepLogin) {
                    localStorage.setItem('token', res.data.idToken);
                    localStorage.setItem('userId', res.data.localId);
                    localStorage.setItem('tokenExpiration', +res.data.expiresIn*1000+loginTime);
                }
            }else{
                const error = new Error(res.message || "Error");
                throw error;
            }
        },
        tryLogin(context) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const tokenExpiration = localStorage.getItem('tokenExpiration');
        
            const expiresIn = +tokenExpiration - new Date().getTime();
        
            if (expiresIn < 0) {
              return;
            }
        
            if (token && userId) {
                context.commit('setUser', {
                    token: token,
                    userId: userId
                });
            }
        },

        async signup (context, payload) {
            const res = await axios({
                baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8NnBm3AzBCDYwNE60faxNQewix0ZGzqc',
                method: 'POST',
                data: {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                }
            });
            if (res.status !== 200){
                const error = new Error(res.data.message || "Đăng ký thất bại");
                throw error;
            }else{
                const loginTime = new Date().getTime();
                context.commit('setUser', {
                    token: res.data.idToken,
                    userId: res.data.localId,
                });
                if(payload.keepLogin) {
                    localStorage.setItem('token', res.data.idToken);
                    localStorage.setItem('userId', res.data.localId);
                    localStorage.setItem('tokenExpiration', +res.data.expiresIn*1000+loginTime);
                }
            }
            return context.dispatch('users/addUserToDB', {
                ...payload,
                id: res.data.localId,
            },{root: true,});
        },

        logout(context) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('tokenExpiration');
        
            context.commit('setUser', {
              token: null,
              userId: null
            });
        },
    },
    
}
