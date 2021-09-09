<template>
  <div>
    <label>
      <span class="input-label">{{ label }}</span>
      <input
        type="text"
        class="form-control"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      />
    </label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  emits: ["update:modelValue"],
  props: ["label", "modelValue"],
};
</script>

<style scoped>
.input-label {
  display: inline-block;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.form-control {
  width: 100%;
}
</style>
