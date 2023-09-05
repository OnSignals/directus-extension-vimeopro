<template>
  <div>
    <p>{{ value }}</p>
    <v-input :model-value="value" @update:model-value="handleUpdate" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const { value } = defineProps({ value: { type: String } });
const emit = defineEmits({ input: null });

function handleUpdate(v) {
  console.log(v);

  emit("input", v);
}

onMounted(() => {});
</script>
