// @ts-ignore
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/admin',
        component: () => import('../pages/AdminMain.vue'),
        children: [{
            path: '/admin',
            component: () => import('../pages/admin/Home.vue'),
            meta: {
                title: '后台主页 - TogaForm'
            }
        }, {
            path: '/manage/user/closed',
            component: () => import('../pages/admin/ClosedUserManage.vue'),
            meta: {
                title: '已关闭用户管理 - TogaForm'
            }
        }, {
            path: '/manage/user',
            component: () => import('../pages/admin/OpenUserManage.vue'),
            meta: {
                title: '正常用户管理 - TogaForm'
            }
        }, {
            path: '/manage/project',
            component: () => import('../pages/admin/ProjectManage.vue'),
            meta: {
                title: '项目管理 - TogaForm'
            }
        }]
    }, {
        path: '/login',
        component: () => import('../pages/Login.vue'),
        meta: {
            title: '登陆 - TogaForm'
        }
    }, {
        path: '/logout',
        component: () => import('../pages/Logout.vue'),
        meta: {
            title: '登陆 - TogaForm'
        }
    }, {
        path: '/quesnaire',
        component: () => import('../pages/QuesnaireMain.vue'),
        children: [{
            path: '/quesnaire/:quesnaire_id',
            component: () => import('../pages/quesnaire/TemplatePage.vue'),
        },{
            path: '/home',
            component: () => import('../pages/quesnaire/Home.vue'),
            meta: {
                title: '主页 - TogaForm在线问卷系统'
            }
        }]
    }
]

let router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// @ts-ignore
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        // @ts-ignore
        document.title = to.meta.title
    }
    next()

})

export default router