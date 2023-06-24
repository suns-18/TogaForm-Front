<script setup lang="ts">
import {ref} from "vue";
import {useUserStore} from "../ts/store/user-store.ts";
import pinia from "../ts/store.ts";
import naviMenu from "../ts/navi-menu.ts";
import {roleStr} from "../ts/model-util.ts";

// UserInfo
const userStore = useUserStore(pinia)

// Menu
const drawer =ref(true)
function itemVisible(itemRole: number, userRole: number) {
	return true
}

</script>

<template>
    <aside>
        <v-navigation-drawer
                app
                v-model="drawer"
        >
            <v-list>
                <v-list-item class="align-center text-center">
                    <v-list-item-title class="title text-center">
                            <img src="/img/Logo.svg" alt="Logo" width="128" height="64"/>
	                    <p class="font-weight-bold">在线问卷调查系统</p>
	                    <p>后台管理</p>
                    </v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item class="align-center text-center">
                    <v-list-item-title class="title text-center">
                        <span class="font-weight-bold">{{ userStore.user.username }}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-center">
                        {{ roleStr(userStore.user.role) }}
                    </v-list-item-subtitle>
                </v-list-item>
                <v-divider></v-divider>

                <v-list v-for="item in naviMenu" :key="item.title" class="text-left pb-0 pt-0">
                    <template v-if="itemVisible(item.role, item.role) && !item.subItems">
                        <v-list-item :to="item.path" class="align-center">
                            <v-row no-gutters class="align-center pb-0 pt-0">
                                <v-col md="auto" class="align-center pb-1 pt-1"><span :class="item.icon"></span></v-col>
                                <v-col class="text-center" lg="9">
                                    <v-list-item-title>{{item.title}}</v-list-item-title></v-col>
                            </v-row>
                        </v-list-item>
                        <v-divider></v-divider>
                    </template>
                    <template v-if="itemVisible(item.role,item.role) && item.subItems">
                        <v-list-group :value="item.title">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props">
                                    <v-row no-gutters class="align-center">
                                        <v-col md="auto"><span :class="item.icon"></span></v-col>
                                        <v-col class="text-right" lg="9"><v-list-item-title>{{item.title}}</v-list-item-title></v-col>
                                    </v-row>
                                </v-list-item>
                            </template>
                            <template v-for="sub in item.subItems" :key="sub.title">
                                <v-list-item :to="sub.path">
                                    <v-row class="align-center" no-gutters>
                                        <v-col md="auto"><span :class="sub.icon"></span></v-col>
                                        <v-col class="text-center" lg="9">
                                            <v-list-item-title>{{sub.title}}</v-list-item-title>
                                        </v-col>
                                    </v-row>
                                </v-list-item>
                            </template>

                        </v-list-group>
                        <v-divider></v-divider>
                    </template>
                </v-list>
            </v-list>
        </v-navigation-drawer>
    </aside>
    <v-app-bar id="header"
               class="bg-gray-1 text-center"
               dark>
        <v-row style="align-items: center">
            <v-col class="text-left" cols="2">
                <v-app-bar-nav-icon @click="drawer = !drawer" class="color-white"></v-app-bar-nav-icon>
            </v-col>
            <v-col>
                <v-breadcrumbs>导航菜单</v-breadcrumbs>
            </v-col>
            <v-col class="pa-0 ma-auto">
                <v-spacer></v-spacer>
            </v-col>
            <v-col class="text-right pa-0 ma-auto">
                <v-spacer></v-spacer>
            </v-col>
        </v-row>
    </v-app-bar>
	<v-main>
		<router-view></router-view>
        <v-footer class="bg-gray-1 d-flex flex-column">
            <v-container class="text-center align-center">
                <p>TogaForm联卷 在线问卷系统 E2023</p>
                <p>开源 · 共享 · 共赢 · 同乐</p>
                <br/>
                <p>18个太阳 工作室</p>
                <p>The18Suns Studio</p>
            </v-container>
        </v-footer>
	</v-main>
</template>

<style scoped>

</style>