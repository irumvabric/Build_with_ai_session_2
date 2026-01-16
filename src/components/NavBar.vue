<script setup>
import { useAuthStore } from "../stores/auth";
import { useThemeStore } from "../stores/theme";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const authStore = useAuthStore();
const themeStore = useThemeStore();
const router = useRouter();
const { t, locale } = useI18n();

const logout = () => {
  authStore.logout();
  router.push("/login");
};

const switchLang = (lang) => {
  locale.value = lang;
};
</script>

<template>
  <nav class="navbar">
    <div class="container nav-content">
      <router-link to="/" class="brand">ArtFolio</router-link>

      <div class="nav-links">
        <router-link to="/" class="nav-link">{{
          t("nav.gallery")
        }}</router-link>

        <!-- Language Switcher -->
        <div class="lang-switcher">
          <button
            @click="switchLang('en')"
            :class="{ active: locale === 'en' }"
          >
            EN
          </button>
          <button
            @click="switchLang('fr')"
            :class="{ active: locale === 'fr' }"
          >
            FR
          </button>
          <button
            @click="switchLang('rn')"
            :class="{ active: locale === 'rn' }"
          >
            RN
          </button>
        </div>

        <!-- Theme Toggle -->
        <button
          @click="themeStore.toggleTheme"
          class="btn-icon theme-toggle"
          title="Toggle Theme"
        >
          {{ themeStore.theme === "dark" ? "☀️" : "🌙" }}
        </button>

        <template v-if="authStore.user">
          <span class="user-greeting">{{
            t("nav.welcome", { name: authStore.user.name })
          }}</span>
          <button @click="logout" class="btn-secondary">
            {{ t("nav.logout") }}
          </button>
        </template>
        <router-link v-else to="/login" class="btn-primary">{{
          t("nav.login")
        }}</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--overlay-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  padding: 2rem 0;
  transition: background 0.3s, border-color 0.3s;
}

.nav-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
}

.brand {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  text-decoration: none;
  background: linear-gradient(45deg, #ff0055, #00ddff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.router-link-active {
  color: var(--text-color);
}

.user-greeting {
  color: var(--text-color);
  font-weight: 500;
}

.btn-primary {
  padding: 0.5rem 1.5rem;
  background: var(--text-color);
  color: var(--bg-color);
  border-radius: 2rem;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s, opacity 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: var(--text-color);
}

.lang-switcher button {
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin: 0 0.2rem;
  font-weight: 600;
}

.lang-switcher button.active {
  color: var(--primary);
}

.theme-toggle {
  font-size: 1.2rem;
}
</style>
