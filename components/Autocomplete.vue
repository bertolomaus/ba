<script lang="ts" setup>
interface Props {
  suggestions: string[]
}
const props = defineProps<Props>()
const inputValue = ref<string>('')
const activeSuggestionIndex = ref<number>(-1)
const filteredSuggestions = computed(() => {
  if (inputValue.value === '') return []
  return props.suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(inputValue.value.toLowerCase())
  )
})
const emit = defineEmits({
  submitInput: (payload: {payload: string}) => true
})

const onInput = () => {
  activeSuggestionIndex.value = -1
};

const nextSuggestion = () => {
  if (activeSuggestionIndex.value < filteredSuggestions.value.length - 1) {
    activeSuggestionIndex.value++
  } else if (activeSuggestionIndex.value == filteredSuggestions.value.length - 1){
    activeSuggestionIndex.value = 0
  }
}

const prevSuggestion = () => {
  if (activeSuggestionIndex.value > 0) {
    activeSuggestionIndex.value--
  }
}

const onEnter = () => {
  if (activeSuggestionIndex.value >= 0 && filteredSuggestions.value.length > 0) {
    selectSuggestion(activeSuggestionIndex.value)
  }
  if (inputValue.value.length > 0){
    emit('submitInput', {payload: inputValue.value})
    inputValue.value = ''
  }
}

const selectSuggestion = (index: number) => {
  inputValue.value = filteredSuggestions.value[index]
  activeSuggestionIndex.value = -1
}
</script>

<template>
  <div class="autocomplete">
    <input
      type="text"
      v-model="inputValue"
      @input="onInput"
      @keydown.down.prevent="nextSuggestion"
      @keydown.tab.prevent="nextSuggestion"
      @keydown.up.prevent="prevSuggestion"
      @keydown.enter.prevent="onEnter"
      ref="inputField"
    />
    <ul v-if="filteredSuggestions.length > 0" class="suggestions-list">
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        :class="{ active: index === activeSuggestionIndex }"
        @mousedown.prevent="selectSuggestion(index)"
      >
        {{ suggestion }}
      </li>
    </ul>

  </div>
</template>