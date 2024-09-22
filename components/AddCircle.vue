<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}
const props = defineProps<Props>()
</script>
<template>
  <svg viewBox="0 0 20 20" class="add-circle transition-transform" :class="{'rotate-90': isOpen}">
    <rect width="10" height="2" x="5" y="9" :class="{'rotate-90': isOpen}" class="transition-transform origin-center" />
    <rect width="2" height="10" x="9" y="5" />
    <circle r="9" cx="10" cy="10" fill="none" stroke="currentColor" stroke-width="2"></circle>
  </svg>
</template>