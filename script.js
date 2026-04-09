const SHEET_ID = '1wxAS87KswC_pMIpvvrQX8ZBlCxeQsugWD9vDq5MUy_4';

function getSheetURL(sheetName) {
    return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const values = [];
        let current = '';
        let inQuotes = false;
        for (const ch of lines[i]) {
            if (ch === '"') { inQuotes = !inQuotes; }
            else if (ch === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
            else { current += ch; }
        }
        values.push(current.trim());
        const row = {};
        headers.forEach((h, idx) => { row[h] = values[idx] || ''; });
        rows.push(row);
    }
    return rows;
}

// Fallback data for programs (used when Google Sheets is unavailable)
const fallbackPrograms = [
    { year: '2018', title: 'ПРОГРАМА 2018 року', link: 'https://drive.google.com/file/d/1SQc34T_H7GbYmhbh-6OA0Nqe0bXwhyRV/view' },
    { year: '2019', title: 'ПРОГРАМА 2019 року', link: 'https://drive.google.com/file/d/16QRQr_nfH8VLGS9qumE3RFxFqM75M5jI/view' },
    { year: '2020', title: 'ПРОГРАМА 2020 року', link: 'https://drive.google.com/file/d/1N-B531XXOos0n_CWkuep_nzjzYwnKIRc/view' },
    { year: '2021', title: 'ПРОГРАМА 2021 року', link: 'https://drive.google.com/file/d/1dd7z9im4HURaFM3Vq1QqIFG2w4EWZjbJ/view' },
    { year: '2023', title: 'ПРОГРАМА 2023 року', link: 'https://drive.google.com/file/d/11MG5bQr3oxeNbA9Ta6pIFj5gch7yNlPh/view' },
    { year: '2024', title: 'ПРОГРАМА 2024 року', link: 'https://drive.google.com/file/d/1P4eR20CDP03x9aSXFun-D_uTpWmtiGED/view' },
    { year: '2025', title: 'ПРОГРАМА 2025 року', link: 'https://drive.google.com/file/d/1u4xXd7tRf04Fm1UbT7JqWtBwDpbaa6PG/view' },
    { year: '2026', title: 'ПРОГРАМА 2026 року', link: 'https://drive.google.com/file/d/1iixl9tkIVrobAqN4uDBHLiBOuR3iT4MS/view' }
];

const docIconSVG = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4285f4" stroke-width="1.5">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
</svg>`;

function renderPrograms(programs) {
    const grid = document.getElementById('programsGrid');
    if (!grid) return;
    grid.innerHTML = programs.map(p => `
        <a href="${p.link}" class="doc-card" target="_blank">
            <div class="doc-icon">${docIconSVG}</div>
            <h3>${p.title}</h3>
            <span class="doc-type">.docx</span>
        </a>
    `).join('');
}

let allCertificates = [];

const certTypeNames = {
    'students': 'Сертифікати студентів',
    'organizers': 'Сертифікати орг.комітету',
    'teachers': 'Сертифікати викладачів',
    'listeners': 'Сертифікати слухачів'
};

const certIconSVG = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <line x1="8" y1="6" x2="16" y2="6"/>
    <line x1="8" y1="10" x2="16" y2="10"/>
    <line x1="8" y1="14" x2="12" y2="14"/>
    <circle cx="15" cy="17" r="2"/>
    <path d="M13.5 19L15 22l1.5-3"/>
</svg>`;

function renderCertificates(certificates) {
    allCertificates = certificates;

    const typeMap = {
        'students': 'certStudents',
        'organizers': 'certOrganizers',
        'teachers': 'certTeachers',
        'listeners': 'certListeners'
    };

    // Group by type
    const grouped = {};
    certificates.forEach(c => {
        if (!grouped[c.type]) grouped[c.type] = [];
        grouped[c.type].push(c);
    });

    // Render each certificate group in sidebar — years link to certificate page
    Object.keys(typeMap).forEach(type => {
        const container = document.getElementById(typeMap[type]);
        if (!container) return;
        const items = grouped[type] || [];
        if (items.length === 0) {
            container.innerHTML = '<a href="#" style="opacity:0.5">Немає даних</a>';
        } else {
            // Get unique years
            const years = [...new Set(items.map(c => c.year))].sort();
            container.innerHTML = years
                .map(y => `<a href="#" onclick="showCertificates('${type}', '${y}'); toggleSidebar(); return false;">${y}</a>`)
                .join('');
        }
    });
}

