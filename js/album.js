document.addEventListener('DOMContentLoaded', function() {
    // Get album ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = parseInt(urlParams.get('id'));
    
    if (!albumId) {
        window.location.href = '../gallery.html';
        return;
    }

    // Load the album data
    loadAlbum(albumId);
});

async function loadAlbum(albumId) {
    try {
        // In a real app, this would be an API call
        const response = await fetch('../data/albums.json');
        const data = await response.json();
        const album = data.albums.find(a => a.id === albumId);
        
        if (!album) {
            throw new Error('Album not found');
        }

        renderAlbum(album);
        initLightbox();
        setupSlideshow(album.photos);
    } catch (error) {
        console.error('Error loading album:', error);
        window.location.href = '../gallery.html';
    }
}

function renderAlbum(album) {
    // Update album info
    document.getElementById('albumTitle').textContent = album.title;
    document.getElementById('albumBreadcrumb').textContent = album.title;
    document.getElementById('albumDescription').textContent = album.description;
    document.getElementById('albumYear').textContent = album.year;
    document.getElementById('photoCount').textContent = album.photos.length;

    // Render photos
    const container = document.getElementById('photosContainer');
    container.innerHTML = '';

    if (album.photos.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="far fa-folder-open fa-3x mb-3 text-muted"></i>
                <h4 class="text-muted">No photos in this album</h4>
            </div>
        `;
        return;
    }

    album.photos.forEach((photo, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';
        col.innerHTML = `
            <div class="card photo-card h-100">
                <a href="${photo.src}" data-lightbox="album" data-title="${photo.title}">
                    <img src="${photo.src}" class="card-img-top" alt="${photo.title}" loading="lazy">
                </a>
                <div class="card-body">
                    <p class="card-text">${photo.title}</p>
                </div>
                <div class="card-footer bg-transparent border-0">
                    <button class="btn btn-sm btn-outline-primary view-slideshow-btn" data-index="${index}">
                        <i class="fas fa-expand me-1"></i>View
                    </button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function setupSlideshow(photos) {
    const slideshowModal = new bootstrap.Modal('#slideshowModal');
    let currentIndex = 0;

    // View buttons functionality
    document.getElementById('viewAllBtn').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('viewSlideshowBtn').classList.remove('active');
    });

    document.getElementById('viewSlideshowBtn').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('viewAllBtn').classList.remove('active');
        currentIndex = 0;
        showSlide(currentIndex);
        slideshowModal.show();
    });

    // Setup slideshow navigation
    document.querySelectorAll('.view-slideshow-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentIndex = parseInt(this.dataset.index);
            showSlide(currentIndex);
            slideshowModal.show();
        });
    });

    document.getElementById('prevSlide').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        showSlide(currentIndex);
    });

    document.getElementById('nextSlide').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % photos.length;
        showSlide(currentIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('slideshowModal').classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + photos.length) % photos.length;
                showSlide(currentIndex);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % photos.length;
                showSlide(currentIndex);
            } else if (e.key === 'Escape') {
                slideshowModal.hide();
            }
        }
    });

    function showSlide(index) {
        const photo = photos[index];
        document.getElementById('slideshowImage').src = photo.src;
        document.getElementById('slideshowCaption').textContent = photo.title;
    }
}

function initLightbox() {
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Photo %1 of %2',
        'alwaysShowNavOnTouchDevices': true
    });
}