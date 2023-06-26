import {defineStore} from "pinia";

export const useProjectStore
    = defineStore({

    id: 'project',
    state: () => {
        return {
            project: {},
            quesnaires: []
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage, paths: [
                    'project', 'quesnaires'
                ]
            }
        ]
    }
})