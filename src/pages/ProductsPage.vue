<template>
    <div>
        <HeadBar title="Danh sách sản phẩm"></HeadBar>
        <div class="formBar">
            <SearchBar :searchKey="searchInput" @changeSearchKey="changeSearchInput"></SearchBar>
            <v-btn @click="changeDialog">
                <img src="@/assets/plusIcon.svg"/>
                Tạo mới
            </v-btn>
        </div>
        <ProductTable :seacrhKey="searchInput"></ProductTable>
        <ProductForm :dialog="onOpen" @onClose="changeDialog"></ProductForm>
    </div>
</template>

<script>
import HeadBar from '../components/header/HeadBar.vue';
import SearchBar from '@/components/header/SearchBar.vue';
import ProductTable from '@/components/tables/ProductTable.vue';
import ProductForm from '../components/forms/ProductForm.vue';
export default {
    data() {
        return {
            searchInput: "",
            onOpen: false,
        }
    },
    components: {
        HeadBar,
        SearchBar,
        ProductTable,
        ProductForm,
    },
    methods: {
        changeDialog() {
            this.onOpen = !this.onOpen;
        },
        changeSearchInput(val){
            this.searchInput = val;
        }
    }
}
</script>

<style scoped>
    .formBar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .formBar .v-btn {
        color: #FFFFFF;
        font-family: 'Public Sans';
        font-size: 14px;
        font-weight: 600;
        line-height: 16px;
        text-align: center;
        background: #0F60FF;
        width: 122px;
        height: 40px;
        padding: 12px 24px;
        gap: 6px;
        border-radius: 6px;
        display: flex;
        align-items: center;
    }
</style>