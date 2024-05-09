import { createStore } from "vuex";
import usersModule from "./modules/usersModule";
import productsModule from "./modules/productsModule";
import authModule from "./modules/authModule"
const store = createStore({
    modules: {
        users: usersModule,
        products: productsModule,
        auth: authModule,
    },
    state: {
        showSideBar: true,
    },
    mutations: {
        changeSideBar(state) {
            state.showSideBar = !state.showSideBar;
        }
    },
    getters: {
        sideBarState: state=> state.showSideBar,
    },
    actions: {
        
    }
})

export default store