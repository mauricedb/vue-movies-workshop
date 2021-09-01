<template>
  <span>{{ time }}</span>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Store } from "../store";

export default {
  setup() {
    const store = useStore<Store>();
    const time = computed(() => store.state.now.toLocaleTimeString());

    return {
      time,
    };
  },
};
</script>
