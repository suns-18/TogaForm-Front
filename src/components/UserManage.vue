<script setup lang="ts">

import {PAGE_LIMIT,UserList} from "../ts/model.ts";
import {localTime , roleColor, roleStr} from "../ts/model-util.ts";
import axios from "../ts/axios.ts"
import {reactive, ref} from "vue";
import {errMsg, MsgProp, TIMEOUT} from "../ts/snacker-alert.ts";
import router from "../ts/router.ts";

// ComponentProp
const props = defineProps(['status'])

// List
const viewList = ref<UserList>({currentPage: 0, data: [], totalPage: 0})
const emptyStr = ref("找不到符合条件的用户")


// Message
const msgProp = reactive<MsgProp>({color: "", content: "", show: false})

// Dialog
const diaDetailShow = ref(false)

const getList = async (page: number = 1) => {
    try {
        let res = await axios.post(`/user/queryList`, {
            start: (page - 1) * 10,
            limit: PAGE_LIMIT,
            status: props.status
        })

        if (res.data["code"] == 0) {
            errMsg(msgProp, res.data["message"])
            return
        }

        viewList.value.data = res.data["data"]
        viewList.value.totalPage = res.data["totalPage"]
        viewList.value.currentPage = res.data["currentPage"]
    } catch (e) {
        errMsg(msgProp, "服务器访问错误")
        emptyStr.value = "服务器访问错误"
    }
}

const initComponent = async () => {
    await getList()
}

const showDetail = async () => {
    diaDetailShow.value = true
}

initComponent()
</script>

<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h5 text-center">用户管理</v-card-title>
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
                <v-container v-if="viewList.data.length>0">
                    <v-table>
                        <thead class="text-center">
                        <tr class="text-center">
                            <th class="text-center">序号</th>
                            <th class="text-center">登录名</th>
                            <th class="text-center">启用时间</th>
                            <th class="text-center">停止时间</th>
                            <th class="text-center">权限</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody class="text-center">
                        <tr v-for="(item, index) in viewList.data" :key="item.id">
                            <td>{{ index + 1 + (viewList.currentPage - 1) * PAGE_LIMIT }}</td>
                            <td>{{ item.username }}</td>
                            <td>{{ localTime(item.startTime) }}</td>
                            <td>{{ localTime(item.stopTime) }}</td>
                            <td><v-chip :color="roleColor(item.role)">
                                {{ roleStr(item.role) }}</v-chip></td>
                            <td>
                                <v-btn-group>
                                    <v-btn @click="showDetail">查看详情</v-btn>
                                    <v-btn @click="">编辑</v-btn>
                                    <v-btn @click="">关闭</v-btn>
                                    <v-btn @click="">删除</v-btn>
                                </v-btn-group>
                            </td>
                        </tr>
                        </tbody>
                    </v-table>
                    <v-container>
                        <v-pagination v-if="viewList.totalPage>1"
                                      :length="viewList.totalPage"
                                      :total-visible="7"
                                      class="align-center"
                                      v-model="viewList.currentPage"
                                      @update:model-value="getList(viewList.currentPage)"
                        >
                        </v-pagination>
                    </v-container>
                </v-container>
                <v-container class="text-center" v-else>
                    <br/><br/><br/>
                    <h2 class="mb-2">{{ emptyStr }}</h2>
                    <br/><br/><br/>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>

    <v-dialog v-model="diaDetailShow" max-width="50%">
        <v-card>
            <v-container>
                <h1>用户详情</h1>

            </v-container>
            <v-card-actions>
                <v-btn block class="bg-red-accent-3" @click="diaDetailShow=false">关闭</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-snackbar
            v-model="msgProp.show"
            :timeout="TIMEOUT"
            :color="msgProp.color"
    >
        {{ msgProp.content }}
    </v-snackbar>
</template>

<style scoped>

</style>