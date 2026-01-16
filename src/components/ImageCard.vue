<script setup>
import { useI18n } from "vue-i18n";

defineProps({
  photo: {
    type: Object,
    required: true,
  },
});

defineEmits(["click"]);

const { t } = useI18n();
</script>

<template>
  <div class="image-card" @click="$emit('click', photo.id)">
    <img :src="photo.src.large" :alt="photo.alt" loading="lazy" />
    <div class="overlay">
      <div class="info">
        <h3>{{ photo.photographer }}</h3>
        <button class="view-btn">{{ t("gallery.view_btn") }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  background: #111;
  aspect-ratio: auto;
}

.image-card:hover {
  transform: scale(1.02);
  z-index: 10;
  box-shadow: 0 10px 30px var(--shadow-color);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, var(--overlay-bg), transparent);
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
}

.image-card:hover .overlay {
  opacity: 1;
}

.info {
  width: 100%;
}

h3 {
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.view-btn {
  background: var(--surface-hover);
  backdrop-filter: blur(5px);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  cursor: pointer;
}
</style>
