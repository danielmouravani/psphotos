import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Loader
const loader = document.querySelector('.loader');
const progress = document.querySelector('.progress');
const loaderText = document.querySelector('.loader-text');

window.addEventListener('load', () => {
    let tl = gsap.timeline();
    if (progress && loaderText && loader) {
        tl.to(progress, { width: '100%', duration: 1.5, ease: 'power2.inOut' })
          .to(loaderText, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }, '-=0.5')
          .to(loader, { yPercent: -100, duration: 1, ease: 'expo.inOut', delay: 0.5, onComplete: () => { loader.style.display = 'none'; } })
          .from('.hero-title', { y: 100, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.5')
          .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=0.8')
          .from('.btn-primary', { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.6');
    }
});


import { imagesData } from './images-data.js';

// 3. Images list
const images = imagesData;

// 4. Carousel Inject
const trackTop = document.getElementById('track-top');
const trackBottom = document.getElementById('track-bottom');

if(trackTop && trackBottom) {
    const carouselImages = [
        { src: 'imagens/ensaio 11.jpeg' },
        { src: 'imagens/profissional111.jpeg' },
        { src: 'imagens/paisagem 8.jpeg' },
        { src: 'imagens/esporteee.jpeg' },
        { src: 'imagens/esporte111.jpeg' },
        { src: 'imagens/ensaiozao.jpeg' },
        { src: 'imagens/esporte.jpeg' },
        { src: 'imagens/ensaio 14.jpeg' },
        { src: 'imagens/ensaio 9.jpeg' },
        { src: 'imagens/esporte88.jpeg' },
        { src: 'imagens/profissional2.jpeg' }
    ];

    const half = Math.ceil(carouselImages.length / 2);
    const topImages = carouselImages.slice(0, half);
    const bottomImages = carouselImages.slice(half);

    let topHtml = '';
    topImages.forEach((img, i) => {
        let lazy = i > 2 ? 'loading="lazy"' : '';
        topHtml += `<img src="/${img.src}" alt="Gallery image" decoding="async" ${lazy}>`;
    });
    trackTop.innerHTML = topHtml + topHtml;
    
    let bottomHtml = '';
    bottomImages.forEach((img, i) => {
        let lazy = i > 2 ? 'loading="lazy"' : '';
        bottomHtml += `<img src="/${img.src}" alt="Gallery image" decoding="async" ${lazy}>`;
    });
    trackBottom.innerHTML = bottomHtml + bottomHtml;

    gsap.to(trackTop, { xPercent: -50, ease: 'none', duration: 120, repeat: -1 });
    gsap.to(trackBottom, { xPercent: 0, ease: 'none', duration: 120, repeat: -1, startAt: { xPercent: -50 } });
}

// 5. Masonry Gallery
const masonryGrid = document.getElementById('masonry-gallery');
const btnLoadMore = document.getElementById('btn-load-more');

let currentFilter = 'all';
let itemsToShow = 9;

function renderGallery() {
    if(!masonryGrid) return;
    masonryGrid.innerHTML = '';
    
    const filteredImages = images.filter(img => currentFilter === 'all' || img.category === currentFilter);
    const imagesToRender = filteredImages.slice(0, itemsToShow);
    
    imagesToRender.forEach((img, i) => {
        const item = document.createElement('div');
        item.className = `masonry-item ${img.category}`;
        item.dataset.category = img.category;
        item.innerHTML = `
            <img src="/${img.src}" alt="${img.title}" loading="lazy" decoding="async">
            <div class="item-overlay">
                <h3 style="text-transform: capitalize;">${img.category}</h3>
            </div>
        `;
        masonryGrid.appendChild(item);

        item.addEventListener('click', () => {
            openLightbox(`/${img.src}`, img.title);
        });
    });

    if (btnLoadMore) {
        if (itemsToShow >= filteredImages.length) {
            btnLoadMore.style.display = 'none';
        } else {
            btnLoadMore.style.display = 'inline-block';
        }
    }
}

if(masonryGrid) {
    renderGallery();

    if (btnLoadMore) {
        btnLoadMore.addEventListener('click', () => {
            itemsToShow += 9;
            renderGallery();
        });
    }

    // Filters
    const filterBtns = document.querySelectorAll('.btn-filter');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            currentFilter = e.target.getAttribute('data-filter');
            itemsToShow = 9;
            renderGallery();
        });
    });
}

// 6. Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, caption) {
    if(lightbox) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if(lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if(lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if(lightbox) {
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            closeLightbox();
        }
    });
}

// 7. Navigation / Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const links = document.querySelectorAll('.nav-link, .btn-contact');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}
