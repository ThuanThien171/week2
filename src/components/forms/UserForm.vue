<template>
    <v-dialog
      style="z-index: 1000;"
      v-model="onOpen"
      width="auto"
    >
        <form class="form-new" @submit.prevent="checkUserProps">
            <div class="title">{{data ? 'Cập nhật người dùng':'Tạo mới người dùng'}}</div>
            <div class="body">
                <div class="form-control">
                    <div class="label">
                        Tên người dùng
                        <p>*</p>
                    </div>
                    <input type="text" placeholder="Nhập tên người dùng" v-model.trim="newUser.name">
                </div>
                <div class="form-control">
                    <div class="label">
                        Email
                        <p>*</p>
                    </div>
                    <input type="email" placeholder="Nhập email" v-model.trim="newUser.email">
                </div>
                <div class="form-control" style="position: relative;">
                    <div class="label">
                        Ngày sinh
                        <p>*</p>
                    </div>
                    <input type="text" placeholder="YYYY/MM/DD" v-model.trim="newUser.birthday">
                    <div class="date">
                      <input type="date" style="color: transparent;opacity: 0" pattern="\d{4}\\d{2}\\d{2}" v-model="dayInput">
                    </div>
                    <button class="date" type="button" style="z-index: 2;pointer-events: none;">
                        <img src="@/assets/calendar.svg" style="width: 16px; height: 16px;">
                    </button>
                </div>
                <div class="form-control">
                    <div class="label">
                        Số điện thoại
                        <p>*</p>
                    </div>
                    <input type="text" placeholder="Nhập số điện thoại" v-model.trim="newUser.phone">
                </div>
                <div class="form-control">
                    <div class="label">
                        Avatar 
                        <p>*</p>
                    </div>
                    <input type="text" placeholder="Nhập link ảnh avatar" v-model.trim="newUser.avatar">
                </div>

            </div>
            <div class="bottom">
              <button class="cancel-btn" type="button" @click="onOpen=false">Hủy</button>
              <button class="ok-btn" type="submit">Xác nhận</button>
            </div>
        </form>
    </v-dialog>
</template>

<script>
    //import axios from '@/plugins/axios';
    export default {
        props: {
            dialog: Boolean,
            data: {
              require: false,
              type: Object,
            },
        },
        data() {
            return {
              dayInput: '',
              onOpen: this.dialog,
              newUser: {
                name : '',
                email: '',
                birthday: '',
                phone: '',
                avatar: '',
              }
            }
        },
        watch: {
          dayInput(val) {
            this.newUser.birthday = val.replaceAll("-", "/");
          },
          dialog(val){
            this.onOpen = val;
          },
          onOpen(val){
            if(val === false) this.$emit('onClose');
          },
          data(val) {
            if(val) {
              this.newUser.name = val.name;
              this.newUser.email = val.email;
              this.newUser.birthday = val.birthday;
              this.newUser.phone = val.phone;
              this.newUser.avatar = val.avatar;
            }
          }
        },
        methods: {
          checkUserProps() {
              if (
                !this.newUser.name || 
                !this.newUser.email || 
                !this.newUser.birthday || 
                !this.newUser.phone ||
                !this.newUser.avatar
              ) {
                this.$swal({
                  icon: 'error',
                  title: 'Lỗi',
                  text: 'Thiếu giá trị nhập vào!',
                })
              } else {
                if(this.data) {
                  this.updateInfo();
                }else{
                  this.addNew();
                }
              }
              
            },

          async addNew() {
                try {
                  await this.$store.dispatch('users/signupNewUser',this.newUser);
                  this.$swal({
                      title: 'Thành công!',
                      text: 'Thêm mới người dùng thành công!',
                      icon: 'success',
                  });
                  this.newUser.name = "";
                  this.newUser.email = "";
                  this.newUser.birthday = "";
                  this.newUser.phone = "";
                  this.newUser.avatar = "";
                } catch (error) {
                  this.$swal({
                  icon: 'error',
                  title: 'Lỗi',
                  text: error || 'Thêm mới người dùng thất bại!',
                })
                }
                this.onOpen = false;
          },

          async updateInfo() {
              try {
                await this.$store.dispatch('users/updateUser', {
                  id: this.data.id,
                  data: this.newUser
                });
                this.$swal({
                    title: 'Thành công!',
                    text: 'Cập nhật người dùng thành công!',
                    icon: 'success',
                });
                this.newUser.name = "";
                this.newUser.email = "";
                this.newUser.birthday = "";
                this.newUser.phone = "";
                this.newUser.avatar = "";
              } catch (error) {
                this.$swal({
                  icon: 'error',
                  title: 'Lỗi',
                  text: error || 'Cập nhật người dùng thất bại!',
                })
              }
              this.onOpen = false;
          },

        }
    }
</script>

<style scoped>
    .form-new {
      width: 440px;
      height: 518px;
      border-radius: 12px;
      background: #F7F8FA;
    }
    .title {
      height: 54px;
      background: #FFFFFF;
      padding: 17px 20px;
      border-radius: 12px 12px 0 0;
      font-family: 'Public Sans';
      font-size: 18px;
      font-weight: 500;
      line-height: 21.15px;
      text-align: left;
      color: #1A2240;
    }
    .bottom {
      height: 64px;
      padding: 0 20px;
      background: #FFFFFF;
      border-radius: 0 0 12px 12px;
      display: flex;
      align-items: center;
      justify-content: right;
    }
    .ok-btn {
        box-sizing: border-box;
        width: 105px;
        height: 32px;
        padding: 6px 12px;
        gap: 8px;
        border-radius: 6px;
        background: #0F60FF;
        font-family: "Public Sans";
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.02em;
        text-align: center;
        color: #FFFFFF;
    }
    .cancel-btn {
        margin: 0 16px;
        width: 70px;
        height: 32px;
        padding: 6px 12px;
        gap: 8px;
        border-radius: 6px;
        font-family: 'Public Sans';
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.02em;
        text-align: center;
        color: #464F60;
        border: 1px outset #464F6029;
        box-shadow: 0px 1px 1px 0px #0000001A;
    }
    .body {
      padding: 16px 20px;
      display: flex;
      height: 396px;
      flex-direction: column;
      justify-content: space-between;
    }
    .form-control {
      font-family: "Public Sans";
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.02em;
      text-align: left;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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

    .form-control input {
      width: 400px;
      height: 32px;
      padding: 6px 12px;
      border-radius: 6px;
      background: #FFFFFF;
      border: 1px solid #868FA029;
      box-shadow: 0px 1px 2px 0px #0000000F;
      outline: none;
    }
    .form-control .date {
      padding: 0;
      width: 32px;
      height: 32px;
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
    }
    .form-control .date input {
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      box-shadow: none;
    }
</style>