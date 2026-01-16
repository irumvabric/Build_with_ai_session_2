<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();
const { t } = useI18n();

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    const success = await authStore.login(email.value, password.value);
    if (success) {
      router.push("/");
    } else {
      error.value = t("login.error_creds");
    }
  } catch (e) {
    error.value = t("login.error_general");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2>{{ t("login.title") }}</h2>
      <p class="subtitle">{{ t("login.subtitle") }}</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>{{ t("login.email") }}</label>
          <input
            type="email"
            v-model="email"
            placeholder="admin@gmail.com"
            required
          />
        </div>

        <div class="form-group">
          <label>{{ t("login.password") }}</label>
          <input
            type="password"
            v-model="password"
            placeholder="12345678"
            required
          />
        </div>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <button type="submit" :disabled="loading" class="btn-submit">
          {{ loading ? t("login.submitting") : t("login.submit") }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color); /* radial gradient handled in global css */
  padding: 1rem;
}

.login-card {
  background: var(--surface-color);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  padding: 3rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px -12px var(--shadow-color);
}

h2 {
  color: var(--text-color);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  color: #fff; /* Input text always white for contrast on dark input bg */
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: var(--primary);
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, var(--secondary), var(--primary));
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
}

.btn-submit:hover {
  opacity: 0.9;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-msg {
  color: #ff4444;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
  }

  h2 {
    font-size: 1.75rem;
  }
}
</style>
