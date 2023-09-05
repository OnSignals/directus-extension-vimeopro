<template>
  <div>
    <template v-if="!apiToken">
      <v-notice type="warning">
        The Vimeo Pro API Key is missing. Please add your key under Options.
      </v-notice>
    </template>

    <template v-else>
      <template v-if="value">
        <v-card class="item">
          <a v-bind:href="value?.link" target="_blank">
            <figure v-if="value?.pictures?.sizes?.[2]" class="item-preview">
              <img
                v-bind:src="value.pictures.sizes[2].link"
                class="item-preview-img"
              />
            </figure>
          </a>

          <div class="item-info">
            <p v-if="value.name" class="item-title">{{ value.name }}</p>

            <p v-if="value.width" class="item-meta">
              {{ value.width }}×{{ value.height }}
            </p>

            <p v-if="value.duration" class="item-meta">
              {{ secondsToHHMMSS(value.duration) }}
            </p>
            <p v-if="value.created_time" class="item-meta">
              {{ new Date(value.created_time).toLocaleDateString() }}
              {{ new Date(value.created_time).toLocaleTimeString() }}
            </p>
          </div>

          <div class="item-actions">
            <v-icon
              v-on:click="clearItem"
              name="clear"
              clickable="true"
              color="var(--foreground-subdued)"
            />
          </div>
        </v-card>
      </template>

      <template v-else>
        <v-input @input="handleInput">
          <template v-slot:prepend>
            <v-icon name="search" />
          </template>
        </v-input>

        <div v-if="query" class="results">
          <template v-if="isLoading">
            <div class="results-message">
              <v-info icon="Clock_Loader_20"> Loading... </v-info>
            </div>
          </template>
          <template v-else>
            <template v-if="results.length">
              <ul class="results-items">
                <li
                  v-for="item in results"
                  v-bind:key="item.uri"
                  v-on:click="selectResult(item)"
                  class="results-item"
                >
                  <figure
                    v-if="item?.pictures?.sizes?.[1]"
                    class="results-item-preview"
                  >
                    <img
                      v-bind:src="item.pictures.sizes[1].link"
                      class="results-item-preview-img"
                    />
                  </figure>

                  <div class="results-item-info">
                    <p class="results-item-title">
                      {{ item.name }}
                    </p>

                    <div class="results-item-meta">
                      <p v-if="item.width" class="results-item-meta-item">
                        {{ item.width }}×{{ item.height }}
                      </p>

                      <p v-if="item.duration" class="results-item-meta-item">
                        {{ secondsToHHMMSS(item.duration) }}
                      </p>
                      <p
                        v-if="item.created_time"
                        class="results-item-meta-item"
                      >
                        {{ new Date(item.created_time).toLocaleDateString() }}
                        {{ new Date(item.created_time).toLocaleTimeString() }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </template>
            <template v-else>
              <div class="results-message">
                <v-info icon="Sentiment_Dissatisfied">Nothing found</v-info>
              </div>
            </template>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>
.item {
  --v-card-max-width: initial;

  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  padding: calc(0.5 * var(--v-card-padding));

  border: var(--border-width) solid var(--border-normal);
}

.item-preview {
  flex-grow: 0;
  flex-shrink: 0;
  display: block;
  width: calc(102px / 9 * 16);
  height: 102px;
  overflow: hidden;
  margin-right: calc(0.5 * var(--v-card-padding));

  background-color: var(--primary-alt);
  border-radius: var(--border-radius);
}

.item-preview-img {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  object-fit: cover;
}

.item-info {
  flex-grow: 1;
  flex-shrink: 1;
  padding: calc(0.5 * var(--v-card-padding));
}

.item-title {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0 4px;
}

.item-meta {
  font-size: 0.8em;
  line-height: 1.5;
  color: var(--foreground-subdued);
}

.item-actions {
  flex-grow: 0;
  flex-shrink: 0;

  display: flex;
  margin-left: var(--v-card-padding);
}

.results {
  position: relative;

  z-index: 10;
  max-height: 320px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 4px 0 0;
  padding: 6px;

  background-color: var(--card-face-color);
  border-radius: var(--border-radius);
  box-shadow: 0 0 6px 0 rgb(var(--card-shadow-color), 0.2),
    0 0 12px 2px rgb(var(--card-shadow-color), 0.05);
}

.results-items {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.results-item {
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;

  margin: 0 0 6px;
  padding: 12px 12px;

  /* background-color: var(--background-normal); */
  border-radius: calc(0.75 * var(--border-radius));

  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: var(--background-normal-alt);
    background-color: var(--v-list-item-background-color-hover);
  }
}

.results-item-title {
}

.results-item-meta {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.results-item-meta-item {
  display: block;
  margin: 0 1em 0 0;
  font-size: 0.8em;
  line-height: 1.25;
  color: var(--foreground-subdued);
}

.results-item-preview {
  flex-grow: 0;
  flex-shrink: 0;
  display: block;
  width: calc(40px / 9 * 16);
  height: 40px;
  overflow: hidden;
  margin-right: var(--v-card-padding);

  background-color: var(--primary-alt);
  border-radius: calc(0.5 * var(--border-radius));
}

.results-item-preview-img {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  object-fit: cover;
}

.results-message {
  padding: 16px 0;
}
</style>

<script setup>
import { onMounted, ref, unref, computed, toRaw } from "vue";
import { useApi } from "@directus/extensions-sdk";
import { secondsToHHMMSS } from "./utils/time";

const { value } = defineProps({ value: { type: String } });
const emit = defineEmits({ input: null });

const apiToken = ref(null);
const query = ref(null);
const results = ref([]);
const isLoading = ref(false);

const api = useApi();

/**
 * Event handlers
 */
async function handleInput(event) {
  console.log("handleInput()", event);

  query.value = event.target.value;
  await fetchResults(event.target.value);
}

/**
 * Methods
 */
async function fetchResults(query = null) {
  console.log("fetchResults()", query);

  if (!unref(apiToken)) return null;

  isLoading.value = true;

  const fields = `name,description,link,pictures.sizes.link,link,uri,created_time,modified_time,duration,width,height`;
  const url = query
    ? `https://api.vimeo.com/me/videos?query=${query}&weak_search=true&per_page=30&fields=${fields}`
    : `https://api.vimeo.com/me/videos?per_page=10&fields=${fields}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${unref(apiToken)}`,
    },
  });

  const _results = await response.json();

  results.value = _results.data || [];
  isLoading.value = false;
}

function selectResult(item) {
  console.log("selectResult()", item);

  emit("input", item);
}

function clearItem() {
  console.log("clearItem()");

  emit("input", null);
}

async function fetchAPIToken() {
  const response = await api.get(`/items/options`);

  console.log("options", response);

  apiToken.value = response?.data?.data?.vimeopro_api_key;
}

onMounted(() => {
  console.log("value", value, typeof value);

  fetchAPIToken();
});
</script>
