import {createPinia} from 'pinia'
// @ts-ignore
import piniaPluginPersist from "pinia-plugin-persist";

const pinia = createPinia()

pinia.use(piniaPluginPersist)
export default pinia

export * from './store/user-store'
export * from './store/project-store.ts'