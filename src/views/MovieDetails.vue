<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>
    <form v-else @submit.prevent="submitForm" @reset="resetForm" novalidate>
      <fieldset class="fieldset" :disabled="saving">
        <div>
          <label>
            <span class="input-label">Title</span>
            <input v-model="movie.title" class="form-control" />
          </label>
        </div>
        <div>
          <label>
            <span class="input-label">Overview</span>
            <textarea v-model="movie.overview" rows="5" class="form-control" />
          </label>
        </div>
        <div>
          <label>
            <span class="input-label">Vote average</span>
            <input
              v-model.number="movie.vote_average"
              type="number"
              class="form-control"
            />
          </label>
        </div>
        <div>
          <label>
            <span class="input-label">Release date</span>
            <input
              v-model="movie.release_date"
              type="date"
              class="form-control"
            />
          </label>
        </div>

        <div class="button-row">
          <button type="submit">Save</button>
          <button type="reset">Reset</button>
        </div>
        <!-- <pre>{{ JSON.stringify(movie, null, 2) }}</pre> -->
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: [Number, String], required: true },
    type: { type: String, required: true },
  },
  data() {
    return {
      error: null,
      saving: false,
      loading: true,
      movie: null,
    };
  },
  mounted() {
    this.fetchMovie();
  },
  watch: {
    id() {
      this.fetchMovie();
    },
    type() {
      this.fetchMovie();
    },
  },
  computed: {
    movieUrl() {
      return `${process.env.VUE_APP_API_ORIGIN}/${
        this.type === "popular" ? "popular-movies" : "top-rated-movies"
      }/${this.id}`;
    },
  },
  methods: {
    async fetchMovie() {
      try {
        this.loading = true;
        const rsp = await fetch(this.movieUrl);

        if (rsp.ok) {
          this.movie = await rsp.json();
        } else {
          this.error = rsp.statusText ?? "Failed to load data";
        }
      } catch (error) {
        this.error = error?.message ?? "Failed to load data";
      } finally {
        this.loading = false;
      }
    },
    async saveMovie() {
      try {
        this.saving = true;
        const rsp = await fetch(this.movieUrl, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.movie),
        });

        if (rsp.ok) {
          this.movie = await rsp.json();
        } else {
          this.error = rsp.statusText ?? "Failed to save data";
        }
      } catch (error) {
        this.error = error?.message ?? "Failed to save data";
      } finally {
        this.saving = false;
      }
    },
    async submitForm() {
      await this.saveMovie();
      if (!this.error) {
        this.$router.push(
          `/${this.type === "popular" ? "popular-movies" : "top-rated-movies"}`
        );
      }
    },
    resetForm() {
      this.fetchMovie();
    },
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
</style>
