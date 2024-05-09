<template>
    <div class="searchBar">
        <input type="text" placeholder="Tìm kiếm" :value="searchKey" @keyup="handleChangeInput">
        <img src="@/assets/mingcute_search-line.svg">
    </div>
</template>

<script>
export default {
    props: {
        searchKey: String,
    },
    emits: ['changeSearchKey'],
    methods: {
        handleChangeInput(e) {
            this.$emit('changeSearchKey',e.target.value)
        }
    }
}
</script>

<style scoped>
    .searchBar{
        width: 316px;
        height: 40px;
        border-radius: 4px;
        background: #FFFFFF;
        position: relative;
        display: flex;
        align-items: center;
        box-shadow: 0px 4px 16px 0px #00000014;
        padding: 8px 16px;
        gap: 4px;
        border-radius: 4px;
    }
    .searchBar input {
        width: 262px;
        height: 21px;
        outline: none;
        font-family: 'Public Sans';
        font-size: 15px;
        font-weight: 400;
        line-height: 21px;
        text-align: left;
        color: #8B909A;
    }
</style>