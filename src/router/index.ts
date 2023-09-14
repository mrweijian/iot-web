import { createRouter, createWebHashHistory } from "vue-router";
import { getToken, getParentNode, getNodeByMenuPath } from "../utils/comm";
import { useMenuStore } from '../store/Menu'
import { useLeftMenuStore } from "../store/LeftMenu";
import pinia from "../store";

const routes = [
    { path: "/", redirect: "/Home" },
    { path: "/Login", component: () => import('../views/login/Login.vue') },
    {
        path: "/Home", component: () => import('../views/home/Home.vue'),
        redirect: "/House",
        children: [
            {
                path: "/House", component: () => import('../views/home/User.vue'),
            },
            {
                path: "/User", component: () => import('../views/home/User.vue'),
            },
            {
                path: "/Role", component: () => import('../views/home/Role.vue'),
            },
            {
                path: "/Menu", component: () => import('../views/home/Menu.vue'),
            },
            {
                path: "/Dervice", component: () => import('../views/home/Menu.vue'),
            }
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

const noTokenPath = ['/Login']

router.beforeEach((to, from, next) => {
    // 根据路由反向找菜单
    const menusObj = useMenuStore(pinia)//userStore 初始化 必须放在  路由守卫里 才会生效， 必须放在  路由守卫里 才会生效， 必须放在  路由守卫里 才会生效
    const menuLeft = useLeftMenuStore(pinia)
    const activeMenu: any = getParentNode(menusObj.menus, to.path)
    const activeLeftMenu: any = getNodeByMenuPath(menusObj.menus, to.path,'menuPath')
    if (activeMenu) {
        menusObj.$patch({topActive: `${activeMenu.id}`,leftActive: `${activeLeftMenu.id}`})
        menuLeft.$patch({ menus: activeMenu.children })
    }



    const token = getToken()
    if (noTokenPath.includes(to.path)) {
        next()
    } else if (token) {
        if (to.path === '/Login') {
            next()
        } else {

        }
        next();
    } else {
        next({ path: '/Login' })
    }

});
export default router;


