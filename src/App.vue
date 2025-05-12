<template>
  <v-app>
    <v-main>
      <div class="d-flex">
        <v-select
          class="ml-4 mr-2"
          label="type de choix"
          :items="['unique', 'multiple']"
          v-model="modeChoixUO"
        ></v-select>
        <v-select
          class="ml-2 mr-4"
          label="Avec unités externes à la Ville de Lausanne"
          :items="[
            { title: 'Oui', value: true },
            { title: 'Non', value: false }
          ]"
          v-model="bUniteHorsVdL"
        ></v-select>
      </div>
      <div class="d-flex justify-center align-center">
        <v-btn
            rounded="lg"
            @click="choixUO = !choixUO"
            class="text-none text-subtitle-1 text-medium-emphasis"
        >Choix UO</v-btn>
      </div>
      <div v-if="choixUO">
        <Suspense>
          <UniteOrgChoix
            :modeChoix="modeChoixUO" 
            :uniteHorsVdL="bUniteHorsVdL"
            @choixUniteOrg="receptionUniteOrg"
          ></UniteOrgChoix>
        </Suspense>
      </div>
   </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import UniteOrgChoix from '@/components/UniteOrgChoix.vue'
  const choixUO = ref<boolean>(false)
  const modeChoixUO = ref<string>('unique')
  const bUniteHorsVdL = ref<boolean>(false)

  const receptionUniteOrg = (jsonData: string) => {
    choixUO.value = false
    console.log(`Réception unité organisationnelle \njson: ${jsonData}`)
  }

  watch(modeChoixUO, (newValue) => {
    console.log(`Mode de choix changé : ${newValue}`)
  })
</script>
