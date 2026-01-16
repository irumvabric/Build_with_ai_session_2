<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useThemeStore } from "../stores/theme";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const authStore = useAuthStore();
const themeStore = useThemeStore();
const router = useRouter();
const { t, locale } = useI18n();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const logout = () => {
  authStore.logout();
  router.push("/login");
  closeMenu();
};

const switchLang = (lang) => {
  locale.value = lang;
};
</script>

<template>
  <nav class="navbar">
    <div class="container nav-content">
      <router-link to="/" class="brand" @click="closeMenu"
        >ArtFolio</router-link
      >

      <button
        class="hamburger"
        @click="toggleMenu"
        :class="{ active: isMenuOpen }"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-links" :class="{ 'nav-active': isMenuOpen }">
        <router-link to="/" class="nav-link" @click="closeMenu">{{
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
        <router-link
          v-else
          to="/login"
          class="btn-primary"
          @click="closeMenu"
          >{{ t("nav.login") }}</router-link
        >
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
  padding: 1.5rem 0;
  transition: background 0.3s, border-color 0.3s, padding 0.3s;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  text-decoration: none;
  background: linear-gradient(45deg, #ff0055, #00ddff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 1001;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
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
  font-size: 0.9rem;
  margin: 0 0.2rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  transition: color 0.3s, background 0.3s;
}

.lang-switcher button.active {
  color: var(--primary);
  background: rgba(255, 255, 255, 0.05);
}

.theme-toggle {
  font-size: 1.2rem;
}

/* Hamburger Menu */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

.hamburger span {
  width: 2rem;
  height: 0.25rem;
  background: var(--text-color);
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem 0;
  }

  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 75%;
    max-width: 300px;
    background: var(--bg-color);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    border-left: 1px solid var(--border-color);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
    padding: 2rem;
    z-index: 1000;
  }

  .nav-links.nav-active {
    transform: translateX(0);
  }

  .hamburger.active span:first-child {
    transform: rotate(45deg);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
    transform: translateX(20px);
  }

  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg);
  }

  .nav-link {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .lang-switcher {
    margin: 1.5rem 0;
  }

  .lang-switcher button {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
  }

  .theme-toggle {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;
    padding: 0.8rem 2rem;
  }

  .user-greeting {
    margin-bottom: 1rem;
    display: block;
    text-align: center;
  }
}
</style>
