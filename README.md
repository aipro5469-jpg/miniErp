# Social Media ERP (Mini)

A lightweight, framework-free ERP system for managing social media platforms and posts. Built with vanilla HTML, CSS, and JavaScript.

## Features

-   **Dashboard**: Overview of key metrics (Total Platforms, Total Posts, Post Status Breakdown) and recent activity.
-   **Platforms Management**:
    -   View all connected social media platforms.
    -   Add new platforms with custom names, icons (FontAwesome), and brand colors.
    -   Edit existing platform details.
    -   Delete platforms.
-   **Posts Management**:
    -   View all posts with details (Content, Platform, Date, Status).
    -   Create new posts assigned to specific platforms.
    -   Set post status (Draft, Scheduled, Published).
    -   Edit and delete posts.
-   **Data Persistence**: Uses `localStorage` to save data, so your changes persist across browser refreshes.

## Tech Stack

-   **HTML5**: Structure and semantics.
-   **CSS3**: Custom styling with CSS Variables, Flexbox, and Grid for a responsive and modern UI.
-   **JavaScript (ES6+)**: Application logic, DOM manipulation, and state management.

## Setup & Usage

1.  **Clone the repository** (or download the files).
2.  **Open `index.html`** in your web browser.
    -   No server is required, it works directly via the `file://` protocol.
3.  **Explore the App**:
    -   **Dashboard**: Check the initial stats.
    -   **Platforms**: Add your favorite social networks.
    -   **Posts**: Draft your next viral post!

## Directory Structure

```
.
├── index.html      # Main application file
├── css/
│   └── style.css   # Global styles
├── js/
│   ├── app.js      # Main UI logic and event handling
│   └── store.js    # Data management (LocalStorage wrapper)
└── README.md       # Project documentation
```

## Credits

-   **Icons**: [FontAwesome](https://fontawesome.com/) (CDN)
-   **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
-   **Avatars**: [UI Avatars](https://ui-avatars.com/)

## License

MIT
