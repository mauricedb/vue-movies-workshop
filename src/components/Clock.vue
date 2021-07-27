<template>
  <span>{{ now }}</span>
</template>

<script>
export default {
  setup() {
    const now = new Date().toLocaleTimeString();

    return {
      now,
    };
  },
};
</script>
