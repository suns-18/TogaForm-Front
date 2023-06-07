<script setup lang="ts">
import {reactive, ref} from "vue";
import axios from "../ts/axios"

import pinia from "../ts/store.ts"
import {useUserStore} from "../ts/store.ts";
import router from "../ts/router.ts";
import {errMsg, MsgProp, TIMEOUT} from "../ts/snacker-alert.ts";

const userName = ref("")
const userNameRules = ref([
    v => !!v || '用户号码是必填项',
])
const password = ref("")
const passwordRules = ref([
    v => !!v || '密码是必填项',
    v => (v && v.length >= 2) || '密码长度至少为2个字符',
])
const valid = ref(false)

const msgProp = reactive<MsgProp>({color: "", content: "", show: false})

const userStore = useUserStore(pinia)
const doLogin = async () => {
    let res = await axios.post('/user/login',{
        username: userName.value,
        password: password.value //需要加密！！！
    })

    if(res.data["code"]=="0"){
        errMsg(msgProp, res.data["message"])
        return
    }

    userStore.user = res.data.data
    userStore.isLogin = true

    await router.push("/")
}
</script>

<template>
    <div id="page">
        <v-container class="position-absolute" fluid id="login-box">
            <v-card class="elevation-12" id="login-card">
                <v-card-text>
                    <v-row>
                        <v-col>
                            <img>
                            <v-container class="text-center">
                                <img src="/img/Logo.svg" alt="Logo" width="128" height="64"/>
                            </v-container>
                            <h2 class="text-center text-basic-1 pb-3">在线问卷系统</h2>
                            <h3 class="text-center text-basic-1">登陆</h3>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-form ref="form" v-model="valid">

                                <v-text-field
                                        v-model="userName"
                                        :rules="userNameRules"
                                        label="用户名"
                                        required
                                        clearable
                                        prepend-icon="mdi-account-circle"
                                ></v-text-field>
                                <v-text-field
                                        v-model="password"
                                        :rules="passwordRules"
                                        label="密码"
                                        type="password"
                                        required
                                        clearable
                                        prepend-icon="mdi-lock"
                                ></v-text-field>
                            </v-form>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-center">
                            <v-btn @click="doLogin"
                                   :disabled="!valid"
                                   class="bg-royalblue"
                                   block
                                   height="50px"
                            >登陆
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-container>
    </div>

    <v-snackbar
            v-model="msgProp.show"
            :timeout="TIMEOUT"
            :color="msgProp.color"
    >
        {{ msgProp.content }}
    </v-snackbar>
</template>

<style scoped>
#page {
    background: url("/img/background.png");
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
}

#login-box {
    margin-top: 8%;
    padding: 5px;
    display: flex;
    justify-content: center;
}

#login-card {
    width: 600px;
    max-width: 600px;
}
</style>