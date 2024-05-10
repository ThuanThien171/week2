<template>
    <div class="sideBar" :style="barWidth">
        <div class="header">
            <img src="@/assets/ttlab - logo ngang.svg"/>
            <img src="@/assets/indent-decrease.svg" class="as-btn" @click="changeSideBar"/>
        </div>
        <div class="title">
            QUẢN LÝ SẢN PHẨM
        </div>
        <div class="pageList">
            <div :class="(route.path === currentRoute)? 'routeLink activeRouteLink':'routeLink'" 
            v-for="route in sidebarRoute" 
            :key="route.title"
            @click="gotoPage(route.path)"
            >
                <box-icon v-if="route.icon === 'box'" 
                :strokeColor="(route.path === currentRoute)? '#23272E':'#8B909A'"
                ></box-icon>
                <user-icon v-if="route.icon === 'user'"
                :strokeColor="(route.path === currentRoute)? '#23272E':'#8B909A'"
                ></user-icon>
                {{ route.title }}
            </div>
        </div>
    </div>
</template>

<script>
import dashRoutes from '@/router/routes';
import { mapGetters, mapMutations } from 'vuex';
import boxIcon from '../icons/boxIcon.vue';
import userIcon from '../icons/userIcon.vue';
export default {
  components: { boxIcon, userIcon },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'sideBarState',
        ]),
        sidebarRoute(){
            return dashRoutes;
        },
        currentRoute() {
            return this.$router.currentRoute.value.path;
        },
        barWidth() {
            if(this.sideBarState) {
                return "width: 260px;";
            }else{
                return "width: 0px;";
            }
        }
    },
    methods:{
        ...mapMutations([
            'changeSideBar',
        ]),
        gotoPage(link) {
            this.$router.push(link);
        },
    }
}
</script>

<style scoped>
    .sideBar {
        height: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
    }

    .header {
        width: 260px;
        height: 68px;
        padding: 20px 14px 20px 18px;
        gap: 10px;
        display: flex;
        justify-content: space-between;
    }
    .title {
        width: 260px;
        height: 44px;
        padding: 15px 30px;
        gap: 8px;
        border-radius: 6px;
        font-family: 'Public Sans';
        font-size: 11px;
        font-weight: 400;
        line-height: 14px;
        text-align: left;
        color: #8B909A;
    }
    .pageList {
        width: 260px;
        padding: 0px 14px;
        gap: 8px;
    }
    .routeLink {
        width: 232px;
        height: 40px;
        padding: 9px 16px;
        gap: 8px;
        border-radius: 6px;
        font-family: 'Public Sans';
        font-size: 15px;
        font-weight: 600;
        line-height: 22px;
        text-align: left;
        color: #8B909A;
        display: flex;
        align-items: center;
    }
    .routeLink:hover,
    .as-btn:hover {
        cursor: pointer;
    }
    .activeRouteLink {
        color: #23272E;
        background: #F3F4F8;
    }
    .routeLink .box-icon {
        stroke: #8B909A !important;
    }
    .activeRouteLink .box-icon {
        stroke: #23272E !important;
    }
</style>