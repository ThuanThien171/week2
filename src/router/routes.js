import UsersPage from "@/pages/UsersPage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";
let dashRoutes = [
    {
        title: 'Sản phẩm',
        icon: '@/assets/box.svg',
        path: '/products',
        component: ProductsPage,
    },
    {   
        title: 'Users',
        icon: '@/assets/users.svg',
        path: '/users',
        component: UsersPage,
    },
]

export default dashRoutes;