<script setup lang="ts">

import {PAGE_LIMIT, Project, ProjectQuesnaireList}
    from "../../ts/model.ts";
import axios from "../../ts/axios.ts"
import {reactive, ref} from "vue";
import {errMsg, MsgProp, TIMEOUT} from "../../ts/snacker-alert.ts";
import {useUserStore} from "../../ts/store/user-store.ts";
import pinia from "../../ts/store.ts";
import {getUserById} from "../../ts/model-api.ts";
import {expire, expireColor, expireStr, localTime} from "../../ts/model-util.ts";

// UserStore
const userStore = useUserStore(pinia)

// List
const viewList = ref<ProjectQuesnaireList>({currentPage: 0, data: [], totalPage: 0})
const emptyStr = ref("找不到符合条件的用户")


// Message
const msgProp = reactive<MsgProp>({color: "", content: "", show: false})

// Dialog
const diaDetailShow = ref(false)
const projectModel = ref<Project>()
const createdBy = ref<string>("")
const lastUpdatedBy = ref<string>("")

const getList = async (page: number = 1) => {
    try {
        let res = await axios.post(`/project/queryList`, {
            start: (page - 1) * PAGE_LIMIT,
            limit: PAGE_LIMIT,
            createdBy: userStore.user.id
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

const showDetail = async (item) => {
    diaDetailShow.value = true
    projectModel.value = item;

    let createdByUser = getUserById(item.createdBy)
    let lastUpdatedByUser = getUserById(item.lastUpdatedBy)

    createdBy.value = createdByUser.username
    lastUpdatedBy.value = lastUpdatedByUser.username
}

initComponent()
</script>

<template>
    <v-container>
    <v-card>
        <v-card-title class="text-h5 text-center">项目管理</v-card-title>
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
                    <v-btn class="bg-success ma-1"
                           block @click="viewInsert">新建项目...
                    </v-btn>
                </v-col>
            </v-row>
            <v-container v-if="viewList.data.length>0">
                <v-expansion-panels v-for="item in viewList.data" flat>
                    <v-expansion-panel class="mt-2" variant="accordion">
                        <v-expansion-panel-title>
                            {{ item.project.projectName }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-container class="align-center" fluid="">
                                <v-row class="align-center">
                                    <v-col>
                                        <v-btn-group variant="outlined">
                                            <v-btn>修改项目</v-btn>
                                            <v-btn>删除项目</v-btn>
                                            <v-btn @click="showDetail(item.project)">查看详情</v-btn>
                                        </v-btn-group>
                                    </v-col>

                                    <v-col class="align-center text-center">
                                        <v-chip
                                                :color="item.quesnaires.length>0?'info':'black'"
                                                class="align-center">
                                            问卷数量：{{ item.quesnaires.length }}
                                        </v-chip>
                                    </v-col>
                                    <v-col class="align-center">
                                        <v-container>
                                            <v-switch label="显示已过期"
                                                      class="align-center"
                                                      color="info"
                                                      density="compact"
                                                      hide-details>
                                            </v-switch>
                                        </v-container>
                                    </v-col>
                                    <v-col class="align-center">
                                        <v-chip class="align-center">
                                            创建日期：{{ localTime(item.project.creationDate) }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-card v-if="item.quesnaires.length>0">
                                <v-list>
                                    <v-list-item v-for="quesnaire in item.quesnaires">
                                        <v-row>
                                            <v-col class="align-center pa-0 ma-0">
                                                <v-container class="mt-1">
                                                    <v-chip
                                                        color="info">
                                                        {{ quesnaire.surveyType }}
                                                    </v-chip>
                                                </v-container>
                                            </v-col>
                                            <v-col class="align-center pa-0 ma-0" cols="3">
                                                <v-container class="mt-2">
                                                    <p>{{ quesnaire.title }}</p>
                                                </v-container>
                                            </v-col>
                                            <v-col>
                                                <v-spacer></v-spacer>
                                            </v-col>
                                            <v-col class="align-center pa-0 ma-0">
                                                <v-container class="mt-1">
                                                    <v-chip
                                                            :color="expireColor(quesnaire.startTime,quesnaire.endTime)">
                                                        {{ expireStr(quesnaire.startTime, quesnaire.endTime) }}
                                                    </v-chip>
                                                </v-container>
                                            </v-col>
                                            <v-col class="align-center pa-0 ma-0">
                                                <v-container class="mt-1">
                                                    <v-chip color="orange-accent-4">
                                                        {{ localTime(quesnaire.endTime) }}结束
                                                    </v-chip>
                                                </v-container>
                                            </v-col>
                                            <v-col class="align-center">
                                                <v-btn-group variant="flat">
                                                    <v-btn>
                                                        查看预览
                                                    </v-btn>
                                                    <v-btn>
                                                        查看详情
                                                    </v-btn>
                                                    <v-btn>
                                                        查看统计
                                                    </v-btn>
                                                </v-btn-group>
                                            </v-col>
                                        </v-row>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                            <v-container v-else>
                                <h3 class="text-red-accent-3 text-center">
                                    问卷不存在或已过期
                                </h3>
                            </v-container>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
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
                <h1>问卷详情</h1>
                <v-table density="compact">
                    <tbody>
                    <tr>
                        <td>创建人</td>
                        <td v-if="createdBy">{{ createdBy }}</td>
                    </tr>
                    <tr>
                        <td>创建时间</td>
                        <td>{{ localTime(projectModel.creationDate) }}</td>
                    </tr>
                    <tr>
                        <td>最近一次修改日期</td>
                        <td>{{ localTime(projectModel.lastUpdateDate) }}</td>
                    </tr>
                    <tr>
                        <td>最近一次修改操作人</td>
                        <td>{{ lastUpdatedBy }}</td>
                    </tr>
                    </tbody>
                </v-table>
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