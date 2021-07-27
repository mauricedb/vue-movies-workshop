<template>
  <span>{{ time }}</span>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const now = ref(new Date());

    setInterval(() => {
      now.value = new Date();
    }, 1000);

    const time = computed(() => now.value.toLocaleTimeString());

    return {
      now,
      time,
    };
  },
};
</script>
