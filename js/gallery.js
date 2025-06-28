document.addEventListener('DOMContentLoaded', function() {
    // Sample album data
    const albums = [
        {
            id: 1,
            title: "Annual Result 2025",
            description: "Annual prize distribution ceremony for outstanding students of 2025",
            year: "2025",
            coverPhoto: "../images/gallery/annual-result-cover.jpg",
            photos: [
                { id: 2, src: "../images/gallery/annual-result-2.jpg", title: "Prize Distribution" },
                { id: 3, src: "../images/gallery/annual-result-3.jpg", title: "Student Performance" },
                { id: 4, src: "../images/gallery/annual-result-4.jpg", title: "Top Students" },
                { id: 6, src: "../images/gallery/annual-result-6.jpg", title: "Group Photo" }
            ]
        },
        {
            id: 2,
            title: "Sports Day 2023",
            description: "Annual sports competition between different houses",
            year: "2023",
            coverPhoto: "../images/gallery/sports-gala.jpg",
            photos: [
                { id: 1, src: "../images/gallery/sports-day-1.jpg", title: "Opening Ceremony" },
                { id: 2, src: "../images/gallery/sports-day-2.jpg", title: "Relay Race" },
                { id: 3, src: "../images/gallery/sports-day-3.jpg", title: "Tug of War" },
                { id: 4, src: "../images/gallery/sports-day-4.jpg", title: "High Jump" },
                { id: 5, src: "../images/gallery/sports-day-5.jpg", title: "Winners" }
            ]
        },
        {
            id: 3,
            title: "Science Fair 2023",
            description: "Student projects showcasing scientific innovation and creativity",
            year: "2023",
            coverPhoto: "../images/gallery/science-fair-cover.jpg",
            photos: [
                { id: 1, src: "../images/gallery/science-fair-1.jpg", title: "Robotics Project" },
                { id: 2, src: "../images/gallery/science-fair-2.jpg", title: "Chemistry Experiment" },
                { id: 3, src: "../images/gallery/science-fair-3.jpg", title: "Physics Demonstration" },
                { id: 4, src: "../images/gallery/science-fair-4.jpg", title: "Judges Evaluation" }
            ]
        },
        {
            id: 4,
            title: "Field Trip 2023",
            description: "Educational visit to the national museum and science center",
            year: "2023",
            coverPhoto: "../images/gallery/trip.jpg",
            photos: [
                { id: 1, src: "../images/gallery/field-trip-1.jpg", title: "Museum Visit" },
                { id: 2, src: "../images/gallery/field-trip-2.jpg", title: "Science Center" },
                { id: 3, src: "../images/gallery/field-trip-3.jpg", title: "Group Learning" },
                { id: 4, src: "../images/gallery/field-trip-4.jpg", title: "Interactive Exhibit" }
            ]
        },
        {
            id: 5,
            title: "Independence Day 2023",
            description: "Flag hoisting ceremony and cultural performances",
            year: "2023",
            coverPhoto: "../images/gallery/independence-day-cover.jpg",
            photos: [
                { id: 1, src: "../images/gallery/independence-day-1.jpg", title: "Flag Hoisting" },
                { id: 2, src: "../images/gallery/independence-day-2.jpg", title: "National Anthem" },
                { id: 3, src: "../images/gallery/independence-day-3.jpg", title: "Cultural Dance" },
                { id: 4, src: "../images/gallery/independence-day-4.jpg", title: "Speech" }
            ]
        },
        {
            id: 6,
            title: "Graduation 2023",
            description: "Graduation ceremony for our senior students",
            year: "2023",
            coverPhoto: "../images/gallery/farewell.jpg",
            photos: [
                { id: 1, src: "../images/gallery/graduation-1.jpg", title: "Procession" },
                { id: 2, src: "../images/gallery/graduation-2.jpg", title: "Diploma Distribution" },
                { id: 3, src: "../images/gallery/graduation-3.jpg", title: "Valedictorian Speech" },
                { id: 4, src: "../images/gallery/graduation-4.jpg", title: "Group Photo" }
            ]
        }
    ];

    // Check if we're on the album page
    const isAlbumPage = window.location.pathname.includes('album.html');

    if (isAlbumPage) {
        loadAlbumPage();
    } else {
        loadGalleryPage();
    }

    // Initialize Lightbox
    function initLightbox() {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Photo %1 of %2',
            'alwaysShowNavOnTouchDevices': true
        });
    }

    // Load gallery page
    function loadGalleryPage() {
        initLightbox();
        renderAlbums();
        setupEventListeners();
    }

    // Load album page
    function loadAlbumPage() {
        initLightbox();
        
        const urlParams = new URLSearchParams(window.location.search);
        const albumId = urlParams.get('id');
        
        if (albumId) {
            const album = albums.find(a => a.id == albumId);
            if (album) {
                renderAlbum(album);
            } else {
                // Album not found, redirect to gallery
                window.location.href = 'index.html';
            }
        } else {
            // No album ID, redirect to gallery
            window.location.href = 'index.html';
        }
    }

    // Render albums on gallery page
    function renderAlbums() {
        const container = document.getElementById('albumsContainer');
        container.innerHTML = '';

        const yearFilter = document.getElementById('yearFilter').value;
        const filteredAlbums = yearFilter === 'all' 
            ? albums 
            : albums.filter(album => album.year === yearFilter);

        if (filteredAlbums.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="far fa-folder-open fa-3x mb-3 text-muted"></i>
                    <h4 class="text-muted">No albums found</h4>
                    <p>Try changing your filter criteria</p>
                </div>
            `;
            return;
        }

        filteredAlbums.forEach(album => {
            const albumCard = document.createElement('div');
            albumCard.className = 'col-md-6 col-lg-4 mb-4';
            
            albumCard.innerHTML = `
                <div class="card album-card h-100">
                    <a href="album.html?id=${album.id}">
                        <img src="${album.coverPhoto}" class="card-img-top" alt="${album.title}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${album.title}</h5>
                        <p class="card-text text-muted">
                            <small><i class="far fa-calendar-alt me-1"></i>${album.year} • ${album.photos.length} Photos</small>
                        </p>
                        <p class="card-text">${album.description}</p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <a href="album.html?id=${album.id}" class="btn btn-primary btn-sm">
                            View Album <i class="fas fa-arrow-right ms-1"></i>
                        </a>
                    </div>
                </div>
            `;
            
            container.appendChild(albumCard);
        });
    }

    // Render album on album page
    function renderAlbum(album) {
        // Update album info
        document.getElementById('albumTitle').textContent = album.title;
        document.getElementById('albumBreadcrumb').textContent = album.title;
        document.getElementById('albumDescription').textContent = album.description;
        document.getElementById('albumYear').textContent = album.year;
        document.getElementById('photoCount').textContent = `${album.photos.length} Photos`;

        // Render photos
        const container = document.getElementById('photosContainer');
        container.innerHTML = '';

        album.photos.forEach(photo => {
            const photoCol = document.createElement('div');
            photoCol.className = 'col-md-6 col-lg-4 mb-4';
            
            photoCol.innerHTML = `
                <div class="card photo-card h-100">
                    <a href="${photo.src}" data-lightbox="album" data-title="${photo.title}">
                        <img src="${photo.src}" class="card-img-top" alt="${photo.title}">
                    </a>
                    <div class="card-body">
                        <p class="card-text">${photo.title}</p>
                    </div>
                </div>
            `;
            
            container.appendChild(photoCol);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Search functionality
        document.getElementById('searchButton').addEventListener('click', function() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            filterAlbums(searchTerm);
        });

        document.getElementById('searchInput').addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase();
                filterAlbums(searchTerm);
            }
        });

        // Year filter
        document.getElementById('yearFilter').addEventListener('change', function() {
            renderAlbums();
        });
    }

    // Filter albums based on search term
    function filterAlbums(searchTerm) {
        const albumCards = document.querySelectorAll('.album-card');
        let hasMatches = false;

        albumCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-text:not(.text-muted)').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.parentElement.style.display = 'block';
                hasMatches = true;
            } else {
                card.parentElement.style.display = 'none';
            }
        });

        // Show no results message if no matches
        const noResults = document.getElementById('noResults');
        if (!hasMatches) {
            if (!noResults) {
                const container = document.getElementById('albumsContainer');
                const message = document.createElement('div');
                message.id = 'noResults';
                message.className = 'col-12 text-center py-5';
                message.innerHTML = `
                    <i class="fas fa-search fa-3x mb-3 text-muted"></i>
                    <h4 class="text-muted">No albums found</h4>
                    <p>Try different search terms</p>
                `;
                container.appendChild(message);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }
});