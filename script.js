const conferences = [
    {
        id: 1,
        category: "Медицина",
        title: "Квантові обчислення в медицині",
        subtitle: "Нові горизонти діагностики",
        desc: "Дослідження застосування квантових алгоритмів для ранньої діагностики онкологічних захворювань.",
        date: "15 листопада 2025 р.",
        fullDate: "субота, 15 листопада 2025 р.",
        location: "Вінниця, Україна",
        authors: ["Іванова О.М.", "Петренко В.І."],
        organizer: "Вінницький національний медичний університет",
        keywords: ["квантові обчислення", "медична діагностика", "онкологія"],
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
        poster: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=1100&fit=crop"
    },
    {
        id: 2,
        category: "Агротехнології",
        title: "Штучний інтелект в аграрному секторі",
        subtitle: "Розумне землеробство майбутнього",
        desc: "Впровадження систем машинного навчання для прогнозування та оптимізації врожайності.",
        date: "20 вересня 2025 р.",
        fullDate: "субота, 20 вересня 2025 р.",
        location: "Вінниця, Україна",
        authors: ["Коваленко А.П.", "Сидоренко Т.В."],
        organizer: "Вінницький національний аграрний університет",
        keywords: ["штучний інтелект", "агротехнології", "машинне навчання"],
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop",
        poster: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=1100&fit=crop"
    },
    {
        id: 3,
        category: "Енергетика",
        title: "Нанотехнології в енергетиці",
        subtitle: "Ефективність нового покоління",
        desc: "Розробка наноструктурованих матеріалів для підвищення ефективності сонячних панелей.",
        date: "5 жовтня 2025 р.",
        fullDate: "неділя, 5 жовтня 2025 р.",
        location: "Вінниця, Україна",
        authors: ["Бондаренко І.С.", "Мельник О.В."],
        organizer: "Вінницький національний технічний університет",
        keywords: ["нанотехнології", "сонячна енергетика", "матеріалознавство"],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
        poster: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=1100&fit=crop"
    },
    {
        id: 4,
        category: "Інформаційні технології",
        title: "Кібербезпека критичної інфраструктури",
        subtitle: "Захист цифрового простору",
        desc: "Аналіз сучасних методів криптографічного захисту в контексті кіберзагроз нового покоління.",
        date: "12 серпня 2025 р.",
        fullDate: "вівторок, 12 серпня 2025 р.",
        location: "Вінниця, Україна",
        authors: ["Ткаченко Д.О.", "Романюк Л.М."],
        organizer: "Вінницький національний технічний університет",
        keywords: ["кібербезпека", "криптографія", "інфраструктура"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
        poster: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=1100&fit=crop"
    },
    {
        id: 5,
        category: "Біологія",
        title: "Біоінформатика та геномні дослідження",
        subtitle: "Розшифровка генетичного коду",
        desc: "Використання big data для аналізу геномних послідовностей та персоналізованої медицини.",
        date: "28 липня 2025 р.",
        fullDate: "понеділок, 28 липня 2025 р.",
        location: "Вінниця, Україна",
        authors: ["Шевченко К.Б.", "Литвин Н.А."],
        organizer: "Вінницький державний педагогічний університет",
        keywords: ["біоінформатика", "геноміка", "big data"],
        image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop",
        poster: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=1100&fit=crop"
    },
    {
        id: 6,
        category: "Екологія",
        title: "Екологічний моніторинг міст",
        subtitle: "Чисте повітря для кожного",
        desc: "Створення розподіленої системи моніторингу якості повітря та води в урбанізованих територіях.",
        date: "14 червня 2025 р.",
        fullDate: "субота, 14 червня 2025 р.",
        location: "Вінниця, Україна",
        authors: ["Гриценко О.П.", "Федорчук В.С."],
        organizer: "Вінницький національний технічний університет",
        keywords: ["екологія", "моніторинг", "урбаністика"],
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop",
        poster: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=1100&fit=crop"
    },
    {
        id: 7,
        category: "Нейронаука",
        title: "Нейронаука та когнітивні технології",
        subtitle: "Мозок і машина",
        desc: "Розробка неінвазивних BCI для реабілітації пацієнтів з неврологічними порушеннями.",
        date: "3 грудня 2025 р.",
        fullDate: "середа, 3 грудня 2025 р.",
        location: "Вінниця, Україна",
        authors: ["Козлова М.І.", "Дмитренко С.А."],
        organizer: "Вінницький національний медичний університет",
        keywords: ["нейронаука", "BCI", "реабілітація"],
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
        poster: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=1100&fit=crop"
    },
    {
        id: 8,
        category: "Матеріалознавство",
        title: "Матеріалознавство для космічної галузі",
        subtitle: "Матеріали нового покоління",
        desc: "Синтез та тестування нових композитних матеріалів для аерокосмічних застосувань.",
        date: "22 травня 2025 р.",
        fullDate: "четвер, 22 травня 2025 р.",
        location: "Вінниця, Україна",
        authors: ["Павленко Р.В.", "Кравчук Ю.О."],
        organizer: "Вінницький національний технічний університет",
        keywords: ["матеріалознавство", "композити", "аерокосмічна галузь"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
        poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=1100&fit=crop"
    }
];

let currentCategory = 'all';
let searchQuery = '';

function renderCards(data) {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = '';

    data.forEach(conf => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => showDetail(conf.id);
        card.innerHTML = `
            <div class="card-img">
                <img src="${conf.image}" alt="${conf.title}" loading="lazy">
                <span class="card-badge">${conf.category}</span>
            </div>
            <div class="card-body">
                <div class="card-title">${conf.title}</div>
                <div class="card-desc">${conf.desc}</div>
                <div class="card-date">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    ${conf.date}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    document.getElementById('confCount').textContent = data.length;
}

function filterConferences() {
    searchQuery = document.getElementById('searchInput').value.toLowerCase();
    applyFilters();
}

function filterByCategory(category, btn) {
    currentCategory = category;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
}

function applyFilters() {
    let filtered = conferences;

    if (currentCategory !== 'all') {
        filtered = filtered.filter(c => c.category === currentCategory);
    }

    if (searchQuery) {
        filtered = filtered.filter(c =>
            c.title.toLowerCase().includes(searchQuery) ||
            c.desc.toLowerCase().includes(searchQuery) ||
            c.category.toLowerCase().includes(searchQuery) ||
            c.authors.some(a => a.toLowerCase().includes(searchQuery)) ||
            c.keywords.some(k => k.toLowerCase().includes(searchQuery))
        );
    }

    renderCards(filtered);
}

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
    window.scrollTo(0, 0);
}

function showPage(pageId) {
    document.querySelectorAll('main').forEach(m => m.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
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

// Initial render
renderCards(conferences);
