<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import pexelsService from "../services/pexels";
import ImageCard from "../components/ImageCard.vue";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const photo = ref(null);
const relatedPhotos = ref([]);
const loading = ref(true);

const fetchPhotoData = async (id) => {
  loading.value = true;
  try {
    const data = await pexelsService.getPhoto(id);
    photo.value = data;

    // Fetch related
    const related = await pexelsService.searchPhotos(data.photographer, 1, 6);
    relatedPhotos.value = related.photos.filter((p) => p.id !== data.id);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPhotoData(route.params.id);
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) fetchPhotoData(newId);
  }
);

const goToProfile = () => {
  if (photo.value) {
    router.push(
      `/photographer/${photo.value.photographer_id}?name=${encodeURIComponent(
        photo.value.photographer
      )}`
    );
  }
};
</script>

<template>
  <div v-if="photo" class="detail-view container">
    <div class="main-image-container">
      <img :src="photo.src.large2x" :alt="photo.alt" class="main-image" />
    </div>

    <div class="artwork-info">
      <div>
        <h1>{{ photo.alt || t("detail.untitled") }}</h1>
        <div class="photographer-link" @click="goToProfile">
          <span class="by">{{ t("detail.by") }}</span>
          <span class="name">{{ photo.photographer }}</span>
        </div>
      </div>

      <div class="actions">
        <a :href="photo.src.original" target="_blank" class="btn-download">{{
          t("detail.download")
        }}</a>
      </div>
    </div>

    <section class="related-section">
      <h2>{{ t("detail.related") }}</h2>
      <div class="masonry-grid">
        <ImageCard
          v-for="p in relatedPhotos"
          :key="p.id"
          :photo="p"
          @click="(id) => router.push(`/artwork/${id}`)"
        />
      </div>
    </section>
  </div>
  <div v-else-if="loading" class="loading">{{ t("detail.loading") }}</div>
</template>

<style scoped>
.detail-view {
  padding-top: 6rem; /* Account for fixed navbar */
  min-height: 100vh;
}

.main-image-container {
  width: 100%;
  height: 70vh;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 2rem;
  background: #111;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.artwork-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.photographer-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
}

.by {
  color: var(--text-secondary);
}

.name {
  color: var(--primary);
  font-weight: 600;
}

.name:hover {
  text-decoration: underline;
}

.btn-download {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: var(--text-color);
  color: var(--bg-color);
  text-decoration: none;
  border-radius: 2rem;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-download:hover {
  transform: translateY(-2px);
}

.related-section h2 {
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.loading {
  padding-top: 6rem;
  text-align: center;
  color: var(--text-secondary);
}
</style>
