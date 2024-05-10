import UsersPage from "@/pages/UsersPage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";
let dashRoutes = [
    {
        title: 'Sản phẩm',
        icon: 'box',
        path: '/products',
        component: ProductsPage,
    },
    {   
        title: 'Users',
        icon: 'user',
        path: '/users',
        component: UsersPage,
    },
]

export default dashRoutes;