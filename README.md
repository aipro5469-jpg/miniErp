# نظام تخطيط موارد المؤسسات المصغر لوسائل التواصل الاجتماعي (Social Media ERP - Mini)

نظام تخطيط موارد مؤسسات (ERP) خفيف الوزن وخالٍ من أطر العمل (Framework-free) لإدارة منصات ومنشورات وسائل التواصل الاجتماعي. تم بناؤه باستخدام HTML و CSS و JavaScript بشكل نقي (Vanilla).

## المميزات

-   **لوحة التحكم (Dashboard)**: نظرة عامة على المقاييس الرئيسية (إجمالي المنصات، إجمالي المنشورات، تفصيل حالة المنشورات) والنشاط الحديث.
-   **إدارة المنصات (Platforms Management)**:
    -   عرض جميع منصات التواصل الاجتماعي المتصلة.
    -   إضافة منصات جديدة بأسماء مخصصة، وأيقونات (FontAwesome)، وألوان العلامة التجارية.
    -   تعديل تفاصيل المنصات الحالية.
    -   حذف المنصات.
-   **إدارة المنشورات (Posts Management)**:
    -   عرض جميع المنشورات مع التفاصيل (المحتوى، المنصة، التاريخ، الحالة).
    -   إنشاء منشورات جديدة وتعيينها لمنصات محددة.
    -   تحديد حالة المنشور (مسودة Draft، مجدول Scheduled، منشور Published).
    -   تعديل وحذف المنشورات.
-   **استمرارية البيانات (Data Persistence)**: يستخدم `localStorage` لحفظ البيانات، بحيث تظل تغييراتك محفوظة عبر تحديثات المتصفح.

## التقنيات المستخدمة

-   **HTML5**: الهيكلة والدلالات.
-   **CSS3**: تنسيق مخصص باستخدام متغيرات CSS (CSS Variables) و Flexbox و Grid لواجهة مستخدم حديثة وسريعة الاستجابة.
-   **JavaScript (ES6+)**: منطق التطبيق، ومعالجة DOM، وإدارة الحالة.

## الإعداد والاستخدام

1.  **استنسخ المستودع** (أو قم بتنزيل الملفات).
2.  **افتح `index.html`** في متصفح الويب الخاص بك.
    -   لا يتطلب خادماً (server)، فهو يعمل مباشرة عبر بروتوكول `file://`.
3.  **استكشف التطبيق**:
    -   **لوحة التحكم (Dashboard)**: تحقق من الإحصائيات الأولية.
    -   **المنصات (Platforms)**: أضف شبكات التواصل الاجتماعي المفضلة لديك.
    -   **المنشورات (Posts)**: قم بصياغة منشورك واسع الانتشار التالي!

## هيكل المجلدات

```
.
├── index.html      # ملف التطبيق الرئيسي
├── css/
│   └── style.css   # التنسيقات العامة
├── js/
│   ├── app.js      # منطق واجهة المستخدم الرئيسي ومعالجة الأحداث
│   └── store.js    # إدارة البيانات (غلاف LocalStorage wrapper)
└── README.md       # توثيق المشروع
```

## الحقوق والاعتمادات

-   **الأيقونات**: [FontAwesome](https://fontawesome.com/) (CDN)
-   **الخطوط**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
-   **الصور الرمزية (Avatars)**: [UI Avatars](https://ui-avatars.com/)

## الترخيص

MIT

---

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
