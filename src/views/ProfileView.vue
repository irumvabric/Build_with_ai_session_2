<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import pexelsService from "../services/pexels";
import ImageCard from "../components/ImageCard.vue";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const photographerName = ref(route.query.name || "Photographer");
const photos = ref([]);
const loading = ref(true);

const rating = ref(0);
const comment = ref("");
const comments = ref([
  { user: "Alice", text: "Incredible work!", date: "2 days ago" },
  { user: "Bob", text: "Love the composition.", date: "1 week ago" },
]);

onMounted(async () => {
  try {
    const data = await pexelsService.searchPhotos(
      photographerName.value,
      1,
      15
    );
    photos.value = data.photos;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const addComment = () => {
  if (!comment.value.trim()) return;
  comments.value.unshift({
    user: "You",
    text: comment.value,
    date: "Just now",
  });
  comment.value = "";
};

const setRating = (r) => {
  rating.value = r;
};
</script>

<template>
  <div class="profile-view container">
    <!-- Header -->
    <div class="profile-header">
      <div class="avatar-placeholder">{{ photographerName[0] }}</div>
      <div class="profile-details">
        <h1>{{ photographerName }}</h1>
        <p class="bio">{{ t("profile.bio") }}</p>
        <div class="contact-info">
          <div class="contact-item">
            <span class="icon">📞</span> +1 (555) 123-4567
          </div>
          <div class="contact-item">
            <span class="icon">📧</span> contact@{{
              photographerName.toLowerCase().replace(/\s/g, "")
            }}.com
          </div>
        </div>
      </div>
      <div class="stats">
        <div class="stat">
          <span class="num">{{ photos.length }}</span>
          <span class="label">{{ t("profile.stats_works") }}</span>
        </div>
        <div class="stat">
          <span class="num">4.9</span>
          <span class="label">{{ t("profile.stats_rating") }}</span>
        </div>
      </div>
    </div>

    <!-- Portfolio -->
    <section class="portfolio-section">
      <h2>{{ t("profile.section_portfolio") }}</h2>
      <div class="masonry-grid">
        <ImageCard
          v-for="photo in photos"
          :key="photo.id"
          :photo="photo"
          @click="(id) => router.push(`/artwork/${id}`)"
        />
      </div>
    </section>

    <!-- Interactions -->
    <section class="interaction-section">
      <div class="rating-box">
        <h3>{{ t("profile.rate_title") }}</h3>
        <div class="stars">
          <span
            v-for="i in 5"
            :key="i"
            @click="setRating(i)"
            :class="{ active: i <= rating }"
            >★</span
          >
        </div>
      </div>

      <div class="comments-box">
        <h3>{{ t("profile.comments_title") }}</h3>
        <div class="comment-input">
          <input
            v-model="comment"
            :placeholder="t('profile.comment_placeholder')"
            @keyup.enter="addComment"
          />
          <button @click="addComment">{{ t("profile.post_btn") }}</button>
        </div>
        <div class="comment-list">
          <div v-for="(c, i) in comments" :key="i" class="comment">
            <div class="comment-header">
              <strong>{{ c.user }}</strong>
              <small>{{ c.date }}</small>
            </div>
            <p>{{ c.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.profile-view {
  padding-top: 6rem;
  padding-bottom: 4rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: var(--surface-color);
  padding: 3rem;
  border-radius: 1rem;
  margin-bottom: 3rem;
  transition: background 0.3s;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, var(--secondary), var(--primary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
}

.profile-details h1 {
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
}

.bio {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.contact-info {
  display: flex;
  gap: 1.5rem;
}

.contact-item {
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  background: var(--surface-hover);
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
}

.stats {
  margin-left: auto;
  display: flex;
  gap: 2rem;
  text-align: center;
}

.stat .num {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.stat .label {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.portfolio-section h2 {
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

/* Interaction */
.interaction-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.rating-box,
.comments-box {
  background: var(--surface-color);
  padding: 1.5rem;
  border-radius: 1rem;
}

h3 {
  color: var(--text-color);
  margin-bottom: 1rem;
}

.stars {
  font-size: 2rem;
  cursor: pointer;
  color: #333;
}

.stars span.active {
  color: #ffd700;
}

.comment-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.comment-input input {
  flex: 1;
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.2);
  color: var(--text-color);
}

.comment-input button {
  padding: 0 1.5rem;
  background: var(--text-color);
  color: var(--bg-color);
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.comment {
  border-bottom: 1px solid var(--border-color);
  padding: 0.8rem 0;
}

.comment:last-child {
  border: none;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}

.comment-header strong {
  color: var(--text-color);
}

.comment-header small {
  color: var(--text-secondary);
}

.comment p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}
</style>
