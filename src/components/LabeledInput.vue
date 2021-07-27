<template>
  <div>
    <label class="input-label" :for="$attrs.id">
      {{ label }}
      <slot />
    </label>
    <input
      type="text"
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <slot name="below" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["label", "modelValue"],
  emits: ["update:modelValue"],
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
