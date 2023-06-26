<script setup lang="ts">

import {ROW_CARD_LIMIT, PAGE_LIMIT, Project, TemplateList, COL_CARD_LIMIT, Template}
    from "../../ts/model.ts";
import axios from "../../ts/axios.ts"
import {reactive, ref} from "vue";
import {errMsg, MsgProp, TIMEOUT} from "../../ts/snacker-alert.ts";
import {useUserStore} from "../../ts/store/user-store.ts";
import pinia from "../../ts/store.ts";
import {getUserById} from "../../ts/model-api.ts";
import {
    expireColor,
    expireStr,
    localTime,
    questionTypeColor,
    questionTypeStr,
    randomColor
} from "../../ts/model-util.ts";

// UserStore
const userStore = useUserStore(pinia)

// List
const viewList = ref<TemplateList>({currentPage: 0, data: [], totalPage: 0})
const emptyStr = ref("找不到符合条件的模板")
const keyword = ref("")

// Message
const msgProp = reactive<MsgProp>({color: "", content: "", show: false})

// Dialog
const diaDetailShow = ref(false)
const templateModel = ref<Template>()

const getList = async (page: number = 1) => {
    try {
        let res = await axios.post(`/template/queryList`, {
            page: page,
            size: ROW_CARD_LIMIT * COL_CARD_LIMIT,
            title: keyword.value ? keyword.value : ""
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
    templateModel.value = item;
}

initComponent()
</script>

<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h5 text-center">模板管理</v-card-title>
            <v-card-text>
                <v-row class="ma-0 pa-0">
                    <v-col cols="2" class="text-center align-center mt-2">
                        <v-label class="text-center align-center">搜索模板：</v-label>
                    </v-col>
                    <v-col class="ma-2 pa-0" v-if="0">
                        <v-select
                                density="compact"
                                variant="outlined"
                                label="字段" >
                        </v-select>
                    </v-col>
                    <v-col class="ma-2 pa-0">
                        <v-text-field
                                variant="underlined"
                                density="compact"
                                label="模板名称"
                                v-model="keyword"
                                @click:append-inner="getList()"
                                clearable="clearable"
                                append-inner-icon="mdi-magnify"></v-text-field>
                    </v-col>
                    <v-col class="pa-1">
                        <v-spacer></v-spacer>
                    </v-col>
                    <v-col class="pa-1">
                        <v-btn class="bg-success ma-1"
                               block @click="viewInsert">新建模板...
                        </v-btn>
                    </v-col>
                </v-row>
                <v-container v-if="viewList.data.length>0" fluid>
                    <v-row v-for="i in Math.ceil(viewList.data.length
                    / ROW_CARD_LIMIT)" dense>
                        <v-col v-for="j in (COL_CARD_LIMIT>viewList.data.length?viewList.data.length:ROW_CARD_LIMIT)"
                               class="pa-1"
                        >
                            <v-container
                                    fluid
                                    class="pa-0"
                                    v-if="viewList.data[(j-1)+(i-1)*COL_CARD_LIMIT]">
                                <v-card class="pa-0 mx-auto"
                                        :color="randomColor()"
                                        height="100%"
                                >
                                    <v-card-title class="text-wrap">
                                        <h4>{{
                                            viewList.data[(j - 1) + (i - 1) * COL_CARD_LIMIT]
                                                .title
                                            }}</h4>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container
                                                class="text-wrap"
                                                v-text="viewList
                                            .data[(j-1)+(i-1)*COL_CARD_LIMIT]
                                            .description">
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-container class="pa-0">
                                            <v-btn-group variant="text">
                                                <v-btn @click="showDetail(viewList
                                            .data[(j-1)+(i-1)*COL_CARD_LIMIT])">
                                                    查看详情
                                                </v-btn>
                                                <v-btn>
                                                    用模板新建
                                                </v-btn>
                                            </v-btn-group>
                                        </v-container>
                                    </v-card-actions>
                                </v-card>
                            </v-container>
                        </v-col>
                    </v-row>
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
                <h1>模板详情</h1>
                <v-table density="compact">
                    <tbody>
                    <tr>
                        <td>模板名称</td>
                        <td>{{ templateModel.title }}</td>
                    </tr>
                    <tr>
                        <td>创建时间</td>
                        <td>{{ localTime(templateModel.createTime) }}</td>
                    </tr>
                    <tr>
                        <td>描述</td>
                        <td>{{ templateModel.description }}</td>
                    </tr>
                    </tbody>
                </v-table>
                <v-expansion-panels flat v-if="templateModel.questions.length>0">
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            查看题目
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <v-container>
                                <v-card>
                                    <v-list>
                                        <v-list-item>
                                            <v-row>
                                                <v-col>
                                                    <v-container fluid
                                                                 class="text-left align-content-center align-center">
                                                        题形
                                                    </v-container>
                                                </v-col>
                                                <v-col class="text-left align-content-center align-center pt-3">
                                                    <v-container class="text-left align-content-center align-center">
                                                        标题
                                                    </v-container>
                                                </v-col>
                                                <v-col>
                                                    <v-container>
                                                        选项
                                                    </v-container>
                                                </v-col>
                                            </v-row>
                                            <hr/>
                                        </v-list-item>
                                        <v-list-item
                                                v-for="(question,index) in templateModel.questions">
                                            <v-row>
                                                <v-col>
                                                    <v-container fluid
                                                                 class="text-left align-content-center align-center">
                                                        <v-chip :color="questionTypeColor(question.answerType)">
                                                            {{ questionTypeStr(question.answerType) }}
                                                        </v-chip>
                                                    </v-container>
                                                </v-col>
                                                <v-col class="text-left align-content-center align-center pt-3">
                                                    <v-container class="text-left align-content-center align-center">
                                                        <p>{{ index + 1 }}. {{ question.title }}
                                                            <v-chip
                                                                    v-if="question.required"
                                                                    color="red-accent-4">
                                                                必填
                                                            </v-chip>
                                                        </p>
                                                    </v-container>
                                                </v-col>
                                                <v-col>
                                                    <v-container
                                                            v-if="question.answerType==3"
                                                            class="text-wrap">
                                                        {{ question.description }}
                                                    </v-container>
                                                    <v-container v-else-if="question.answerType<3"
                                                                 class="pa-0 text-left bg-grey-lighten-4">
                                                        <v-chip color="blue-lighten-1"
                                                                class="ma-1"
                                                                v-for="sel in question.answerSelections">
                                                            {{ sel.key }}. {{ sel.value }}
                                                        </v-chip>
                                                        <br/>
                                                        <p class="text-wrap">
                                                            {{ question.description }}
                                                        </p>
                                                    </v-container>
                                                </v-col>
                                            </v-row>
                                            <hr/>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-container>
                        </v-expansion-panel-text>

                    </v-expansion-panel>
                </v-expansion-panels>
                <v-container v-else>
                    <h3 class="text-red-darken-3 text-center">
                        空模板
                    </h3>
                </v-container>
            </v-container>
            <v-card-actions>
                <v-btn block class="bg-red-accent-3"
                       @click="diaDetailShow = false">关闭
                </v-btn>
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