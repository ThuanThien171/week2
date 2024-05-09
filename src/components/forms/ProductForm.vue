<template>
    <v-dialog
      style="z-index: 1000;"
      v-model="onOpen"
      width="auto"
    >
        <form class="form-new" @submit.prevent="checkProductProps">
            <div class="title">{{data? 'Cập nhật sản phẩm' : 'Tạo mới sản phẩm'}}</div>
            <div class="body">
                <div class="form-control">
                    <div class="label">
                        Tên sản phẩm
                        <p>*</p>
                    </div>
                    <input type="text" placeholder="Nhập tên sản phẩm" v-model.trim="newProduct.name">
                </div>
                <div class="form-control">
                    <div class="label">
                        Giá
                        <p>*</p>
                    </div>
                    <input type="number" placeholder="Nhập giá sản phẩm" v-model.number="newProduct.price">
                </div>
                <div class="form-control">
                    <div class="label">
                        Số lượng
                        <p>*</p>
                    </div>
                    <input type="number" 
                        placeholder="Nhập số lượng sản phẩm" 
                        v-model.number="newProduct.numbers"
                    >
                </div>
                <div class="form-control" style="height: 156px;">
                    <div class="label">
                        Mô tả
                    </div>
                    <textarea class="descript" 
                        rows="4" cols="50" 
                        placeholder="Nhập mô tả" 
                        v-model="newProduct.description"
                    ></textarea>
                </div>
                <div class="form-control">
                    <div class="label">
                        Ảnh sản phẩm
                        <p>*</p>
                    </div>
                    <input type="text" 
                        placeholder="Nhập link ảnh sản phẩm" 
                        v-model="newProduct.image"
                    >
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
              onOpen: this.dialog,
              newProduct: {
                name: '',
                price: null,
                numbers: null,
                description: '',
                image: '',
              }
            }
        },
        watch: {
          dialog(val){
            this.onOpen = val;
          },
          onOpen(val){
            if(val === false) this.$emit('onClose');
          },
          data(val) {
            if(val) {
              this.newProduct.name = val.name;
              this.newProduct.price = val.price;
              this.newProduct.numbers = val.numbers;
              this.newProduct.description = val.description;
              this.newProduct.image = val.image;
            }
          }
        },
        computed: {
          
        },
        methods: {
            checkProductProps() {
              if (
                !this.newProduct.name || 
                !this.newProduct.price || 
                !this.newProduct.numbers || 
                !this.newProduct.image
              ) {
                this.$swal({
                  icon: 'error',
                  title: 'Lỗi',
                  text: 'Thiếu giá trị nhập vào!',
                })
              } else {
                if(this.data){
                  this.updateinfo();
                }else{
                  this.addNew();
                }
              }
              
            },
            async addNew() {
              try {
                  await this.$store.dispatch('products/addProductToDB',this.newProduct);
                  this.$swal({
                      title: 'Thành công!',
                      text: 'Thêm mới sản phẩm thành công!',
                      icon: 'success',
                  });
                  this.newProduct.name = '';
                  this.newProduct.price = null;
                  this.newProduct.numbers = null;
                  this.newProduct.description = '';
                  this.newProduct.image = '';
              } catch (error) {
                  this.$swal({
                      icon: 'error',
                      title: 'Lỗi',
                      text: error || 'Thêm mới sản phẩm thất bại!',
                  })
              }
                this.onOpen = false;
            },
            async updateinfo() {
              try {
                  await this.$store.dispatch('products/updateProduct',{
                    id: this.data.id,
                    data: this.newProduct,
                  });
                  this.$swal({
                      title: 'Thành công!',
                      text: 'Cập nhật sản phẩm thành công!',
                      icon: 'success',
                  });
                  this.newProduct.name = '';
                  this.newProduct.price = null;
                  this.newProduct.numbers = null;
                  this.newProduct.description = '';
                  this.newProduct.image = '';
              } catch (error) {
                  this.$swal({
                      icon: 'error',
                      title: 'Lỗi',
                      text: error || 'Cập nhật sản phẩm thất bại!',
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
      height: 614px;
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
      height: 100%;
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

    .form-control input,
    .form-control textarea {
      width: 400px;
      height: 32px;
      padding: 6px 12px;
      border-radius: 6px;
      background: #FFFFFF;
      border: 1px solid #868FA029;
      box-shadow: 0px 1px 2px 0px #0000000F;
      outline: none;
    }
    .form-control textarea {
      height: 128px;
    }
</style>