<template>
    <div class="container">
        <div class="login-card">
            <img src="@/assets/ttlab-logo.svg"/>
            <div class="title">Đăng ký</div>
            <form class="login-form" @submit.prevent="checkInput">
                <div class="form-group">
                    <div class="label">
                        Email
                        <p>*</p>
                    </div>
                    <input type="text" placeholder="Nhập email" v-model.trim="newUser.email">
                </div>
                <div class="form-group">
                    <div class="label">
                        Mật khẩu
                        <p>*</p>
                    </div>
                    <div class="password">
                        <input :type="inputType" placeholder="••••••••••••••" v-model.trim="newUser.password">
                        <img class="customIcon" :src="changeIcon" @click="showHideIcon">
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        Nhập lại mật khẩu
                        <p>*</p>
                    </div>
                    <div class="password">
                        <input :type="inputType" placeholder="••••••••••••••" v-model.trim="repeatPassword">
                        <img class="customIcon" :src="changeIcon" @click="showHideIcon">
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        Tên người dùng
                        <p>*</p>
                    </div>
                    <input type="text" placeholder="Nhập tên người dùng" v-model.trim="newUser.name">
                </div>
                <div class="form-group" style="position: relative;">
                    <div class="label">
                        Ngày sinh
                        <p>*</p>
                    </div>
                    <input type="text" placeholder="YYYY/MM/DD" v-model.trim="newUser.birthday">
                    <div class="date">
                      <input 
                      class="date-input"
                      type="date" 
                      style="color: transparent;opacity: 0" 
                      pattern="\d{4}\\d{2}\\d{2}"
                      v-model="dayInput"
                      >
                    </div>
                    <button class="date" type="button" style="z-index: 2;pointer-events: none;">
                        <img src="@/assets/calendar.svg" style="width: 16px; height: 16px;">
                    </button>
                </div>
                <div class="form-group">
                    <div class="label">
                        Số điện thoại
                        <p>*</p>
                    </div>
                    <input type="text" placeholder="Nhập số điện thoại" v-model.trim="newUser.phone">
                </div>
                <div class="form-group">
                    <div class="label">
                        Avatar 
                        <p>*</p>
                    </div>
                    <input type="text" placeholder="Nhập link ảnh avatar" v-model.trim="newUser.avatar">
                </div>
                <div class="form-support">
                    <div>
                        <input type="checkbox" v-model="keepLogin">
                        Ghi nhớ Đăng nhập
                    </div>
                </div>
                <button type="submit">Đăng ký</button>
            </form>
            <div class="signup">Bạn đã có tài khoản?<a @click="gotoLogin">Đăng nhập</a></div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            hideIcon: true,
            keepLogin: false,
            dayInput: '',
            repeatPassword: '',
            newUser: {
                name : '',
                email: '',
                birthday: '',
                phone: '',
                avatar: '',
                password: '',
            },
        }
    },
    watch: {
        dayInput(val) {
            this.newUser.birthday = val.replaceAll("-", "/");
          },
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
        gotoLogin(){
            this.$router.replace('/login');
        },
        checkInput () {
            const actionPayload = {
                email: this.newUser.email,
                password: this.newUser.password,
                name: this.newUser.name,
                phone: this.newUser.phone,
                birthday: this.newUser.birthday,
                avatar: this.newUser.avatar,
                keepLogin: this.keepLogin,
            };
            if (
                !this.newUser.email || 
                !this.newUser.password ||
                !this.newUser.name ||
                !this.newUser.phone ||
                !this.newUser.birthday ||
                !this.newUser.avatar
            ) {
                this.$swal({
                  icon: 'error',
                  title: 'Lỗi',
                  text: 'Thiếu giá trị nhập vào!',
                })
            }else if(this.repeatPassword !== this.newUser.password){
                this.$swal({
                  icon: 'error',
                  title: 'Lỗi',
                  text: 'Mật khẩu nhập lại không chính xác!',
                })
            }else{
                this.handleSignup(actionPayload);
            }
        },
        async handleSignup(actionPayload) {
            try {
                await this.$store.dispatch('auth/signup', actionPayload)
                .then(()=>{
                    this.$swal({
                        icon: 'success',
                        text: "Thành công",
                        title: 'Đăng ký thành công!',
                    }).then(()=>{
                        this.$router.replace('/');
                    })
                })
            } catch (error) {
                this.$swal({
                    icon: 'error',
                    text: error.response.data.error.message || "Lỗi",
                    title: 'Đăng ký thất bại!\n Hãy thử lại sau!',
                })
            }
        }
    },
}
</script>

<style scoped>
    .container {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        font-family: 'Public Sans';
    }
    .login-card {
        width: 426px;
        height: auto;
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
        text-align: center;
    }
    .login-form {
        width: 425px;
        height: auto;
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

    .label {
      display: flex;
      font-weight: 500;
      color: #464F60;
    }
    .label p {
      margin: 0 3px;
      color: #0F60FF;
    }

    .date {
      padding: 0 !important; 
      width: 32px !important;
      height: 32px !important;
      position: absolute !important;
      right: 0 !important;
      bottom: 5px !important;
      z-index: 1 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border: none !important;
      background: none !important;
    }
    .date-input {
      width: 20px !important;
      height: 20px !important;
      padding: 0 !important;
      border: none !important;
      box-shadow: none !important;
    }
</style>
  