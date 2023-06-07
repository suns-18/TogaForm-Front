<script setup lang="ts">

import {localTime, statusColor, statusText, User} from "../../ts/model.ts";
import axios from "../../ts/axios.ts"
import {reactive, ref} from "vue";
import {errMsg, MsgProp} from "../../ts/snacker-alert.ts";
// List
const viewList = ref<User[]>()

// Paging-relative
const PAGE_COUNT = 10;
const pageCount = ref(0)
const currentPage = ref(1)

// Message
const msgProp = reactive<MsgProp>({color: "", content: "", show: false})
const getList = async (page: number = 1) => {
	let res = await axios.get(`/user/queryList`)

	if (res.data["code"] == "0") {
		errMsg(msgProp, res.data["message"])
		return
	}

	let resultList = res.data["data"]
	viewList.value =
		resultList.slice((page - 1) * PAGE_COUNT, page * PAGE_COUNT)

	pageCount.value = Math.ceil(resultList.length / PAGE_COUNT)
}

const initComponent = async () => {
	await getList()
}
initComponent()
</script>

<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h5">用户管理</v-card-title>
            <v-card-text>
                <v-row class="ma-0 pa-0">
                    <v-col cols="2" class="text-center align-center mt-2">
                        <v-label class="text-center align-center">搜索用户：</v-label>
                    </v-col>
                    <v-col class="ma-2 pa-0">
                        <v-select
                                density="compact"
                                variant="outlined"
                                label="字段">
                        </v-select>
                    </v-col>
                    <v-col class="ma-2 pa-0">
                        <v-text-field
                                variant="underlined"
                                density="compact"
                                label="关键词"
                                append-inner-icon="mdi-magnify"></v-text-field>
                    </v-col>
                    <v-col class="pa-1">
                        <v-spacer></v-spacer>
                    </v-col>
                    <v-col class="pa-1">
                        <v-btn class="bg-success ma-1" block @click="viewInsert">添加用户...</v-btn>
                    </v-col>
                </v-row>
                <v-table v-if="true">
                    <thead class="text-center">
                    <tr class="text-center">
                        <th class="text-center">序号</th>
                        <th class="text-center">登录名</th>
                        <th class="text-center">状态</th>
                        <th class="text-center">启用时间</th>
                        <th class="text-center">停止时间</th>
                        <th class="text-center">操作</th>
                    </tr>
                    </thead>
                    <tbody class="text-center">
                    <tr v-for="(item, index) in viewList" :key="item.id">
                        <td>{{ index+1 }}</td>
                        <td>{{ item.username }}</td>
                        <td>
                            <v-chip :color="statusColor(item.status)">{{ statusText(item.status) }}</v-chip>
                        </td>
                        <td>{{localTime(item.startTime) }}</td>
                        <td>{{ localTime(item.stopTime) }}</td>
                        <td>
                            <v-btn-group>
                                <v-btn @click="">查看详情</v-btn>
                                <v-btn @click="">编辑</v-btn>
                                <v-btn @click="">删除</v-btn>
                            </v-btn-group>
                        </td>
                    </tr>
                    </tbody>
                </v-table>
                <v-container class="text-center" v-else>
                    <br/><br/><br/>
                    <h2 class="mb-2">找不到符合条件的用户</h2>
                    <br/><br/><br/>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>

</style>