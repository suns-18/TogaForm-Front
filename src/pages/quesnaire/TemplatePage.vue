<script setup lang="ts">
import {ref} from "vue";
import router from "../../ts/router.ts";

const questionList = ref([
    {
        id: "1",
        title: '这是问题',
        isRequired: true,
        selections: [
            {
                id: 'A',
                title: 'A. 钝角'
            }, {
                id: 'B',
                title: 'B. 钝角'
            }, {
                id: 'C',
                title: 'C. 钝角'
            }, {
                id: 'D',
                title: 'D. 钝角'
            }
        ], questionType: 1
    }, {
        id: "2",
        title: '这也是问题',
        isRequired: false,
        questionType: 2,
        selections: [
            {
                id: 'A',
                title: 'A. 钝角'
            }, {
                id: 'B',
                title: 'B. 钝角'
            }, {
                id: 'C',
                title: 'C. 钝角'
            }, {
                id: 'D',
                title: 'D. 钝角'
            }
        ]
    }, {
        id: "3",
        title: '请问你对3.8版本的活动游戏难度评价如何',
        isRequired: false,
        questionType: 3,
    }
])

const answers = ref(
    [
        {
            question: "3",
            answers: ""
        },
        {
            question: "2",
            answers: []
        },
    ]
)

const quesnaireInfo = ref({
    id: router.currentRoute.value.params['quesnaire_id'],
    title: '关于大学生对改革开放史了解情况的调查问卷'
})

const initComponent = () => {
    document.title =
        `${quesnaireInfo.value.title} - TogaForm`
}

initComponent()
</script>

<template>
    <v-container class="mt-6 bg-white w-66">
        <v-container>
            <h2 class="text-center text-wjx-blue-1">{{ quesnaireInfo.title }}</h2>
        </v-container>
        <v-container class="pa-0 ma-0">
            <template v-for="(item,index) in questionList">
                <v-container>
                    <p><span>{{ index + 1 }}. </span>
                        <span class="text-red-accent-2 font-weight-bold"
                              v-if="item.isRequired">*</span>
                        {{ item.title }}
                    </p>

                    <!-- 1. SingleSelection -->
                    <v-container v-if="item.questionType==1">
                        <v-radio-group inline class="pa-2 ma-2">
                            <template v-for="s in item.selections">
                                <v-radio :label="s.title"
                                         :value="s.id"
                                         class="pr-3 mr-3"
                                         color="info"
                                >
                                </v-radio>
                            </template>
                        </v-radio-group>
                    </v-container>

                    <!-- 2. MultiSelection -->
                    <v-container v-if="item.questionType==2">
                        <template v-for="s in item.selections">
                            <v-checkbox :label="s.title"
                                        :value="s.id"
                                        class="pr-3 mr-3"
                                        color="info"
                            >
                            </v-checkbox>
                        </template>
                    </v-container>

                    <!-- 3. Rich-text -->
                    <v-container v-if="item.questionType==3">
                        <v-textarea
                                no-resize
                                density="compact"
                                variant="outlined"
                        >
                        </v-textarea>
                    </v-container>
                </v-container>
            </template>
        </v-container>
    </v-container>
</template>

<style scoped>
</style>