<template>
  <span>{{ time }}</span>
</template>

<script>
import { ref, computed, onUnmounted } from "vue";

export default {
  setup() {
    const now = ref(new Date());

    const handle = setInterval(() => {
      now.value = new Date();
    }, 1000);

    onUnmounted(() => {
      clearInterval(handle);
    });

    const time = computed(() => now.value.toLocaleTimeString());

    return {
      now,
      time,
    };
  },
};
</script>
