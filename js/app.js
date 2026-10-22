/**
 * ==============================================================================
 * KULJIT FASHIONS AMBALA - Core Interactive Application
 * Ambala Cloth Market Heritage Couture
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    currentCurrency: 'INR',
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    activeProductModal: null,
    selectedStitching: 'Made-to-Measure Custom Stitching',
    plannerSelection: {
      'bridal-lehenga': true,
      'reception-gown': true,
      'sangeet-suit': true,
      'mehendi-sharara': false,
      'banarasi-saree': true,
      'bridesmaid-set': false
    }
  };

  // DOM Elements
  const header = document.getElementById('main-header');
  const navMenu = document.getElementById('nav-menu');
  const mobileToggle = document.getElementById('mobile-toggle');
  const currencySelect = document.getElementById('currency-select');
  const productsGrid = document.getElementById('products-grid');
  const resultsCount = document.getElementById('results-count');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const catPills = document.querySelectorAll('.cat-pill');

  // Hero Quick Search Elements
  const heroSearchBtn = document.getElementById('hero-search-btn');
  const heroCatSelect = document.getElementById('hero-cat-select');
  const heroOccasionSelect = document.getElementById('hero-occasion-select');

  // Modal Elements
  const modalOverlay = document.getElementById('product-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalMainImg = document.getElementById('modal-main-img');
  const modalThumbs = document.getElementById('modal-thumbs');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalSku = document.getElementById('modal-sku');
  const modalPrice = document.getElementById('modal-price');
  const modalOriginalPrice = document.getElementById('modal-orig-price');
  const modalFabric = document.getElementById('modal-fabric');
  const modalWork = document.getElementById('modal-work');
  const modalColor = document.getElementById('modal-color');
  const modalLeadTime = document.getElementById('modal-leadtime');
  const modalInclusions = document.getElementById('modal-inclusions');
  const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');
  const stitchBtns = document.querySelectorAll('.stitch-btn');

  // Back to top & floating buttons
  const backToTopBtn = document.getElementById('back-to-top');

  // Forms
  const videoBookingForm = document.getElementById('video-booking-form');
  const contactForm = document.getElementById('contact-form');
  const toastNotice = document.getElementById('toast-notice');
  const toastMessage = document.getElementById('toast-message');

  // ==============================================================================
  // 1. CURRENCY CONVERSION & FORMATTING
  // ==============================================================================
  function formatPrice(amountINR, currencyKey = state.currentCurrency) {
    const curr = KULJIT_CONFIG.currencies[currencyKey] || KULJIT_CONFIG.currencies.INR;
    const converted = amountINR * curr.rate;
    
    if (currencyKey === 'INR') {
      return curr.symbol + Math.round(converted).toLocaleString('en-IN');
    }
    return curr.symbol + Math.round(converted).toLocaleString('en-US');
  }

  function updateCurrency(newCurrency) {
    if (KULJIT_CONFIG.currencies[newCurrency]) {
      state.currentCurrency = newCurrency;
      renderProducts();
      updatePlannerEstimate();
      if (state.activeProductModal) {
        populateModalData(state.activeProductModal);
      }
      showToast(`Currency updated to ${KULJIT_CONFIG.currencies[newCurrency].name} (${newCurrency})`);
    }
  }

  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      updateCurrency(e.target.value);
    });
  }

  // ==============================================================================
  // 2. HEADER SCROLL & MOBILE NAVIGATION
  // ==============================================================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==============================================================================
  // 3. PRODUCT CATALOG FILTERING & RENDERING
  // ==============================================================================
  function getFilteredProducts() {
    return PRODUCTS_DATA.filter(prod => {
      // Category Match
      const matchesCat = state.activeCategory === 'all' || prod.category === state.activeCategory;
      
      // Search Match
      const q = state.searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        prod.name.toLowerCase().includes(q) ||
        prod.fabric.toLowerCase().includes(q) ||
        prod.work.toLowerCase().includes(q) ||
        prod.categoryName.toLowerCase().includes(q) ||
        prod.sku.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (state.sortBy === 'price-low') {
        return a.priceINR - b.priceINR;
      }
      if (state.sortBy === 'price-high') {
        return b.priceINR - a.priceINR;
      }
      if (state.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // default featured
    });
  }

  function renderProducts() {
    if (!productsGrid) return;

    const filtered = getFilteredProducts();

    if (resultsCount) {
      resultsCount.innerHTML = `Showing <strong>${filtered.length}</strong> handcrafted designs`;
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No exact match found</h3>
          <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">Try adjusting your keyword or reset filters to explore our full Ambala couture collection.</p>
          <button class="btn btn-outline" id="reset-filters-btn">
            <i class="fa-solid fa-rotate-left"></i> Reset All Filters
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.activeCategory = 'all';
          state.searchQuery = '';
          state.sortBy = 'featured';
          if (searchInput) searchInput.value = '';
          if (sortSelect) sortSelect.value = 'featured';
          catPills.forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));
          renderProducts();
        });
      }
      return;
    }

    productsGrid.innerHTML = filtered.map(prod => {
      const discountPct = Math.round(((prod.originalPriceINR - prod.priceINR) / prod.originalPriceINR) * 100);
      const formattedCurrent = formatPrice(prod.priceINR);
      const formattedOrig = formatPrice(prod.originalPriceINR);

      // Prefilled WhatsApp order text
      const waMessage = encodeURIComponent(
        `Hello Kuljit Fashions Ambala! I am interested in inquiring/ordering:\n\n` +
        `• Design: ${prod.name}\n` +
        `• SKU: ${prod.sku}\n` +
        `• Category: ${prod.categoryName}\n` +
        `• Price: ${formattedCurrent} (${state.currentCurrency})\n\n` +
        `Please share available sizes/custom stitching details and delivery timeline.`
      );
      const waUrl = `https://wa.me/${KULJIT_CONFIG.whatsapp}?text=${waMessage}`;

      return `
        <article class="product-card" data-id="${prod.id}">
          <div class="card-img-wrap">
            <span class="card-badge">${prod.badge}</span>
            <img 
              src="${prod.primaryImage}" 
              alt="${prod.name}" 
              class="card-img" 
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'"
            />
            <div class="card-quick-actions">
              <button class="btn btn-primary btn-sm view-details-btn" style="width: 100%;" data-id="${prod.id}">
                <i class="fa-solid fa-eye"></i> Quick View
              </button>
            </div>
          </div>
          
          <div class="card-body">
            <div class="card-meta">
              <span class="card-category">${prod.categoryName}</span>
              <div class="card-rating">
                <i class="fa-solid fa-star"></i>
                <strong>${prod.rating.toFixed(1)}</strong>
                <span>(${prod.reviewsCount})</span>
              </div>
            </div>

            <h3 class="card-title" title="${prod.name}">${prod.name}</h3>
            <p class="card-fabric"><i class="fa-solid fa-gem" style="color: var(--color-gold); font-size: 0.75rem; margin-right: 0.35rem;"></i>${prod.fabric}</p>

            <div class="card-pricing">
              <span class="price-current">${formattedCurrent}</span>
              <span class="price-original">${formattedOrig}</span>
              <span class="price-discount">${discountPct}% OFF</span>
            </div>

            <div class="card-footer-btns">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" title="Order on WhatsApp">
                <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
              </a>
              <button class="btn btn-outline btn-sm view-details-btn" data-id="${prod.id}" title="View Details">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click handlers to quick view buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = btn.dataset.id || btn.closest('.product-card').dataset.id;
        openProductModal(prodId);
      });
    });
  }

  // Category Pills Filter
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeCategory = pill.dataset.category;
      renderProducts();
    });
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort Select Handler
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Hero Search Widget Integration
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      const selectedCat = heroCatSelect ? heroCatSelect.value : 'all';
      state.activeCategory = selectedCat;
      
      catPills.forEach(pill => {
        pill.classList.toggle('active', pill.dataset.category === selectedCat);
      });

      renderProducts();

      const collectionsEl = document.getElementById('collections');
      if (collectionsEl) {
        collectionsEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==============================================================================
  // 4. PRODUCT QUICK VIEW / DETAILS MODAL
  // ==============================================================================
  function openProductModal(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product || !modalOverlay) return;

    state.activeProductModal = product;
    populateModalData(product);

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    state.activeProductModal = null;
  }

  function populateModalData(product) {
    modalMainImg.src = product.primaryImage;
    modalMainImg.alt = product.name;

    // Thumbnails
    modalThumbs.innerHTML = `
      <button class="thumb-btn active" data-src="${product.primaryImage}">
        <img src="${product.primaryImage}" alt="${product.name}">
      </button>
      <button class="thumb-btn" data-src="${product.secondaryImage}">
        <img src="${product.secondaryImage}" alt="${product.name} detail">
      </button>
    `;

    modalThumbs.querySelectorAll('.thumb-btn').forEach(tb => {
      tb.addEventListener('click', () => {
        modalThumbs.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
        tb.classList.add('active');
        modalMainImg.src = tb.dataset.src;
      });
    });

    modalBadge.textContent = product.badge;
    modalTitle.textContent = product.name;
    modalSku.textContent = `SKU: ${product.sku} | ${product.categoryName} | ${product.rating.toFixed(1)} ★ (${product.reviewsCount} verified reviews)`;

    modalPrice.textContent = formatPrice(product.priceINR);
    modalOriginalPrice.textContent = formatPrice(product.originalPriceINR);

    modalFabric.textContent = product.fabric;
    modalWork.textContent = product.work;
    modalColor.textContent = product.color;
    modalLeadTime.textContent = product.leadTime;
    modalInclusions.textContent = product.inclusions;

    updateModalWhatsappLink();
  }

  function updateModalWhatsappLink() {
    if (!state.activeProductModal || !modalWhatsappBtn) return;
    const prod = state.activeProductModal;
    const formattedPrice = formatPrice(prod.priceINR);

    const message = encodeURIComponent(
      `Hello Kuljit Fashions Ambala!\n\n` +
      `I would like to order / consult about this couture design:\n` +
      `• *${prod.name}*\n` +
      `• SKU: ${prod.sku}\n` +
      `• Quoted Price: ${formattedPrice} (${state.currentCurrency})\n` +
      `• Selected Tailoring: ${state.selectedStitching}\n` +
      `• Lead Time: ${prod.leadTime}\n\n` +
      `Please assist me with fabric confirmation, customization, and delivery to my location.`
    );

    modalWhatsappBtn.href = `https://wa.me/${KULJIT_CONFIG.whatsapp}?text=${message}`;
  }

  // Stitching Selector in Modal
  stitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedStitching = btn.textContent.trim();
      updateModalWhatsappLink();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProductModal();
    });
  }

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProductModal();
    }
  });

  // ==============================================================================
  // 5. INTERACTIVE BRIDAL TROUSSEAU BUDGET PLANNER
  // ==============================================================================
  const plannerOptions = document.querySelectorAll('.planner-option');
  const plannerSummaryList = document.getElementById('planner-summary-list');
  const plannerTotalAmount = document.getElementById('planner-total-amount');
  const plannerWhatsappBtn = document.getElementById('planner-whatsapp-btn');

  const PLANNER_PRICES_INR = {
    'bridal-lehenga': { title: "Heavy Zardozi Bridal Lehenga (Main Wedding)", price: 85000 },
    'reception-gown': { title: "Designer Reception Gown / Indo-Western", price: 32000 },
    'sangeet-suit': { title: "Flared Anarkali / Gotapatti Sangeet Ensemble", price: 18500 },
    'mehendi-sharara': { title: "Vibrant Mehendi Mirror-work Sharara Set", price: 19800 },
    'banarasi-saree': { title: "Pure Katan Banarasi Silk Heirloom Saree", price: 28900 },
    'bridesmaid-set': { title: "Trousseau Family Pack (3 Heavy Suits)", price: 36000 }
  };

  function updatePlannerEstimate() {
    if (!plannerSummaryList || !plannerTotalAmount) return;

    let totalINR = 0;
    const selectedItems = [];

    plannerOptions.forEach(opt => {
      const key = opt.dataset.key;
      const isSelected = state.plannerSelection[key];
      opt.classList.toggle('selected', !!isSelected);

      if (isSelected && PLANNER_PRICES_INR[key]) {
        const item = PLANNER_PRICES_INR[key];
        totalINR += item.price;
        selectedItems.push(item);
      }
    });

    // Render Summary List
    if (selectedItems.length === 0) {
      plannerSummaryList.innerHTML = `<li style="justify-content: center; color: var(--color-gold-light);">Please select at least one outfit above</li>`;
    } else {
      plannerSummaryList.innerHTML = selectedItems.map(item => `
        <li>
          <span>${item.title}</span>
          <strong>${formatPrice(item.price)}</strong>
        </li>
      `).join('');
    }

    plannerTotalAmount.textContent = formatPrice(totalINR);

    // Update WhatsApp Consultation CTA
    if (plannerWhatsappBtn) {
      const waText = encodeURIComponent(
        `Hello Kuljit Fashions Ambala!\n\n` +
        `I planned my custom bridal trousseau package on your website:\n` +
        selectedItems.map(it => `• ${it.title} - ${formatPrice(it.price)}`).join('\n') +
        `\n\nEstimated Total: ${formatPrice(totalINR)} (${state.currentCurrency})\n\n` +
        `I would like to book a 1-on-1 virtual styling session to finalize these designs!`
      );
      plannerWhatsappBtn.href = `https://wa.me/${KULJIT_CONFIG.whatsapp}?text=${waText}`;
    }
  }

  plannerOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const key = opt.dataset.key;
      state.plannerSelection[key] = !state.plannerSelection[key];
      updatePlannerEstimate();
    });
  });

  // ==============================================================================
  // 6. FAQ ACCORDION LOGIC
  // ==============================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ==============================================================================
  // 7. FORMS HANDLING & TOAST ALERTS
  // ==============================================================================
  function showToast(message) {
    if (!toastNotice || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4500);
  }

  // Video Booking Form
  if (videoBookingForm) {
    videoBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('v-name').value.trim();
      const phone = document.getElementById('v-phone').value.trim();
      const country = document.getElementById('v-country').value;
      const date = document.getElementById('v-date').value;
      const notes = document.getElementById('v-notes').value.trim();

      const message = encodeURIComponent(
        `*NRI Video Shopping Appointment Request*\n\n` +
        `• Name: ${name}\n` +
        `• WhatsApp / Phone: ${phone}\n` +
        `• Country / Timezone: ${country}\n` +
        `• Preferred Date: ${date}\n` +
        `• Requirements: ${notes || 'General Bridal & Ethnic Wear'}\n\n` +
        `Sent via Kuljit Fashions Ambala Website`
      );

      showToast(`Thank you, ${name}! Redirecting to WhatsApp to confirm your video appointment...`);
      setTimeout(() => {
        window.open(`https://wa.me/${KULJIT_CONFIG.whatsapp}?text=${message}`, '_blank');
      }, 1000);
      videoBookingForm.reset();
    });
  }

  // Contact / Wholesale Form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const phone = document.getElementById('c-phone').value.trim();
      const interest = document.getElementById('c-interest').value;
      const inquiry = document.getElementById('c-message').value.trim();

      const message = encodeURIComponent(
        `*Ambala Showroom / Wholesale Inquiry*\n\n` +
        `• Name: ${name}\n` +
        `• Phone: ${phone}\n` +
        `• Email: ${email}\n` +
        `• Interest Category: ${interest}\n` +
        `• Message: ${inquiry}\n\n` +
        `Sent via Kuljit Fashions Ambala Website`
      );

      showToast(`Thank you, ${name}! Your inquiry has been received. Our team will contact you promptly.`);
      setTimeout(() => {
        window.open(`https://wa.me/${KULJIT_CONFIG.whatsapp}?text=${message}`, '_blank');
      }, 1200);
      contactForm.reset();
    });
  }

  // Initial Application Boot
  renderProducts();
  updatePlannerEstimate();
});
