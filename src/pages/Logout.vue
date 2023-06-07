<script setup lang="ts">
const initComponent = async ()=>{
	let res = await axios.post(`/api/user/logout/`)
	//Clear pinia
	await router.push('/login')
}
</script>

<template>

</template>

<style scoped>

</style>