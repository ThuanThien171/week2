import axios from "@/plugins/axios";
export default {
    namespaced: true,
    state() {
        return{
            products: [], //array
        }
    },
    getters: {
        getProductList(state) {
            return state.products;
        },
    },
    mutations: {
        setProductList(state, payload) {
            state.products = payload;
        },
        addNewProduct(state,payload) {
            state.products.push(payload);
        },
        updateProductState(state, payload) {
            state.products.filter((data) => {
                if(data.id === payload.id) {
                    data.name = payload.name;
                    data.price = payload.price;
                    data.numbers = payload.numbers;
                    data.description = payload.description;
                    data.image = payload.image;
                }
            })
        },
        deleteProductState(state,payload) {
            let newState = state.products.filter((data)=>{
                if(data.id !== payload) return data;
            })
            state.products= newState
        }
    },
    actions: {
        async getProductApi(context,_) {
            const res = await axios.get('products.json')
            if (res.status !== 200){
                const error = new Error(res.message || "Error");
                throw error;
            }
            const productList = [];

            for (const key in res.data) {
                const product = {
                    id: key,
                    name: res.data[key].name,
                    price: res.data[key].price,
                    numbers: res.data[key].numbers,
                    description: res.data[key].description,
                    image: res.data[key].image,
                };
                productList.push(product);
            }
            context.commit('setProductList',productList);
        },
        
        async addProductToDB (context, payload) {
            
            const newProduct ={
                name: payload.name,
                price: payload.price,
                numbers: payload.numbers,
                description: payload.description,
                image: payload.image,
            }
            const res = await axios.post("products.json",newProduct)
            if (res.status !== 200){
                const error = new Error(res.data.message || "Thêm thông tin người dùng thất bại");
                throw error;
            }
            context.commit('addNewProduct',newProduct);
        },

        async updateProduct (context, payload) {
            const productData ={
                name : payload.data.name,
                price: payload.data.price,
                numbers: payload.data.numbers,
                description: payload.data.description,
                image: payload.data.image,
            }
            const res = await axios.patch("products/"+payload.id+".json",productData) 
            if (res.status !== 200){
                const error = new Error(res.data.message || "Cập nhật thông tin sản phẩm thất bại");
                throw error;
            }
            productData.id = payload.id;
            context.commit('updateProductState',productData);
        },

        async deleteProduct (context, payload) {
            const res = await axios.delete("products/"+payload+".json") 
            if (res.status !== 200){
                const error = new Error(res.data.message || "Xóa thông tin sản phẩm thất bại");
                throw error;
            }
            context.commit('deleteProductState',payload);
        },
        
    },
}

