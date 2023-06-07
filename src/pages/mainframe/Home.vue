<script setup lang="ts">

</script>

<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h5">问卷列表</v-card-title>
            <v-card-text>
                <v-table v-if="false"></v-table>
                <v-container class="text-center" v-else>
                    <h2 class="mb-2">创建问卷只需三步</h2>
                    <br/><br/><br/>
                    <h3 class="text-grey">您还没有创建问卷，点击此处创建您的第一个问卷
                    </h3><br/><br/>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>

</style>