function showCertificates(type, year) {
    const title = certTypeNames[type] || 'Сертифікати';
    document.getElementById('certPageTitle').textContent = title;
    document.getElementById('certPageSubtitle').textContent = year + ' рік';

    const certs = allCertificates.filter(c => c.type === type && c.year === year);
    const grid = document.getElementById('certGrid');

    if (certs.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">Сертифікати не знайдені</p>';
    } else {
        const yearNum = parseInt(year);
        if (yearNum >= 2025) {
            // 2025+ — показываем как фото
            grid.className = 'gallery-grid';
            grid.innerHTML = certs.map(c => {
                const imgUrl = convertDriveLink(c.link);
                return `<img src="${imgUrl}" alt="${c.title || 'Сертифікат'}" onclick="openLightbox(this.src)" loading="lazy">`;
            }).join('');
        } else {
            // 2023-2024 — показываем как карточки документов
            grid.className = 'doc-grid';
            grid.innerHTML = certs.map(c => `
                <a href="${c.link}" class="doc-card" target="_blank">
                    <div class="doc-icon">${certIconSVG}</div>
                    <h3>${c.title || certTypeNames[type]}</h3>
                    <span class="doc-type">${c.year}</span>
                </a>
            `).join('');
        }
    }

    document.querySelectorAll('main').forEach(m => m.classList.add('hidden'));
    document.getElementById('certificatesPage').classList.remove('hidden');
    location.hash = `certificates-${type}-${year}`;
    window.scrollTo(0, 0);
}

let allGalleryItems = [];

function renderDocPage(gridId, items) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    if (items.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">Немає даних</p>';
        return;
    }
    grid.innerHTML = items.map(p => `
        <a href="${p.link}" class="doc-card" target="_blank">
            <div class="doc-icon">${docIconSVG}</div>
            <h3>${p.title}</h3>
            <span class="doc-type">.docx</span>
        </a>
    `).join('');
}

function renderGalleryYears(items) {
    allGalleryItems = items;
    const container = document.getElementById('galleryYears');
    if (!container) return;
    const years = [...new Set(items.map(i => i.year))].sort();
    if (years.length === 0) {
        container.innerHTML = '<a href="#" style="opacity:0.5">Немає даних</a>';
    } else {
        container.innerHTML = years
            .map(y => `<a href="#" onclick="showGallery('${y}'); toggleSidebar(); return false;">Фото ${y} рік</a>`)
            .join('');
    }
}

function showGallery(year) {
    document.getElementById('galleryPageTitle').textContent = 'Фотогалерея';
    document.getElementById('galleryPageSubtitle').textContent = year + ' рік';

    const photos = allGalleryItems.filter(i => i.year === year);
    const grid = document.getElementById('galleryGrid');

    if (photos.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">Фото не знайдені</p>';
    } else {
        grid.innerHTML = photos.map(p => {
            const imgUrl = convertDriveLink(p.link);
            return `<img src="${imgUrl}" alt="${p.title || 'Фото ' + p.year}" onclick="openLightbox(this.src)" loading="lazy">`;
        }).join('');
    }

    document.querySelectorAll('main').forEach(m => m.classList.add('hidden'));
    document.getElementById('galleryPage').classList.remove('hidden');
    location.hash = `gallery-${year}`;
    window.scrollTo(0, 0);
}

function convertDriveLink(url) {
    // Convert Google Drive view link to direct image link
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
}

function openLightbox(src) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `<img src="${src}" alt="Фото">`;
    lb.onclick = () => lb.remove();
    document.body.appendChild(lb);
}

async function loadSheet(sheetName) {
    try {
        const res = await fetch(getSheetURL(sheetName));
        if (res.ok) {
            const text = await res.text();
            return parseCSV(text);
        }
    } catch (e) {}
    return [];
}

async function loadFromSheets() {
    // Load all sheets in parallel
    const [programs, certificates, zbirnyky, infoList, gallery, settings, polozhennya] = await Promise.all([
        loadSheet('programs'),
        loadSheet('certificates'),
        loadSheet('zbirnyky'),
        loadSheet('info_list'),
        loadSheet('gallery'),
        loadSheet('settings'),
        loadSheet('polozhennya')
    ]);

    // Programs
    renderPrograms(programs.length > 0 ? programs : fallbackPrograms);

    // Certificates
    if (certificates.length > 0) renderCertificates(certificates);

    // Zbirnyky
    renderDocPage('zbirnykyGrid', zbirnyky);

    // Info list
    renderDocPage('infoListGrid', infoList);

    // Gallery
    renderGalleryYears(gallery);

    // Polozhennya
    const fallbackPolozhennya = [{ year: '', title: 'ПОЛОЖЕННЯ', link: 'https://drive.google.com/file/d/1_euISKyCflYIv05pR-IAqoasKnXOSME4/view' }];
    renderDocPage('polozhennyaGrid', polozhennya.length > 0 ? polozhennya : fallbackPolozhennya);

    // Settings
    const regLink = settings.find(s => s.key === 'registration_link');
    if (regLink && regLink.value) {
        const btn = document.getElementById('registerBtn');
        if (btn) btn.href = regLink.value;
    }

    // Restore page from URL hash
    restoreFromHash();
}

function restoreFromHash() {
    const hash = location.hash.slice(1);
    if (!hash) return;

    if (hash.startsWith('certificates-')) {
        const parts = hash.split('-');
        const type = parts[1];
        const year = parts[2];
        showCertificates(type, year);
    } else if (hash.startsWith('gallery-')) {
        const year = hash.split('-')[1];
        showGallery(year);
    } else if (document.getElementById(hash)) {
        showPage(hash);
    }
}

window.addEventListener('hashchange', restoreFromHash);

function showDetail(id) {
    const conf = conferences.find(c => c.id === id);
    if (!conf) return;

    document.getElementById('detailCategory').textContent = conf.category;
    document.getElementById('detailTitle').textContent = conf.title;
    document.getElementById('detailSubtitle').textContent = conf.subtitle;
    document.getElementById('detailPoster').src = conf.poster;
    document.getElementById('detailPoster').alt = conf.title;
    document.getElementById('detailDate').textContent = conf.fullDate;
    document.getElementById('detailLocation').textContent = conf.location;
    document.getElementById('detailDesc').textContent = conf.desc;
    document.getElementById('detailOrganizer').textContent = conf.organizer;

    const authorsList = document.getElementById('detailAuthors');
    authorsList.innerHTML = conf.authors.map(a => `<li>${a}</li>`).join('');

    const keywordsDiv = document.getElementById('detailKeywords');
    keywordsDiv.innerHTML = conf.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('');

    document.querySelectorAll('main').forEach(m => m.classList.add('hidden'));
    document.getElementById('detailPage').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showHome() {
    document.querySelectorAll('main').forEach(m => m.classList.add('hidden'));
    document.getElementById('mainPage').classList.remove('hidden');
    location.hash = '';
    window.scrollTo(0, 0);
}

function showPage(pageId) {
    document.querySelectorAll('main').forEach(m => m.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    location.hash = pageId;
    window.scrollTo(0, 0);
}

function openRegistration() {
    document.getElementById('registrationModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeRegistration() {
    document.getElementById('registrationModal').classList.add('hidden');
    document.body.style.overflow = '';
}

function submitRegistration(e) {
    e.preventDefault();
    closeRegistration();
    document.getElementById('regSuccess').classList.remove('hidden');
}

function closeSuccess() {
    document.getElementById('regSuccess').classList.add('hidden');
    document.body.style.overflow = '';
    document.getElementById('regForm').reset();
}

// Slider
let currentSlide = 0;
const totalSlides = 5;
let slideInterval;

function updateSlider() {
    const track = document.getElementById('sliderTrack');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function changeSlide(dir) {
    currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => changeSlide(1), 5000);
}

// Start auto-slide
slideInterval = setInterval(() => changeSlide(1), 5000);

// Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('hidden');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

function toggleGroup(btn) {
    btn.classList.toggle('expanded');
    const submenu = btn.nextElementSibling;
    submenu.classList.toggle('open');
}

// Hide main page immediately if navigating to another page
if (location.hash && location.hash !== '#') {
    const hash = location.hash.slice(1);
    document.getElementById('mainPage').classList.add('hidden');
    // Show simple pages right away (no data needed)
    if (!hash.startsWith('certificates-') && !hash.startsWith('gallery-') && document.getElementById(hash)) {
        document.getElementById(hash).classList.remove('hidden');
    }
}

// Touch swipe for slider
(function() {
    const slider = document.getElementById('slider');
    if (!slider) return;
    let startX = 0, startY = 0, diffX = 0;
    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    slider.addEventListener('touchmove', e => {
        diffX = e.touches[0].clientX - startX;
    }, { passive: true });
    slider.addEventListener('touchend', () => {
        if (Math.abs(diffX) > 50) {
            changeSlide(diffX > 0 ? -1 : 1);
        }
        diffX = 0;
    });
})();

// Touch swipe to open/close sidebar
(function() {
    let startX = 0, diffX = 0, tracking = false;
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    // Swipe right from left edge to open
    document.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        if (startX < 30 && !sidebar.classList.contains('open')) {
            tracking = true;
        }
        if (sidebar.classList.contains('open')) {
            tracking = true;
        }
    }, { passive: true });

    document.addEventListener('touchmove', e => {
        if (!tracking) return;
        diffX = e.touches[0].clientX - startX;
    }, { passive: true });

    document.addEventListener('touchend', () => {
        if (!tracking) { diffX = 0; return; }
        if (!sidebar.classList.contains('open') && diffX > 70) {
            toggleSidebar();
        } else if (sidebar.classList.contains('open') && diffX < -70) {
            toggleSidebar();
        }
        diffX = 0;
        tracking = false;
    });
})();

// Initial load
loadFromSheets();
