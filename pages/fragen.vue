<script lang="ts" setup>
const { showSidebar } = useToggleContent()

onMounted(() => {
  showSidebar.value = false
})
</script>

<template>
  <div>
    <h1 class="">Fragen</h1>
  </div>
</template>