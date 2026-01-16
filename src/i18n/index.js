import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    nav: {
      gallery: 'Gallery',
      login: 'Login',
      logout: 'Logout',
      welcome: 'Hi, {name}'
    },
    hero: {
      title: 'Discover Limitless Inspiration',
      subtitle: 'Curated artworks from the world\'s best creators.'
    },
    gallery: {
      loading: 'Loading Masterpieces...',
      view_btn: 'View Artwork'
    },
    detail: {
      untitled: 'Untitled Artwork',
      by: 'by',
      download: 'Download Original',
      related: 'More from this Artist',
      loading: 'Loading Artwork...'
    },
    profile: {
      bio: 'Professional Photographer & Visual Artist. Capturing moments that last a lifetime.',
      contact_phone: 'Phone',
      contact_email: 'Email',
      stats_works: 'Works',
      stats_rating: 'Rating',
      section_portfolio: 'Portfolio',
      rate_title: 'Rate this Profile',
      comments_title: 'Comments',
      comment_placeholder: 'Leave a comment...',
      post_btn: 'Post'
    },
    login: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your premium portfolio',
      email: 'Email',
      password: 'Password',
      submit: 'Sign In',
      submitting: 'Signing In...',
      error_creds: 'Invalid credentials. Try admin@gmail.com / 12345678',
      error_general: 'An error occurred'
    }
  },
  fr: {
    nav: {
      gallery: 'Galerie',
      login: 'Connexion',
      logout: 'Déconnexion',
      welcome: 'Bonjour, {name}'
    },
    hero: {
      title: 'Découvrez une Inspiration Sans Limite',
      subtitle: 'Œuvres sélectionnées des meilleurs créateurs du monde.'
    },
    gallery: {
      loading: 'Chargement des chefs-d\'œuvre...',
      view_btn: 'Voir l\'œuvre'
    },
    detail: {
      untitled: 'Œuvre Sans Titre',
      by: 'par',
      download: 'Télécharger l\'original',
      related: 'Plus de cet artiste',
      loading: 'Chargement de l\'œuvre...'
    },
    profile: {
      bio: 'Photographe Professionnel & Artiste Visuel. Capturer des moments pour l\'éternité.',
      contact_phone: 'Tél',
      contact_email: 'Email',
      stats_works: 'Œuvres',
      stats_rating: 'Note',
      section_portfolio: 'Portfolio',
      rate_title: 'Noter ce profil',
      comments_title: 'Commentaires',
      comment_placeholder: 'Laissez un commentaire...',
      post_btn: 'Publier'
    },
    login: {
      title: 'Bon retour',
      subtitle: 'Connectez-vous à votre portfolio premium',
      email: 'Email',
      password: 'Mot de passe',
      submit: 'Se Connecter',
      submitting: 'Connexion...',
      error_creds: 'Identifiants invalides. Essayez admin@gmail.com / 12345678',
      error_general: 'Une erreur est survenue'
    }
  },
  rn: {
    nav: {
      gallery: 'Igaleriyo',
      login: 'Kwinjira',
      logout: 'Gusohoka',
      welcome: 'Amahoro, {name}'
    },
    hero: {
      title: 'Vumbura Ubwiza Butagira Imbibe',
      subtitle: 'Ibihangano vyatoranijwe bivuye ku bahinga bakomeye kw\'isi.'
    },
    gallery: {
      loading: 'Bariko barapakira ibihangano...',
      view_btn: 'Raba igihangano'
    },
    detail: {
      untitled: 'Igihangano kitagira izina',
      by: 'vyakozwe na',
      download: 'Manura umwimerere',
      related: 'Ibindi vy\'uyu muhanzi',
      loading: 'Bariko barapakira igihangano...'
    },
    profile: {
      bio: 'Umufotozi W\'umwuga & Umuhanzi. Dufata ibihe bitibagira.',
      contact_phone: 'Terefone',
      contact_email: 'Imeli',
      stats_works: 'Ibihangano',
      stats_rating: ' amanota',
      section_portfolio: 'Ibihangano',
      rate_title: 'Tanga amanota',
      comments_title: 'Ibitekerezo',
      comment_placeholder: 'Tanga igitekerezo...',
      post_btn: 'Tanga'
    },
    login: {
      title: 'Kaze',
      subtitle: 'Injira muri portfolio yawe',
      email: 'Imeli',
      password: 'Ijambo ry\'ibanga',
      submit: 'Kwinjira',
      submitting: 'Kwinjira...',
      error_creds: 'Ivyo mwanditse sivyo. Gerageza admin@gmail.com / 12345678',
      error_general: 'Habaye ikibazo'
    }
  }
};

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'en', // Default locale
  fallbackLocale: 'en',
  messages
});

export default i18n;
