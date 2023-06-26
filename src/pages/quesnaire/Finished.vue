<script setup lang="ts">
import router from "../../ts/router.ts";

const exit = async () => {
    await router.push('/logout')
}
</script>

<template>
    <v-container class="align-center text-center align-content-center">
        <v-row>
            <v-col><v-spacer></v-spacer></v-col>
            <v-col>
                <v-card width="500" class="align-center mt-10">
                    <h1 class="text-center pt-5 text-wjx-blue-1">感谢您的作答</h1>
                    <br v-for="i in 6"/>
                    <a class="text-red-accent-2 mb-10" @click="exit" href="">退出登录</a>
                    <br v-for="i in 2"/>
                </v-card>
            </v-col>
            <v-col><v-spacer></v-spacer></v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

</style>