class Store {
    constructor() {
        this.apiBase = '/api';
    }

    async getPlatforms() {
        const response = await fetch(`${this.apiBase}/platforms`);
        return await response.json();
    }

    async savePlatform(platform) {
        let response;
        if (platform.id) {
            // Update
            response = await fetch(`${this.apiBase}/platforms/${platform.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(platform)
            });
        } else {
            // Create
            response = await fetch(`${this.apiBase}/platforms`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(platform)
            });
        }
        return await response.json();
    }

    async deletePlatform(id) {
        await fetch(`${this.apiBase}/platforms/${id}`, {
            method: 'DELETE'
        });
    }

    async getPosts() {
        const response = await fetch(`${this.apiBase}/posts`);
        return await response.json();
    }

    async savePost(post) {
        let response;
        if (post.id) {
            // Update
            response = await fetch(`${this.apiBase}/posts/${post.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            });
        } else {
            // Create
            response = await fetch(`${this.apiBase}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            });
        }
        return await response.json();
    }

    async deletePost(id) {
        await fetch(`${this.apiBase}/posts/${id}`, {
            method: 'DELETE'
        });
    }
}

const store = new Store();
