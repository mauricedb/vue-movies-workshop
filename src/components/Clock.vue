<template>
  <span>{{ now.toLocaleTimeString() }}</span>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const now = ref(new Date());

    setInterval(() => {
      now.value = new Date();
    }, 1000);

    return {
      now,
    };
  },
};
</script>
