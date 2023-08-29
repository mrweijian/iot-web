import {createRouter, createWebHashHistory} from "vue-router";
import {getToken} from "../utils/comm";


const routes = [
    {path: "/", redirect:"/Login"},
    {path: "/Login", component: import('../views/login/Login.vue')},
    {
        path: "/Home", component: import('../views/home/Home.vue'),
        children: [
            {
                path: "/User", component: import('../views/home/User.vue'),
            },
            {
                path: "/Role", component: import('../views/home/Role.vue'),
            },
            {
                path: "/Menu", component: import('../views/home/Menu.vue'),
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
        next({path: '/Login'})
    }

});
export default router;


