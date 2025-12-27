document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;

            // Update Active State
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Load Content
            loadContent(target);
        });
    });

    // Initial Load
    loadContent('dashboard');

    function loadContent(target) {
        // Clear Content
        contentArea.innerHTML = '';

        switch(target) {
            case 'dashboard':
                pageTitle.textContent = 'Dashboard';
                renderDashboard();
                break;
            case 'platforms':
                pageTitle.textContent = 'Platforms Management';
                renderPlatforms();
                break;
            case 'posts':
                pageTitle.textContent = 'Posts Management';
                renderPosts();
                break;
        }
    }

    // --- Dashboard Logic ---
    function renderDashboard() {
        const platforms = store.getPlatforms();
        const posts = store.getPosts();

        const publishedCount = posts.filter(p => p.status === 'Published').length;
        const scheduledCount = posts.filter(p => p.status === 'Scheduled').length;
        const draftCount = posts.filter(p => p.status === 'Draft').length;

        const html = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-network-wired"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Total Platforms</h3>
                        <p>${platforms.length}</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-paper-plane"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Total Posts</h3>
                        <p>${posts.length}</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="color: #10b981; background-color: rgba(16, 185, 129, 0.1);">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Published</h3>
                        <p>${publishedCount}</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="color: #f59e0b; background-color: rgba(245, 158, 11, 0.1);">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Scheduled</h3>
                        <p>${scheduledCount}</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <h2>Recent Activity</h2>
                <div class="table-container" style="margin-top: 16px;">
                    <table>
                        <thead>
                            <tr>
                                <th>Content</th>
                                <th>Platform</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${posts.slice(0, 5).map(post => {
                                const platform = platforms.find(p => p.id == post.platformId);
                                const platformName = platform ? platform.name : 'Unknown';
                                const platformIcon = platform ? `<i class="${platform.icon}" style="color: ${platform.color}; margin-right: 8px;"></i>` : '';

                                let statusClass = '';
                                if (post.status === 'Published') statusClass = 'status-published';
                                else if (post.status === 'Draft') statusClass = 'status-draft';
                                else if (post.status === 'Scheduled') statusClass = 'status-scheduled';

                                return `
                                    <tr>
                                        <td>${post.content.substring(0, 30)}${post.content.length > 30 ? '...' : ''}</td>
                                        <td>${platformIcon} ${platformName}</td>
                                        <td>${post.date}</td>
                                        <td><span class="status-badge ${statusClass}">${post.status}</span></td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        contentArea.innerHTML = html;
    }

    // --- Platforms Logic ---
    function renderPlatforms() {
        const platforms = store.getPlatforms();

        const html = `
            <div style="display: flex; justify-content: flex-end; margin-bottom: 24px;">
                <button class="btn btn-primary" onclick="openPlatformModal()">
                    <i class="fas fa-plus"></i> Add Platform
                </button>
            </div>
            <div class="platforms-grid">
                ${platforms.map(platform => `
                    <div class="card platform-card">
                        <div class="platform-icon" style="background-color: ${platform.color}">
                            <i class="${platform.icon}"></i>
                        </div>
                        <h3>${platform.name}</h3>
                        <div class="platform-actions">
                            <button class="btn" style="background-color: #f3f4f6;" onclick="editPlatform(${platform.id})">Edit</button>
                            <button class="btn btn-danger" onclick="deletePlatform(${platform.id})">Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        contentArea.innerHTML = html;
    }

    // --- Posts Logic ---
    function renderPosts() {
        const posts = store.getPosts();
        const platforms = store.getPlatforms();

        const html = `
             <div style="display: flex; justify-content: flex-end; margin-bottom: 24px;">
                <button class="btn btn-primary" onclick="openPostModal()">
                    <i class="fas fa-plus"></i> Create Post
                </button>
            </div>
            <div class="card">
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Content</th>
                                <th>Platform</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${posts.map(post => {
                                const platform = platforms.find(p => p.id == post.platformId);
                                const platformName = platform ? platform.name : 'Unknown';
                                const platformIcon = platform ? `<i class="${platform.icon}" style="color: ${platform.color}; margin-right: 8px;"></i>` : '';

                                let statusClass = '';
                                if (post.status === 'Published') statusClass = 'status-published';
                                else if (post.status === 'Draft') statusClass = 'status-draft';
                                else if (post.status === 'Scheduled') statusClass = 'status-scheduled';

                                return `
                                    <tr>
                                        <td>${post.content}</td>
                                        <td>${platformIcon} ${platformName}</td>
                                        <td>${post.date}</td>
                                        <td><span class="status-badge ${statusClass}">${post.status}</span></td>
                                        <td>
                                            <button class="btn" style="padding: 4px 8px; font-size: 0.875rem;" onclick="editPost(${post.id})">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn" style="padding: 4px 8px; font-size: 0.875rem; color: var(--danger);" onclick="deletePost(${post.id})">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                             ${posts.length === 0 ? '<tr><td colspan="5" style="text-align: center; color: var(--secondary-color);">No posts found. Create one!</td></tr>' : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        contentArea.innerHTML = html;
    }
});

// Global functions for inline event handlers (Platform)
function openPlatformModal(id = null) {
    const modal = document.getElementById('platform-modal');
    const form = document.getElementById('platform-form');
    const title = document.getElementById('platform-modal-title');

    // Reset form
    form.reset();
    document.getElementById('platform-id').value = '';

    if (id) {
        const platforms = store.getPlatforms();
        const platform = platforms.find(p => p.id === id);
        if (platform) {
            document.getElementById('platform-id').value = platform.id;
            document.getElementById('platform-name').value = platform.name;
            document.getElementById('platform-icon').value = platform.icon;
            document.getElementById('platform-color').value = platform.color;
            title.textContent = 'Edit Platform';
        }
    } else {
        title.textContent = 'Add Platform';
    }

    modal.classList.add('active');
}

function closePlatformModal() {
    document.getElementById('platform-modal').classList.remove('active');
}

// Handle Form Submit
document.getElementById('platform-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('platform-id').value;
    const name = document.getElementById('platform-name').value;
    const icon = document.getElementById('platform-icon').value;
    const color = document.getElementById('platform-color').value;

    const platform = {
        id: id ? parseInt(id) : null,
        name,
        icon,
        color
    };

    store.savePlatform(platform);
    closePlatformModal();

    // Refresh current view if it is platforms
    // A bit hacky way to refresh, but works for simple app
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink && activeLink.dataset.target === 'platforms') {
        activeLink.click();
    } else {
        // Just reload
         window.location.reload();
    }
});

function editPlatform(id) {
    openPlatformModal(id);
}

function deletePlatform(id) {
    if(confirm('Are you sure you want to delete this platform?')) {
        store.deletePlatform(id);
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink && activeLink.dataset.target === 'platforms') {
            activeLink.click();
        }
    }
}

// Global functions for inline event handlers (Post)
function openPostModal(id = null) {
    const modal = document.getElementById('post-modal');
    const form = document.getElementById('post-form');
    const title = document.getElementById('post-modal-title');
    const platformSelect = document.getElementById('post-platform');

    // Populate platforms
    const platforms = store.getPlatforms();
    platformSelect.innerHTML = platforms.map(p => `<option value="${p.id}">${p.name}</option>`).join('');

    // Reset form
    form.reset();
    document.getElementById('post-id').value = '';
    // Set default date to today
    document.getElementById('post-date').valueAsDate = new Date();

    if (id) {
        const posts = store.getPosts();
        const post = posts.find(p => p.id === id);
        if (post) {
            document.getElementById('post-id').value = post.id;
            document.getElementById('post-content').value = post.content;
            document.getElementById('post-platform').value = post.platformId;
            document.getElementById('post-date').value = post.date;
            document.getElementById('post-status').value = post.status;
            title.textContent = 'Edit Post';
        }
    } else {
        title.textContent = 'Create Post';
    }

    modal.classList.add('active');
}

function closePostModal() {
    document.getElementById('post-modal').classList.remove('active');
}

// Handle Form Submit
document.getElementById('post-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('post-id').value;
    const content = document.getElementById('post-content').value;
    const platformId = document.getElementById('post-platform').value;
    const date = document.getElementById('post-date').value;
    const status = document.getElementById('post-status').value;

    const post = {
        id: id ? parseInt(id) : null,
        content,
        platformId: parseInt(platformId),
        date,
        status
    };

    store.savePost(post);
    closePostModal();

    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink && activeLink.dataset.target === 'posts') {
        activeLink.click();
    } else {
         window.location.reload();
    }
});

function editPost(id) {
    openPostModal(id);
}

function deletePost(id) {
    if(confirm('Are you sure you want to delete this post?')) {
        store.deletePost(id);
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink && activeLink.dataset.target === 'posts') {
            activeLink.click();
        }
    }
}
