<template>
    <div>
        <side-bar></side-bar>
        <div class="dashboard" :style="dashboardWidth">
        <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import SideBar from "../components/sideBar/SideBar.vue"
    export default {
        components: {
            SideBar,
        },
        data() {
            return {
            }
        },
        computed: {
            dashboardWidth(){
                if(this.$store.state.showSideBar){
                    return "margin-left: 260px;";
                }else{
                    return "margin-left: 0px;";
                }
            }
        },
        methods: {
            hiddenSideBar(){
                this.openSideBar = !this.openSideBar;
            }
        }
    }
</script>

<style scoped>
    .dashboard {
        padding: 10px 15px;
        background: #FAFAFA;
        min-height: 1024px;
    }
</style>