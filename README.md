# Sachin & Sahana — Wedding Invitation (`wedding-invitation`)

Digital wedding invitation website for **Sachin & Sahana** (`February 07 & 08, 2027`), hosted on GitHub Pages at `https://sachinhegde04.github.io/wedding-invitation/`.

## Project Structure

```text
wedding-invitation/
├── index.html                  # 3D envelope intro, photo cover, silk-ivory invitation & Guestbook
├── README.md                   # Project structure & deployment notes
├── css/
│   └── styles.css              # Envelope animations, Kanjeevaram silk/gold styles, Guestbook & temple FAB
├── js/
│   └── main.js                 # Envelope reveal, IST countdown, scroll reveal, clipboard & Guestbook logic
└── assets/
    └── images/
        ├── SHR08429.webp       # Optimized opening cover portrait (WebP)
        ├── SHR08429.jpg        # Optimized opening cover portrait (Progressive JPEG fallback)
        ├── SHR08703.webp       # Optimized candid medallion portrait (WebP)
        └── SHR08703.jpg        # Optimized candid medallion portrait (JPEG fallback)
```

## Optional: Syncing Guestbook Wishes Across All Guests (Free via Google Sheets)
Out of the box, the Guestbook displays initial blessings and saves any new wishes entered by a visitor in their browser (`localStorage`). If you want wishes from every guest to save to a Google Sheet and appear live for all visitors:

