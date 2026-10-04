/**
 * ==========================================================
 * NOVA STORE - Responsive Navigation & Application Controller
 * GUVI Full Stack Development Assignment
 * 
 * Implementations:
 * 1. Mobile hamburger menu
 * 2. Smooth scrolling
 * 3. Product card hover effects
 * 4. Wishlist button interaction (heart toggle)
 * 5. Add to Cart button interaction ("Added to cart!" notification)
 * 6. Search button interaction (Search modal overlay & input)
 * 7. Newsletter form validation
 * 8. Contact/form feedback
 * 9. Promotional countdown
 * 10. Scroll reveal animations
 * ==========================================================
 */

'use strict';

const NovaStoreApp = {
  isMobileMenuOpen: false,
  cartCount: 0,
  wishlistCount: 0,
  wishlistItems: new Set(),

  init() {
    console.log('⚡ NOVA STORE: Initializing Application Controller...');
    this.setupStickyHeader();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupActionIcons();
    this.setupSearchModal();
    this.setupHeroEvents();
    this.initCountdownTimer();
    this.setupProductCardInteractions();
    this.setupCategoryCardInteractions();
    this.setupFeatureCardInteractions();
    this.setupCtaEvents();
    this.setupNewsletterForm();
    this.setupContactFeedback();
    this.setupScrollReveal();
  },

  // 1. Sticky header scroll shadow handler
  setupStickyHeader() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  },

  // 1. Mobile Hamburger Toggle & Drawer Handler
  setupMobileMenu() {
    const toggleBtn = document.getElementById('mobileToggleBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const hamburgerIcon = document.getElementById('hamburgerIcon');

    if (!toggleBtn || !mobileDrawer) return;

    const toggleMenu = () => {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      
      toggleBtn.setAttribute('aria-expanded', this.isMobileMenuOpen.toString());
      mobileDrawer.classList.toggle('active', this.isMobileMenuOpen);
      document.body.classList.toggle('mobile-menu-open', this.isMobileMenuOpen);

      if (this.isMobileMenuOpen) {
        hamburgerIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>`;
      } else {
        hamburgerIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>`;
      }
    };

    const closeMenu = () => {
      if (!this.isMobileMenuOpen) return;
      this.isMobileMenuOpen = false;
      toggleBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
      hamburgerIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>`;
    };

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    const mobileLinks = mobileDrawer.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileMenuOpen) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && this.isMobileMenuOpen) {
        closeMenu();
      }
    });
  },

  // 2. Smooth Scrolling to internal anchor links
  setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '') return;

        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update active link
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          if (anchor.classList.contains('nav-link')) {
            anchor.classList.add('active');
          }
        }
      });
    });
  },

  // Header Icon Buttons Feedback
  setupActionIcons() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    const cartBtn = document.getElementById('cartBtn');
    const accountBtn = document.getElementById('accountBtn');

    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        this.showToast(`❤️ You have ${this.wishlistCount} item(s) in your Wishlist`);
      });
    }

    if (cartBtn) {
      cartBtn.addEventListener('click', () => {
        this.showToast(`🛍️ Shopping Bag contains ${this.cartCount} item(s)`);
      });
    }

    if (accountBtn) {
      accountBtn.addEventListener('click', () => {
        this.showToast('👤 Account Profile logged in');
      });
    }
  },

  // 6. Search Button & Modal Interaction
  setupSearchModal() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');
    const searchChips = document.querySelectorAll('.search-chip');

    if (!searchModal) return;

    const openSearch = () => {
      searchModal.classList.add('active');
      searchModal.setAttribute('aria-hidden', 'false');
      setTimeout(() => searchInput?.focus(), 150);
    };

    const closeSearch = () => {
      searchModal.classList.remove('active');
      searchModal.setAttribute('aria-hidden', 'true');
    };

    if (searchBtn) {
      searchBtn.addEventListener('click', openSearch);
    }

    if (closeSearchBtn) {
      closeSearchBtn.addEventListener('click', closeSearch);
    }

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        closeSearch();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearch();
      }
    });

    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput?.value.trim();
        if (query) {
          closeSearch();
          this.showToast(`🔍 Searching for "${query}"...`);
        }
      });
    }

    searchChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query && searchInput) {
          searchInput.value = query;
          closeSearch();
          this.showToast(`🔍 Showing results for "${query}"`);
        }
      });
    });
  },

  // Hero Section CTA Events
  setupHeroEvents() {
    const shopBtn = document.getElementById('heroShopCollectionBtn');
    const newArrivalsBtn = document.getElementById('heroNewArrivalsBtn');
    const promoSaleBtn = document.getElementById('promoShopSaleBtn');

    if (shopBtn) {
      shopBtn.addEventListener('click', () => this.showToast('🚀 Exploring NOVA STORE Main Collection'));
    }
    if (newArrivalsBtn) {
      newArrivalsBtn.addEventListener('click', () => this.showToast('✨ Exploring New Season 2026 Arrivals'));
    }
    if (promoSaleBtn) {
      promoSaleBtn.addEventListener('click', () => this.showToast('🔥 Exclusive Seasonal Sale unlocked!'));
    }
  },

  // CTA Banner Events
  setupCtaEvents() {
    const ctaBtn = document.getElementById('ctaStartShoppingBtn');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        this.showToast('🛍️ Welcome to NOVA STORE Collection!');
      });
    }
  },

  // 7. Newsletter Form Validation & Submission
  setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const successBox = document.getElementById('newsletterSuccess');

    if (!form || !emailInput || !successBox) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailVal || !emailRegex.test(emailVal)) {
        emailInput.classList.add('input-error');
        this.showToast('⚠️ Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      emailInput.classList.remove('input-error');
      form.style.display = 'none';
      successBox.style.display = 'flex';
      this.showToast('🎉 Thanks for subscribing to NOVA STORE!');
    });

    emailInput.addEventListener('input', () => {
      emailInput.classList.remove('input-error');
    });
  },

  // 8. Contact & Footer Feedback
  setupContactFeedback() {
    const footerLinks = document.querySelectorAll('.footer-link');

    footerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const text = link.textContent.trim();
        if (link.getAttribute('href')?.startsWith('#')) {
          this.showToast(`ℹ️ Opening ${text}...`);
        }
      });
    });
  },

  // 9. Promotional Live Countdown Timer
  initCountdownTimer() {
    const daysEl = document.getElementById('countdownDays');
    const hoursEl = document.getElementById('countdownHours');
    const minutesEl = document.getElementById('countdownMinutes');
    const secondsEl = document.getElementById('countdownSeconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    let totalSeconds = (2 * 24 * 3600) + (14 * 3600) + (35 * 60) + 42;

    const updateTimer = () => {
      if (totalSeconds <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');

      totalSeconds--;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  },

  // 3, 4, 5. Product Cards Hover, Wishlist Toggle & Add to Cart Notification
  setupProductCardInteractions() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
      const productId = card.getAttribute('data-id');
      const productName = card.getAttribute('data-name');
      const wishlistBtn = card.querySelector('.card-wishlist-btn');
      const addToCartBtn = card.querySelector('.btn-add-to-cart');

      // 4. Wishlist heart toggle
      if (wishlistBtn) {
        wishlistBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const isActive = wishlistBtn.classList.contains('active');

          if (isActive) {
            wishlistBtn.classList.remove('active');
            this.wishlistItems.delete(productId);
            this.wishlistCount = Math.max(0, this.wishlistCount - 1);
            this.showToast(`Removed "${productName}" from Wishlist`);
          } else {
            wishlistBtn.classList.add('active');
            this.wishlistItems.add(productId);
            this.wishlistCount++;
            this.showToast(`Added "${productName}" to Wishlist ❤️`);
          }

          this.updateBadges();
        });
      }

      // 5. Add to Cart Notification ("Added to cart!")
      if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.cartCount++;
          this.updateBadges();

          const originalContent = addToCartBtn.innerHTML;
          addToCartBtn.classList.add('added');
          addToCartBtn.innerHTML = `✓ Added to Bag`;

          // Show specific notification as requested
          this.showToast(`Added to cart! (${productName})`);

          setTimeout(() => {
            addToCartBtn.classList.remove('added');
            addToCartBtn.innerHTML = originalContent;
          }, 1500);
        });
      }
    });
  },

  // Category Cards Interaction
  setupCategoryCardInteractions() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const titleEl = card.querySelector('.category-title');
        const title = titleEl ? titleEl.textContent : 'Category';
        this.showToast(`Exploring "${title}" collection ✨`);
      });
    });
  },

  // Feature Cards Interaction
  setupFeatureCardInteractions() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
      card.addEventListener('click', () => {
        const titleEl = card.querySelector('.feature-title');
        const descEl = card.querySelector('.feature-desc');
        if (titleEl && descEl) {
          this.showToast(`✨ ${titleEl.textContent}: ${descEl.textContent}`);
        }
      });
    });
  },

  // 10. Scroll Reveal Animations via IntersectionObserver
  setupScrollReveal() {
    const elementsToReveal = document.querySelectorAll('.product-card, .category-card, .feature-card, .section-header, .newsletter-card');

    elementsToReveal.forEach(el => el.classList.add('reveal-on-scroll'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      elementsToReveal.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      elementsToReveal.forEach(el => el.classList.add('reveal-visible'));
    }
  },

  // Update Cart & Wishlist Header Badges
  updateBadges() {
    const cartBadge = document.getElementById('cartBadge');
    const wishlistBadge = document.getElementById('wishlistBadge');

    if (cartBadge) {
      cartBadge.textContent = this.cartCount;
    }
    if (wishlistBadge) {
      wishlistBadge.textContent = this.wishlistCount;
    }
  },

  // Interactive Toast Notification Popup
  showToast(message) {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMessage');

    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add('show');

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
};

// Initialize application on DOM content load
document.addEventListener('DOMContentLoaded', () => {
  NovaStoreApp.init();
});
