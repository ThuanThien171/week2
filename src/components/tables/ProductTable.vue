<template>
    <v-data-table 
    :filter-keys="['name','price','numbers','description']"
    :search="seacrhKey"
    :headers="headerTitles"
    :items="getTableData"
    item-key="id"
    :page="page"
    :items-per-page="itemsPerPage"
    @update:current-items="getDatalength"
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
        <template v-slot:item.price="{ item }">
            <th class="customText">${{ item.price }}</th>
        </template>
        <template v-slot:item.numbers="{ item }">
            <th class="customText">{{ item.numbers }}</th>
        </template>
        <template v-slot:item.description="{ item }">
            <th class="customText">{{ item.description }}</th>
        </template>
        <template v-slot:item.image="{ item }">
            <th style="display: flex; align-items: center;">
                <img class="customImage" :src="item.image" loading="lazy">
            </th>
        </template>
        <template v-slot:item.id="{ item }">
            <v-btn 
                icon 
                density="comfortable" 
                variant="text"
                @click="()=>{updateProduct(item)}"
            >
                <img src="@/assets/edit.svg">
            </v-btn>
            <v-btn 
                icon 
                density="comfortable" 
                variant="text"
                @click="()=>{deleteProduct(item.id)}"
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
                        of {{(filterItem!==null) ? filterItem : getTableData.length }}
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
    <ProductForm :dialog="onOpen" @onClose="changeDialog" :data="data"></ProductForm>
</template>

<script>
import ProductForm from '../forms/ProductForm.vue';
export default {
    props: {
        seacrhKey: String,
    },
    components: {
        ProductForm,
    },
    data() {
        return {
            page: 1,
            numPerPage: 10,
            filterItem: null,
            currentItems: 0,
            headerTitles: [
                { title: 'TÊN SẢN PHẨM', align: 'start', sortable: false, key: 'name' },
                { title: 'GIÁ', align: 'start', key: 'price' },
                { title: 'SỐ LƯỢNG', align: 'start', key: 'numbers' },
                { title: 'MÔ TẢ', align: 'start', sortable: false, key: 'description' },
                { title: 'ẢNH', align: 'start', sortable: false, key: 'image' },
                { title: 'HÀNH ĐỘNG', align: 'start', sortable: false, key: 'id' },
            ],
            onOpen: false,
            data: null,
        }
    },
    watch: {
        onOpen(val){
            if(!val) this.data = null;
        },
        seacrhKey(val){
            this.page = 1;
            if(val !== ''){
                this.numPerPage = 'All';
            }else{
                this.numPerPage = 10;
                this.filterItem = null;
            }
        },
        currentItems(val) {
            if(this.numPerPage === 'All' && this.seacrhKey !== ''){
                this.filterItem = val;
                console.log(this.filterItem)
            }
        },
    },
    computed: {
        itemsPerPage() {
            if(this.numPerPage === 'All') 
            return this.getTableData.length;
            else 
            return +this.numPerPage;
        },
        pagesnumber(){
            let check = this.getTableData.length % this.itemsPerPage;
            let pageNums = Math.floor(this.getTableData.length / this.itemsPerPage);
            if(this.filterItem) {
                check = this.filterItem % this.itemsPerPage;
                pageNums = Math.floor(this.filterItem / this.itemsPerPage);
            }
            if(check != 0){
                return pageNums + 1;
            }else{
                return pageNums;
            }
        },
        getTableData() {
            return this.$store.getters['products/getProductList'];
        },
    },
    created() {
        this.loadProducts();
    },
    methods: {
        changeDialog() {
            this.onOpen = !this.onOpen;
        },

        async loadProducts(){
            try {
                await this.$store.dispatch('products/getProductApi');
            } catch (error) {
                this.$swal({
                  icon: 'error',
                  title: 'Lỗi',
                  text: error || 'Không thể lấy dữ liệu sản phẩm!',
                })
            }
        },

        async updateProduct(productInfo) {
            this.onOpen = true;
            this.data = productInfo;
        },

        async deleteProduct(id) {
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
                            await this.$store.dispatch('products/deleteProduct', id);
                            this.$swal({
                                title: 'Thành công!',
                                text: 'Xóa sản phẩm thành công!',
                                icon: 'success',
                            });
                        } catch (error) {
                            this.$swal({
                            icon: 'error',
                            title: 'Lỗi',
                            text: error || 'Xóa sản phẩm thất bại!',
                            })
                        }
                    }
                })


            // try {
            //     await this.$store.dispatch('products/deleteProduct', id);
            //     this.$swal({
            //         title: 'Thành công!',
            //         text: 'Xóa sản phẩm thành công!',
            //         icon: 'success',
            //     });
            // } catch (error) {
            //     this.$swal({
            //       icon: 'error',
            //       title: 'Lỗi',
            //       text: error || 'Xóa sản phẩm thất bại!',
            //     })
            // }
        },

        getDatalength(e) {
            this.currentItems = e?.length;
        },
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