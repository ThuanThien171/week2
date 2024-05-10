<template>
    <div class="headerBar">
        <div>
        <img v-if="!sideBarState" src="@/assets/ttlab-logo.svg">
        <p v-if="sideBarState">{{ title }}</p>
        </div>
        <div class="accountInfo">
            <img v-if="!sideBarState" src="@/assets/menu.svg" @click="changeSideBar">
            <div class="notify">
                <img src="@/assets/bell.svg"/>
                <div class="dot">4</div>
            </div>
            <!-- <div class="avatar">
                <div class="status"></div>
                <img :src="imgLink">
            </div> -->
            <v-menu location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn
                    class="avatar"
                    v-bind="props"
                    variant="text"
                    size="38px"
                    >
                        <div class="avatar">
                            <div class="status"></div>
                            <img :src="imgLink">
                        </div>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-btn @click="logout">logout</v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
    <div v-if="!sideBarState" class="headerBar">{{ title }}</div>
</template>

<script>
import { mapGetters, mapMutations} from "vuex"
export default {
    data() {
        return {
            imgLink: "https://s3-alpha-sig.figma.com/img/ece8/df92/d371531b922f3e8c0e8f0dfe4782d86e?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ppDfv-TOU1tBt1XL0HWgS3aCdYMa6~Pz6z1iR5xIh5r5GkSFdesH36Qw8wvg1mbrPJPV1ZTgvhamKDgf930KCbh2ptAApcXWGETlHxh~MYID~gWzQkt-thkbO4k8FzsxqjTx3dZp2uLF0KHOO6Lmf8DXmaZLSsmXmwPyA1uWVprdiXd7Ja6jB4nirp7v8YIpYjqhpxSVXpFZZrs-AIyJ6EwZlQnY-j19sDAct5HriLHz4pYrQguz9Wqf3WwP3nt-iEpPSxhEcXU9OlSMz2KEytpF-0QP~sInqJgID7PF8FO9OsOmiCbq6vMCN9-8FR75cwnqB0WqdQ2SYMZg2Qwh~w__"
        }
    },
    props: {
        title: {
            type: String,
            require: false,
            default: "Page",
        }
    },
    computed: {
        ...mapGetters([
            'sideBarState',
        ]),
    },
    methods: {
        ...mapMutations([
            'changeSideBar',
        ]),
        logout() {
            this.$store.dispatch('auth/logout')
            .then(()=>{
                this.$router.replace('/login');
            })
        }
    }
}
</script>

<style scoped>
    .headerBar {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        height: 62px;
        align-items: center;
        font-family: 'Public Sans';
        font-size: 24px;
        font-weight: 600;
        line-height: 22px;
        text-align: left;
    }
    .accountInfo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 89.56px;
        height: 38px;
        gap: 24px;
        opacity: 0px;
    }
    .notify {
        width: 27.56px;
        height: 37px;
        position: relative;
        display: flex;
        align-items: center;
    }
    .notify .dot {
        position: absolute;
        width: 18px;
        height: 18px;
        top: 1.76px;
        left: 14.23px;
        font-family: "Public Sans";
        font-size: 13px;
        font-weight: 600;
        line-height: 14px;
        text-align: center;
        color: white;
        background: red;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar {
        width: 38px !important;
        height: 38px;
        border-radius: 100px;
        padding: 0 !important;
        position: relative;
    }
    .avatar .status {
        position: absolute;
        width: 8px;
        height: 8px;
        top: 28.74px;
        left: 27.76px;
        border-radius: 50%;
        background: #28C76F;
        border: 2px solid #FFFFFF
    }
    .avatar img{
        width: 38px;
        height: 38px;
        border-radius: 100px;
    }
    .accountInfo img:hover {
        cursor: pointer;
    }
</style>