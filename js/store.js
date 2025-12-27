class Store {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem('platforms')) {
            const initialPlatforms = [
                { id: 1, name: 'Facebook', icon: 'fab fa-facebook', color: '#3b5998' },
                { id: 2, name: 'Twitter', icon: 'fab fa-twitter', color: '#1da1f2' },
                { id: 3, name: 'Instagram', icon: 'fab fa-instagram', color: '#c13584' },
                { id: 4, name: 'LinkedIn', icon: 'fab fa-linkedin', color: '#0077b5' }
            ];
            localStorage.setItem('platforms', JSON.stringify(initialPlatforms));
        }

        if (!localStorage.getItem('posts')) {
            const initialPosts = [
                { id: 1, platformId: 1, content: 'Exciting news coming soon!', date: '2023-10-25', status: 'Published' },
                { id: 2, platformId: 2, content: '#Tech #Innovation', date: '2023-10-26', status: 'Draft' },
                { id: 3, platformId: 3, content: 'Check out our latest photo!', date: '2023-10-27', status: 'Scheduled' }
            ];
            localStorage.setItem('posts', JSON.stringify(initialPosts));
        }
    }

    getPlatforms() {
        return JSON.parse(localStorage.getItem('platforms'));
    }

    savePlatform(platform) {
        const platforms = this.getPlatforms();
        // Generate ID if new
        if (!platform.id) {
            platform.id = Date.now();
            platforms.push(platform);
        } else {
            // Update existing
            const index = platforms.findIndex(p => p.id === platform.id);
            if (index !== -1) {
                platforms[index] = platform;
            }
        }
        localStorage.setItem('platforms', JSON.stringify(platforms));
    }

    deletePlatform(id) {
        let platforms = this.getPlatforms();
        platforms = platforms.filter(p => p.id !== id);
        localStorage.setItem('platforms', JSON.stringify(platforms));

        // Also clean up posts associated with this platform?
        // For simplicity, let's keep them or maybe filter them out in UI.
        // Better: cascading delete
        let posts = this.getPosts();
        posts = posts.filter(p => p.platformId !== id);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    getPosts() {
        return JSON.parse(localStorage.getItem('posts'));
    }

    savePost(post) {
        const posts = this.getPosts();
        if (!post.id) {
            post.id = Date.now();
            posts.push(post);
        } else {
            const index = posts.findIndex(p => p.id === post.id);
            if (index !== -1) {
                posts[index] = post;
            }
        }
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    deletePost(id) {
        let posts = this.getPosts();
        posts = posts.filter(p => p.id !== id);
        localStorage.setItem('posts', JSON.stringify(posts));
    }
}

const store = new Store();
