import axios from "@/plugins/axios";
export default {
    namespaced: true,
    state() {
        return{
            users: [], //array
        }
    },
    getters: {
        getUserList(state) {
            return state.users;
        },
        getUserInfo(state){
            return (payload) =>{
                const userInfo = state.users.filter((data)=>{
                    if(data.id === payload) return data;
                });
                return userInfo[0];
            }
        }
    },
    mutations: {
        setUserList(state, payload) {
            state.users = payload;
        },
        addNewUser(state, payload) {
            state.users.push(payload);
        },
        updateUserState(state, payload) {
            state.users.filter((data) => {
                if(data.id === payload.id) {
                    data.name = payload.name;
                    data.email = payload.email;
                    data.birthday = payload.birthday;
                    data.phone = payload.phone;
                    data.avatar = payload.avatar;
                }
            })
        },
        deleteUserState(state,payload) {
            let newState = state.users.filter((data)=>{
                if(data.id !== payload) return data;
            })
            state.users= newState
        }

    },
    actions: {
        async getUserApi(context,_) {
            const res = await axios.get('users.json')
            if (res.status !== 200){
                const error = new Error(res.data.message || "Error");
                throw error;
            }
            const userList = [];

            for (const key in res.data) {
                const user = {
                    id: key,
                    avatar: res.data[key].avatar,
                    name: res.data[key].name,
                    phone: res.data[key].phone,
                    birthday: res.data[key].birthday,
                    email: res.data[key].email,
                };
                userList.push(user);
            }
            context.commit('setUserList',userList);
        },
        
        async signupNewUser (context, payload) {
            // const res = await axios({
            //     baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8NnBm3AzBCDYwNE60faxNQewix0ZGzqc',
            //     method: 'POST',
            //     data: {
            //         email: payload.email,
            //         password: '123456',
            //         returnSecureToken: true,
            //     }
            // });
            // if (res.status !== 200){
            //     const error = new Error(res.data.message || "Đăng ký thất bại");
            //     throw error;
            // }
            // return context.dispatch('addUserToDB', {
            //     ...payload,
            //     id: res.data.localId,
            // });
            return context.dispatch('addUserToDB',payload); // không đăng ký auth cho user
        },

        async addUserToDB (context, payload) {
            
            const newUser ={
                name : payload.name,
                email: payload.email,
                birthday: payload.birthday,
                phone: payload.phone,
                avatar: payload.avatar,
            }
            let res = null;
            if(payload.id){
                res = await axios.put("users/"+payload.id+".json",newUser);   //thêm khi có id
            }else{
                res = await axios.post("users.json",newUser) ;
            }
            if (res.status !== 200){
                const error = new Error(res.data.message || "Thêm thông tin người dùng thất bại");
                throw error;
            }
            context.commit('addNewUser',newUser);
        },

        async updateUser (context, payload) {
            const userData ={
                name : payload.data.name,
                email: payload.data.email,
                birthday: payload.data.birthday,
                phone: payload.data.phone,
                avatar: payload.data.avatar,
            }
            const res = await axios.patch("users/"+payload.id+".json",userData) 
            if (res.status !== 200){
                const error = new Error(res.data.message || "Cập nhật thông tin người dùng thất bại");
                throw error;
            }
            userData.id = payload.id;
            context.commit('updateUserState',userData);
        },

        async deleteUser (context, payload) {
            const res = await axios.delete("users/"+payload+".json") 
            if (res.status !== 200){
                const error = new Error(res.data.message || "Xóa thông tin người dùng thất bại");
                throw error;
            }
            context.commit('deleteUserState',payload);
        },
        
    },
}

