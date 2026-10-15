// KRITI TOURS AND TRAVELS - Main JavaScript Application
// Handles Package rendering, dynamic filters, currency conversion, modal itineraries,
// live price calculators, custom tour wizard, and interactive guides.

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentCurrency = 'INR';
  let activeCategory = 'all';
  let activeSort = 'recommended';
  let currentModalPackage = null;

  // Currency Exchange Rates (Base: INR)
  const EXCHANGE_RATES = {
    INR: { symbol: '₹', rate: 1, suffix: '' },
    USD: { symbol: '$', rate: 0.012, suffix: '' },
    MYR: { symbol: 'RM ', rate: 0.053, suffix: '' }
  };

  // DOM Elements
  const packagesGrid = document.getElementById('packages-grid');
  const packageCountBadge = document.getElementById('package-count-badge');
  const currencySelector = document.getElementById('currency-select');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const sortSelect = document.getElementById('sort-select');
  const searchForm = document.getElementById('hero-search-form');
  const modalOverlay = document.getElementById('itinerary-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Format Price with active currency
  function formatPrice(amountInINR) {
    const config = EXCHANGE_RATES[currentCurrency] || EXCHANGE_RATES.INR;
    const converted = Math.round(amountInINR * config.rate);
    return `${config.symbol}${converted.toLocaleString('en-IN')}${config.suffix}`;
  }

  // Render Packages Grid
  function renderPackages(packagesToRender) {
    if (!packagesGrid) return;

    if (packagesToRender.length === 0) {
      packagesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #fff; border-radius: 16px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🌴</div>
          <h3 style="font-size: 1.4rem; color: #0b1e36; margin-bottom: 0.5rem;">No packages matched your filters</h3>
          <p style="color: #64748b; margin-bottom: 1.5rem;">Try adjusting your destination, budget or duration filters to explore other Malaysia tours.</p>
          <button class="btn-primary" onclick="resetFilters()">View All Malaysia Packages</button>
        </div>
      `;
      if (packageCountBadge) packageCountBadge.textContent = '0 packages available';
      return;
    }

    if (packageCountBadge) {
      packageCountBadge.textContent = `${packagesToRender.length} curated packages found`;
    }

    packagesGrid.innerHTML = packagesToRender.map(pkg => `
      <article class="package-card" data-id="${pkg.id}">
        <div class="package-img-wrapper">
          <img src="${pkg.image}" alt="${pkg.title}" class="package-img" loading="lazy">
          <span class="package-badge"><i class="fa-solid fa-star"></i> ${pkg.badge}</span>
          <span class="package-duration-pill"><i class="fa-regular fa-clock"></i> ${pkg.durationText}</span>
        </div>

        <div class="package-content">
          <div class="package-route">
            <i class="fa-solid fa-location-dot"></i>
            <span>${pkg.route}</span>
          </div>

          <h3 class="package-title">${pkg.title}</h3>

          <div class="package-rating">
            <span class="star-rating">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star-half-stroke"></i>
            </span>
            <strong>${pkg.rating}</strong>
            <span>(${pkg.reviewCount} verified reviews)</span>
          </div>

          <div class="inclusions-preview">
            <ul>
              ${pkg.inclusions.slice(0, 4).map(item => `
                <li><i class="fa-solid fa-circle-check"></i> <span>${item}</span></li>
              `).join('')}
            </ul>
          </div>

          <div class="package-footer">
            <div class="package-price-row">
              <div class="price-block">
                <span class="price-label">Starting Price / Person</span>
                <div>
                  <span class="price-amount">${formatPrice(pkg.priceINR)}</span>
                  <span class="original-price">${formatPrice(pkg.originalPriceINR)}</span>
                </div>
                <span class="emi-tag">EMI from ${formatPrice(pkg.emiStartsINR)}/mo</span>
              </div>
            </div>

            <div class="package-action-btns">
              <button class="btn-outline view-itinerary-btn" data-id="${pkg.id}">
                <i class="fa-regular fa-file-lines"></i> Itinerary
              </button>
              <button class="btn-primary book-package-btn" data-id="${pkg.id}">
                <i class="fa-solid fa-paper-plane"></i> Book Now
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join('');

    // Attach Event Listeners to cards
    document.querySelectorAll('.view-itinerary-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openItineraryModal(id);
      });
    });

    document.querySelectorAll('.book-package-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openBookingDirect(id);
      });
    });
  }

  // Filter & Sort Logic
  function getFilteredPackages() {
    let result = [...MALAYSIA_PACKAGES];

    // Filter by Category Tab
    if (activeCategory !== 'all') {
      result = result.filter(pkg => pkg.category === activeCategory);
    }

    // Filter by Sort
    if (activeSort === 'price-low') {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (activeSort === 'price-high') {
      result.sort((a, b) => b.priceINR - a.priceINR);
    } else if (activeSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === 'duration') {
      result.sort((a, b) => b.durationDays - a.durationDays);
    }

    return result;
  }

  // Update Packages View
  function refreshPackages() {
    const list = getFilteredPackages();
    renderPackages(list);
  }

  // Reset Filters Global Helper
  window.resetFilters = function() {
    activeCategory = 'all';
    filterTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-filter') === 'all');
    });
    refreshPackages();
  };

  // Filter Tabs Click
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-filter');
      refreshPackages();
    });
  });

  // Sort Selection
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      refreshPackages();
    });
  }

  // Currency Selection
  if (currencySelector) {
    currencySelector.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      refreshPackages();
      if (currentModalPackage) {
        updateModalPricing();
      }
      showToast(`Currency switched to ${currentCurrency}`);
    });
  }

  // Hero Search Form
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dest = document.getElementById('search-destination').value.toLowerCase();
      const duration = document.getElementById('search-duration').value;
      const theme = document.getElementById('search-theme').value;

      let filtered = [...MALAYSIA_PACKAGES];

      if (dest !== 'all') {
        filtered = filtered.filter(p => p.route.toLowerCase().includes(dest) || p.title.toLowerCase().includes(dest));
      }

      if (duration === 'short') {
        filtered = filtered.filter(p => p.durationDays <= 5);
      } else if (duration === 'medium') {
        filtered = filtered.filter(p => p.durationDays >= 6 && p.durationDays <= 7);
      } else if (duration === 'long') {
        filtered = filtered.filter(p => p.durationDays > 7);
      }

      if (theme !== 'all') {
        filtered = filtered.filter(p => p.category === theme);
      }

      renderPackages(filtered);

      // Smooth scroll down to packages section
      const targetSec = document.getElementById('packages-section');
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // =========================================================================
  // ITINERARY MODAL & DYNAMIC PRICE CALCULATOR
  // =========================================================================
  function openItineraryModal(packageId) {
    const pkg = MALAYSIA_PACKAGES.find(p => p.id === packageId);
    if (!pkg) return;
    currentModalPackage = pkg;

    document.getElementById('modal-pkg-img').src = pkg.gallery[0] || pkg.image;
    document.getElementById('modal-pkg-title').textContent = pkg.title;
    document.getElementById('modal-pkg-route').textContent = pkg.route;
    document.getElementById('modal-pkg-duration').textContent = pkg.durationText;

    // Timeline Days
    const timelineContainer = document.getElementById('modal-timeline-container');
    timelineContainer.innerHTML = pkg.itinerary.map(item => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-day">Day ${item.day}</div>
        <h4 class="timeline-title">${item.title}</h4>
        <p class="timeline-desc">${item.description}</p>
      </div>
    `).join('');

    // Inclusions & Exclusions
    const incContainer = document.getElementById('modal-inclusions-list');
    incContainer.innerHTML = pkg.inclusions.map(i => `
      <li style="display: flex; gap: 0.5rem; align-items: flex-start; margin-bottom: 0.5rem;">
        <i class="fa-solid fa-circle-check" style="color: var(--accent-teal); margin-top: 0.2rem;"></i>
        <span>${i}</span>
      </li>
    `).join('');

    const excContainer = document.getElementById('modal-exclusions-list');
    excContainer.innerHTML = pkg.exclusions.map(e => `
      <li style="display: flex; gap: 0.5rem; align-items: flex-start; margin-bottom: 0.5rem;">
        <i class="fa-solid fa-circle-xmark" style="color: var(--danger); margin-top: 0.2rem;"></i>
        <span>${e}</span>
      </li>
    `).join('');

    // Default dates in calculator
    const today = new Date();
    today.setDate(today.getDate() + 14);
    const dateInput = document.getElementById('calc-travel-date');
    if (dateInput) {
      dateInput.value = today.toISOString().split('T')[0];
    }

    updateModalPricing();

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateModalPricing() {
    if (!currentModalPackage) return;
    const adults = parseInt(document.getElementById('calc-adults')?.value || 2, 10);
    const children = parseInt(document.getElementById('calc-children')?.value || 0, 10);
    const hotelTier = document.getElementById('calc-hotel-tier')?.value || '4star';

    let tierMultiplier = 1;
    if (hotelTier === '5star') tierMultiplier = 1.35;
    if (hotelTier === '3star') tierMultiplier = 0.85;

    const baseAdultPrice = currentModalPackage.priceINR * tierMultiplier;
    const childPrice = baseAdultPrice * 0.70; // 30% discount for child

    const totalINR = Math.round((adults * baseAdultPrice) + (children * childPrice));

    const totalDisplay = document.getElementById('calc-total-display');
    if (totalDisplay) {
      totalDisplay.textContent = formatPrice(totalINR);
    }

    const perPersonDisplay = document.getElementById('calc-per-person-display');
    if (perPersonDisplay) {
      perPersonDisplay.textContent = `${formatPrice(Math.round(baseAdultPrice))} / adult`;
    }
  }

  // Calculator Listeners
  ['calc-adults', 'calc-children', 'calc-hotel-tier'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateModalPricing);
  });

  // Modal Tabs (Overview / Timeline / Inclusions / Calculator)
  const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
  modalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');

      document.querySelectorAll('.modal-tab-pane').forEach(pane => {
        pane.style.display = 'none';
      });

      const activePane = document.getElementById(`modal-tab-${target}`);
      if (activePane) activePane.style.display = 'block';
    });
  });

  // Close Modal
  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      currentModalPackage = null;
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Direct Booking Handler
  function openBookingDirect(packageId) {
    const pkg = MALAYSIA_PACKAGES.find(p => p.id === packageId);
    if (!pkg) return;
    
    // Smooth scroll down to callback/booking banner and pre-fill form
    const leadPackageInput = document.getElementById('lead-package-select');
    if (leadPackageInput) {
      leadPackageInput.value = pkg.title;
    }
    const callbackSection = document.getElementById('callback-section');
    if (callbackSection) {
      callbackSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Selected "${pkg.title}". Fill your details below to get instant quote!`);
  }

  // Modal Book Button
  const modalBookBtn = document.getElementById('modal-book-now-btn');
  if (modalBookBtn) {
    modalBookBtn.addEventListener('click', () => {
      if (currentModalPackage) {
        const title = currentModalPackage.title;
        closeModal();
        const leadPackageInput = document.getElementById('lead-package-select');
        if (leadPackageInput) leadPackageInput.value = title;
        const callbackSection = document.getElementById('callback-section');
        if (callbackSection) callbackSection.scrollIntoView({ behavior: 'smooth' });
        showToast(`Ready to book ${title}! Submit your contact details.`);
      }
    });
  }

  // Modal WhatsApp Button
  const modalWhatsAppBtn = document.getElementById('modal-whatsapp-btn');
  if (modalWhatsAppBtn) {
    modalWhatsAppBtn.addEventListener('click', () => {
      if (currentModalPackage) {
        const text = encodeURIComponent(`Hi Kriti Tours and Travels, I am interested in booking the "${currentModalPackage.title}" (${currentModalPackage.durationText}) for Malaysia. Please share the complete package details and best offer.`);
        window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
      }
    });
  }

  // =========================================================================
  // DESTINATIONS SHOWCASE RENDERING
  // =========================================================================
  const destinationsGrid = document.getElementById('destinations-grid');
  if (destinationsGrid && typeof DESTINATIONS_DATA !== 'undefined') {
    destinationsGrid.innerHTML = DESTINATIONS_DATA.map(dest => `
      <div class="destination-card" onclick="filterByDestination('${dest.name}')">
        <img src="${dest.image}" alt="${dest.name}" class="destination-img" loading="lazy">
        <div class="destination-overlay">
          <span class="destination-tag">${dest.idealDays} • ${dest.bestFor}</span>
          <h3 class="destination-name">${dest.name}</h3>
          <p style="font-size: 0.85rem; color: #fef08a; font-weight: 500;">${dest.tagline}</p>
          <div class="destination-highlights">
            ${dest.highlights.map(h => `<span class="dest-tag-pill">${h}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  window.filterByDestination = function(destName) {
    const matched = MALAYSIA_PACKAGES.filter(p => p.route.includes(destName) || p.title.includes(destName));
    renderPackages(matched.length > 0 ? matched : MALAYSIA_PACKAGES);
    const targetSec = document.getElementById('packages-section');
    if (targetSec) targetSec.scrollIntoView({ behavior: 'smooth' });
    showToast(`Showing packages covering ${destName}`);
  };

  // =========================================================================
  // TRAVEL GUIDE TABS
  // =========================================================================
  const guideTabBtns = document.querySelectorAll('.guide-tab-btn');
  guideTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      guideTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-guide-tab');

      document.querySelectorAll('.guide-pane').forEach(p => p.style.display = 'none');
      const activePane = document.getElementById(`guide-pane-${tabId}`);
      if (activePane) activePane.style.display = 'block';
    });
  });

  // =========================================================================
  // CUSTOM TOUR BUILDER WIZARD
  // =========================================================================
  const builderOptions = document.querySelectorAll('.builder-option-box');
  builderOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const parentGrid = opt.parentElement;
      const isMulti = parentGrid.getAttribute('data-multiselect') === 'true';

      if (!isMulti) {
        parentGrid.querySelectorAll('.builder-option-box').forEach(b => b.classList.remove('selected'));
        opt.classList.add('selected');
      } else {
        opt.classList.toggle('selected');
      }
    });
  });

  const builderForm = document.getElementById('custom-builder-form');
  if (builderForm) {
    builderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('builder-name').value;
      const phone = document.getElementById('builder-phone').value;
      const days = document.getElementById('builder-days').value;

      showToast(`🎉 Thank you ${name}! Your custom ${days}-day Malaysia holiday plan is being prepared. Our specialist will call you shortly on ${phone}.`);
      builderForm.reset();
    });
  }

  // =========================================================================
  // TESTIMONIALS RENDERING
  // =========================================================================
  const testimonialsGrid = document.getElementById('testimonials-grid');
  if (testimonialsGrid && typeof TESTIMONIALS_DATA !== 'undefined') {
    testimonialsGrid.innerHTML = TESTIMONIALS_DATA.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar">
          <div class="testimonial-meta">
            <h4>${t.name}</h4>
            <p>${t.city} • ${t.date}</p>
            <div style="color: #eab308; font-size: 0.8rem; margin-top: 0.2rem;">
              ★★★★★ <span style="color: #64748b; font-weight: 600;">Verified Traveler</span>
            </div>
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--accent-teal-dark); font-weight: 700; margin-bottom: 0.75rem;">
          <i class="fa-solid fa-map-pin"></i> ${t.package}
        </div>
        <p class="testimonial-comment">"${t.comment}"</p>
      </div>
    `).join('');
  }

  // =========================================================================
  // FAQ ACCORDION
  // =========================================================================
  const faqContainer = document.getElementById('faq-accordion');
  if (faqContainer && typeof FAQS_DATA !== 'undefined') {
    faqContainer.innerHTML = FAQS_DATA.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}">
        <button class="faq-question">
          <span>${faq.q}</span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="faq-answer">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // =========================================================================
  // LEAD CALLBACK FORM
  // =========================================================================
  const callbackForm = document.getElementById('callback-request-form');
  if (callbackForm) {
    callbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lead-name').value;
      const phone = document.getElementById('lead-phone').value;
      const pkg = document.getElementById('lead-package-select').value;

      showToast(`Thank you, ${name}! Your request for "${pkg}" has been received. Our Malaysia travel advisor will call you at ${phone} in 15 mins.`);
      callbackForm.reset();
    });
  }

  // Mobile Menu Drawer
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = '#ffffff';
        navMenu.style.padding = '1.5rem';
        navMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        navMenu.style.zIndex = '99';
      }
    });
  }

  // Toast Function
  function showToast(msg) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-gold);"></i> <span>${msg}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Initial render
  refreshPackages();
});
