<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>
    <form v-else @submit.prevent="submitForm" @reset="resetForm" novalidate>
      <fieldset class="fieldset" :disabled="saving">
        <LabeledInput v-model="movie.title">
          <b>Title</b>
          <template v-slot:below v-if="!movie.title">
            <div class="warning">The movie title is required</div>
          </template>
        </LabeledInput>
        <div>
          <label>
            <span class="input-label"><b>Overview</b></span>
            <textarea v-model="movie.overview" rows="5" class="form-control" />
          </label>
        </div>
        <LabeledInput
          label="Vote average"
          v-model.number="movie.vote_average"
          type="number"
        />
        <LabeledInput
          label="Release date"
          v-model="movie.release_date"
          type="date"
        />

        <div class="button-row">
          <button type="submit">Save</button>
          <button type="reset">Reset</button>
        </div>
        <!-- <pre>{{ JSON.stringify(movie, null, 2) }}</pre> -->
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useFetchData from "../composables/useFetchData";

import LabeledInput from "../components/LabeledInput.vue";

export default {
  components: { LabeledInput },
  props: {
    id: { type: [Number, String], required: true },
    type: { type: String, required: true },
  },
  setup(props: any) {
    const router = useRouter();

    const saving = ref(false);

    const uriTypeFragment = computed(() =>
      props.type === "popular" ? "popular-movies" : "top-rated-movies"
    );

    const movieUrl = computed(
      () =>
        `${process.env.VUE_APP_API_ORIGIN}/${uriTypeFragment.value}/${props.id}`
    );

    const {
      error,
      loading,
      data: movie,
      fetchData: fetchMovie,
    } = useFetchData(movieUrl);

    async function saveMovie() {
      try {
        saving.value = true;
        const rsp = await fetch(movieUrl.value, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movie.value),
        });

        if (rsp.ok) {
          movie.value = await rsp.json();
        } else {
          error.value = rsp.statusText ?? "Failed to save data";
        }
      } catch (error) {
        error.value = error?.message ?? "Failed to save data";
      } finally {
        saving.value = false;
      }
    }

    async function submitForm() {
      await saveMovie();
      if (!error.value) {
        router.push(`/${uriTypeFragment.value}`);
      }
    }
    function resetForm() {
      fetchMovie();
    }

    return {
      error,
      loading,
      saving,
      movie,
      submitForm,
      resetForm,
    };
  },
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

.button-row {
  margin-top: 1em;
}

.fieldset {
  border: none;
}
.warning {
  color: orange;
}
</style>
