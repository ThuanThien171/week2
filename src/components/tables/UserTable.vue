<template>
    <v-data-table 
    :filter-keys="['name','email','birthday','phone']"
    :search="seacrhKey"
    :headers="headerTitles"
    :items="getTableData"
    item-key="id"
    :page="page"
    :items-per-page="itemsPerPage"
    >
        <template v-slot:headers>
            <tr class="tableHeader">
                <th v-for="header in headerTitles"
                    :key="header.id">
                    {{ header.title }}
                </th>
            </tr>
        </template>
        <template v-slot:item.name="{ item }">
            <th class="customName">{{ item.name }}</th>
        </template>
        <template v-slot:item.email="{ item }">
            <th class="customText">{{ item.email }}</th>
        </template>
        <template v-slot:item.birthday="{ item }">
            <th class="customText">{{ item.birthday }}</th>
        </template>
        <template v-slot:item.phone="{ item }">
            <th class="customText">{{ item.phone }}</th>
        </template>
        <template v-slot:item.avatar="{ item }">
            <th style="display: flex; align-items: center;">
                <img class="customImage" :src="item.avatar" loading="lazy">
            </th>
        </template>
        <template v-slot:item.id="{ item }">
            <v-btn 
                icon 
                density="comfortable" 
                variant="text" 
                @click="()=>{updateUser(item)}"
            >
                <img src="@/assets/edit.svg">
            </v-btn>
            <v-btn 
                icon 
                density="comfortable" 
                variant="text" 
                @click="()=>{deleteUser(item.id)}"
            >
                <img src="@/assets/trash.svg">
            </v-btn>
        </template>
        <template v-slot:bottom>
            <v-divider></v-divider>
            <div class="bottom">
                <div class="numInPage">
                    Showing
                    <v-select
                        v-model="numPerPage"
                        :hide-details="true"
                        density="compact"
                        max-width="90px"
                        :items="[5, 10, 20, 50, 'All']"
                        variant="outlined"
                    ></v-select>
                        of {{ getTableData.length }}
                </div>
                <v-pagination
                    size="28px"
                    density="comfortable"
                    v-model="page"                
                    :length="pagesnumber"
                    :total-visible="5"
                ></v-pagination>
            </div>
        </template>
    </v-data-table>
    <UserForm :dialog="onOpen" @onClose="changeDialog" :data="data"></UserForm>
</template>

<script>
import UserForm from '../forms/UserForm.vue';
export default {
    props: {
        seacrhKey: String,
    },
    components: {
        UserForm,
    },
    data() {
        return {
            page: 1,
            numPerPage: 10,
            headerTitles: [
                { title: 'AVATAR', align: 'start', sortable: false, key: 'avatar' },
                { title: 'TÊN NGƯỜI DÙNG', align: 'start', key: 'name' },
                { title: 'EMAIL', align: 'start', key: 'email' },
                { title: 'NGÀY SINH', align: 'start', sortable: false, key: 'birthday' },
                { title: 'SỐ ĐIỆN THOẠI', align: 'start', sortable: false, key: 'phone' },
                { title: 'HÀNH ĐỘNG', align: 'start', sortable: false, key: 'id' },
            ],
            onOpen: false,
            data: null,
        }
    },
    watch: {
        onOpen(val){
            if(!val) this.data = null;
        }
    },
    computed: {
        itemsPerPage() {
            if(this.numPerPage === 'All') 
            return this.getTableData.length;
            else 
            return +this.numPerPage;
        },
        pagesnumber(){
            const check = this.getTableData.length % this.itemsPerPage;
            if(check != 0){
                return Math.floor(this.getTableData.length / this.itemsPerPage) + 1;
            }else{
                return Math.floor(this.getTableData.length / this.itemsPerPage);
            }
        },
        getTableData() {
            return this.$store.getters['users/getUserList'];
        },
    },
    created() {
        this.loadUsers();
    },
    methods: {
        changeDialog() {
            this.onOpen = !this.onOpen;
        },

        async loadUsers(){
            try {
                await this.$store.dispatch('users/getUserApi');
            } catch (error) {
                this.$swal({
                  icon: 'error',
                  title: 'Lỗi',
                  text: error || 'Không thể lấy dữ liệu người dùng!',
                })
            }
        },
        
        async updateUser(userInfo) {
            this.onOpen = true;
            this.data = userInfo;
        },

        async deleteUser(id) {
            this.$swal({
                icon: "info",
                title: "Bạn muốn xóa sản phẩm này?",
                showCancelButton: true,
                confirmButtonText: "Xác nhận",
                cancelButtontext: "Hủy",
                reverseButtons: true
			})
                .then( async (value)=>{
                    if (value.isConfirmed) {
                        try {
                            await this.$store.dispatch('users/deleteUser', id);
                            this.$swal({
                                title: 'Thành công!',
                                text: 'Xóa người dùng thành công!',
                                icon: 'success',
                            });
                        } catch (error) {
                            this.$swal({
                            icon: 'error',
                            title: 'Lỗi',
                            text: error || 'Xóa người dùng thất bại!',
                            })
                        }
                    }
                })
        }
    }
}
</script>

<style scoped>
    .tableHeader {
        font-family: 'Public Sans';
        font-size: 13px;
        font-weight: 500;
        line-height: 15.28px;
        text-align: left;
        color: #8B909A;
    }
    .customName,
    .customText {
        font-family: "Public Sans";
        font-size: 15px;
        font-weight: 600;
        line-height: 22px;
        text-align: left;
        color: #23272E;
    }
    .customText {
        font-weight: 400;
    }
    .customImage {
        width: 36px;
        height: 36px;
        border-radius: 2px;
    }
    .bottom {
        display: flex;
        width: 100%;
        height: 72px;
        padding: 16px 24px;
        justify-content: space-between;
        align-items: center;
    }
    .numInPage {
        min-width: 197px;
        gap: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: "Public Sans";
        font-size: 15px;
        font-weight: 500;
        line-height: 17.63px;
        letter-spacing: 0.4300000071525574px;
        text-align: left;
        color: #8B909A;
    }
    .v-select{
        color: #23272E !important;
        font-family: "Public Sans" !important;
        font-size: 15px !important;
        font-weight: 500 !important;
        line-height: 17.63px !important;
        letter-spacing: 0.43px !important;
        text-align: left;
    }
    .v-pagination__item {
    background: blue !important;
  }
    .v-pagination__item--active {
    background: yellow !important;
  }

</style>