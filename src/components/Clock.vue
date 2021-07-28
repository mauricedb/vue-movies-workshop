<template>
  <span>{{ time }}</span>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const time = computed(() => store.state.now.toLocaleTimeString());

    return {
      time,
    };
  },
};
</script>
