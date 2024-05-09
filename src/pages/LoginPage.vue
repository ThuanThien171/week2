<template>
    <div class="container">
        <div class="login-card">
            <img src="@/assets/ttlab-logo.svg"/>
            <div class="title">Đăng nhập</div>
            <form class="login-form" @submit.prevent="checkInput">
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" placeholder="Nhập email" v-model="email">
                </div>
                <div class="form-group">
                    <label>Mật khẩu</label>
                    <div class="password">
                        <input :type="inputType" placeholder="••••••••••••••" v-model="password">
                        <img class="customIcon" :src="changeIcon" @click="showHideIcon">
                    </div>
                </div>
                <div class="form-support">
                    <div>
                        <input type="checkbox" v-model="keepLogin">
                        Ghi nhớ Đăng nhập
                    </div>
                    <p>Quên mật khẩu?</p>
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
            <div class="signup">Bạn chưa có tài khoản?<a @click="gotoSignup">Đăng ký</a></div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            hideIcon: true,
            email: '',
            password: '',
            keepLogin: false,
        }
    },
    computed: {
        changeIcon() {
            if(this.hideIcon) {
                return "@/assets/eye-slash.svg";
            }else{
                return "@/assets/eye.svg";
            }
        },
        inputType() {
            if(this.hideIcon) {
                return "password";
            }else{
                return "text";
            }
        }
    },
    methods: {
        showHideIcon() {
            this.hideIcon = !this.hideIcon;
        },
        gotoSignup(){
            this.$router.replace('/signup');
        },
        checkInput () {
            const actionPayload = {
                email: this.email,
                password: this.password,
                keepLogin: this.keepLogin,
            };
            if(!this.email || !this.password) {
                this.$swal({
                  icon: 'error',
                  title: 'Lỗi',
                  text: 'Thiếu giá trị nhập vào!',
                })
            }else {
                this.handleLogin(actionPayload);
            }
        },
        async handleLogin(actionPayload) {
            try {
                await this.$store.dispatch('auth/login', actionPayload)
                .then(()=>{
                    this.$swal({
                        icon: 'success',
                        text: "Thành công",
                        title: 'Đăng nhập thành công!',
                    }).then(()=>{
                        const redirectUrl = '/' + (this.$route.query.redirect || '');
                        this.$router.replace(redirectUrl);
                    }) 
                })
            } catch (error) {
                this.$swal({
                    icon: 'error',
                    text: error.response.data.error.message,
                    title: 'Đăng nhập thất bại!\n Hãy thử lại sau!',
                })
            }
        }
    },
}
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        font-family: 'Public Sans';
    }
    .login-card {
        width: 426px;
        height: 476px;
        margin-top: 119px;
        gap: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .title {
        width: 163px;
        height: 48px;
        font-family: 'Public Sans';
        font-size: 32px;
        font-weight: 600;
        line-height: 48px;
        text-align: left;
    }
    .login-form {
        width: 425px;
        height: 260px;
        gap: 24px;
        opacity: 0px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .signup {
        width: 426px;
        height: 20px;
        gap: 4px;
        opacity: 0px;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        text-align: center;
    }
    .signup a {
        color: #0F60FF;
        font-weight: 600;
        padding: 0 5px;
    }
    .signup a:hover{
        cursor: pointer;
    }
    .login-form button {
        width: 425px;
        height: 48px;
        padding: 14px 32px;
        gap: 10px;
        border-radius: 6px;
        opacity: 0px;
        background: #0F60FF;
        color: white;
    }
    .form-group {
        width: 425px;
        height: 60px;
        gap: 0px;
        opacity: 0px;
    }
    .form-group label {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.02em;
        text-align: left;
        width: 100%;
    }
    .form-group input {
        width: 425px;
        height: 32px;
        padding: 6px 12px;
        gap: 0px;
        border-radius: 6px;
        opacity: 0px;
        border: 1px solid #868FA029;
        outline: none;
    }
    .form-support,
    .form-support div {
        display: flex;
    }
    .form-support {
        justify-content: space-between;
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        text-align: left;
    }
    .form-support p {
        color: #0F60FF;
        font-weight: 600;
    }
    .form-support input {
        margin-right: 5px;
    }
    .password {
        position: relative;
    }
    .customIcon {
        position: absolute;
        width: 16px;
        height: 16px;
        bottom: 8px;
        left: 397px;
    }
    .customIcon:hover {
        cursor: pointer;
    }
</style>
  