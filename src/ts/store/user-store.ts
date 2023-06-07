import {defineStore} from "pinia";

export const useUserStore
	= defineStore({

	id: 'user',
	state: () => {
		return {
			isLogin: true,
			user: {

			}
		}
	},
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage, paths: [
					'isLogin', 'user'
				]
			}
		]
	}
})