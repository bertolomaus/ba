<script lang="ts" setup>
const intro = ['Weißwurscht', 'Maßkruag', 'Saupreiß']
const rndIntro = ref<string>(intro[Math.floor(Math.random() * intro.length)])
const props = defineProps({paragraphs: Number})
</script>

<template>
  <p>
    Bavaria ipsum dolor sit {{ rndIntro }}. Hoid moand hogg ma uns zamm pfenning guat Hetschapfah Freibia soi scheans, Foidweg umma damischa. Auf gehds beim Schichtl. Boarischer Landla Enzian des is schee Gaudi. G'hupft wia gsprunga um Godds wujn, glei fangst a boa, Sagglzemend noama!
  </p>
  <p v-if="props.paragraphs && props.paragraphs > 1">
    Schdarmbeaga See af Auffisteign a fescha Bua mei, mogsd a Bussal moand glei. Nois Sepp mei i hob di liab, Schaung kost nix do legst di nieda. Schuabladdla Sauwedda g'hupft wia gsprunga. Ja wo samma denn i hob di liab Biaschlegl. Mogsd a Bussal und fensdaln imma Steckerleis Lewakaas.
  </p>
  <p v-if="props.paragraphs && props.paragraphs > 2">
    rotzeit zünftig a ganze Hoiwe Greichats Schuabladdla Marei Kuaschwanz, fias kimmt Bladl! Da Kini mogsd a Bussal resch barfuaßat eana lem und fensdaln, vui pfundig mim. Heitzdog Landla hod da wia woaß gscheckate hogg ma uns zamm Haberertanz oba. Kruzifix noamoi, Sautreiba, Hallodri!
  </p>
</template>