<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import pexelsService from "../services/pexels";
import ImageCard from "../components/ImageCard.vue";

const photos = ref([]);
const loading = ref(true);
const router = useRouter();
const { t } = useI18n();

onMounted(async () => {
  try {
    const data = await pexelsService.getCuratedPhotos(1, 30);
    photos.value = data.photos;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const goToDetail = (id) => {
  router.push(`/artwork/${id}`);
};
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <header class="hero">
      <div class="hero-content">
        <h1>{{ t("hero.title") }}</h1>
        <p>{{ t("hero.subtitle") }}</p>
      </div>
    </header>

    <!-- Gallery Grid -->
    <main class="container gallery-section">
      <div v-if="loading" class="loading">{{ t("gallery.loading") }}</div>

      <div v-else class="masonry-grid">
        <ImageCard
          v-for="photo in photos"
          :key="photo.id"
          :photo="photo"
          @click="goToDetail"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.hero {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
      center/cover;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 0 0 2rem 2rem;
}

.hero-content h1 {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(
    to right,
    var(--text-color),
    var(--text-secondary)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 10px 30px var(--shadow-color);
}

.hero-content p {
  font-size: 1.5rem;
  color: #ddd; /* Keep fixed for consistency on image bg */
}

.gallery-section {
  padding-bottom: 4rem;
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.loading {
  text-align: center;
  color: var(--text-secondary);
  padding: 4rem;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .hero {
    height: 50vh;
    border-radius: 0 0 1rem 1rem;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-content p {
    font-size: 1.1rem;
    padding: 0 1rem;
  }

  .masonry-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style>
