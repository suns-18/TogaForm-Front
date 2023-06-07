// @ts-ignore
import {createRouter, createWebHistory} from "vue-router";

const routes = [
	{
		path: '/',
		component: () => import('../pages/Main.vue'),
		children: [{
			path: '/',
			component: () => import('../pages/mainframe/Home.vue'),
			alias: ['/main', '/index'],
			meta: {
				title: '主页 - TogaForm'
			}
		},{
			path: '/userManage',
			component: () => import('../pages/mainframe/UserManage.vue'),
			meta: {
				title: '用户管理 - TogaForm'
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
	}]

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