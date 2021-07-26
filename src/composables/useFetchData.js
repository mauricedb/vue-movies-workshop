import { ref, onMounted, watch } from "vue";

export default function useFetchData(url) {
  const error = ref(null);
  const loading = ref(true);
  const data = ref(null);

  async function fetchData() {
    try {
      const rsp = await fetch(url.value);

      if (rsp.ok) {
        data.value = await rsp.json();
      } else {
        error.value = rsp.statusText ?? "Failed to load data";
      }
    } catch (error) {
      error.value = error?.message ?? "Failed to load data";
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => fetchData());

  watch(url, () => fetchData());

  return { error, loading, data, fetchData };
}
