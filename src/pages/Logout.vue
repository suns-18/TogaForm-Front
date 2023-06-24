<script setup lang="ts">
import axios from "../ts/axios";
import router from "../ts/router";
import {useUserStore} from "../ts/store/user-store.ts";
import pinia from "../ts/store.ts";

const userStore = useUserStore(pinia)
const initComponent = async () => {
    try {
        let res = await axios.post(`/user/logout/`)
    } finally {
        userStore.user = {}
        userStore.isLogin = false
        await router.push('/login')
    }
}

initComponent()
</script>

<template>

</template>

<style scoped>

</style>