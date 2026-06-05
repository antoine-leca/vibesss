export const CATEGORIES = [
    { id: 'cuisine', name: 'CUISINE', bgColor: 'var(--primary-color, #e99fb4)', textColor: '#fff' },
    { id: 'animaux', name: 'ANIMAUX', bgColor: 'var(--secondary-color, #B5A2D7)', textColor: '#fff' },
    { id: 'lifestyle', name: 'LIFESTYLE', bgColor: 'var(--category-color, #A7CBE0)', textColor: '#fff' },
    { id: 'sport', name: 'SPORT', bgColor: 'var(--accent-color, #EFC3A7)', textColor: '#333' },
    { id: 'nature', name: 'NATURE', bgColor: 'var(--success-color, #A7C49F)', textColor: '#333' },
    { id: 'voyage', name: 'VOYAGE', bgColor: '#F4E5A1', textColor: '#333' },
];

export function resolveProfilePicture(profilePicture, pseudo) {
    if (profilePicture && (profilePicture.startsWith("http://") || profilePicture.startsWith("https://"))) {
        return profilePicture;
    }
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${pseudo || "Anonyme"}`;
}

export function resolveBgImage(bgImage) {
    if (bgImage && (bgImage.startsWith("http://") || bgImage.startsWith("https://"))) {
        return bgImage;
    }
    const themeImages = {
        "cuisine_bg.jpg": "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=700&q=80",
        "animaux_bg.jpg": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=700&q=80",
        "lifestyle_bg.jpg": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=700&q=80",
        "sport_bg.jpg": "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
        "nature_bg.jpg": "https://images.unsplash.com/photo-1472214222541-d510753a4907?w=800&q=80",
        "voyage_bg.jpg": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80"
    };
    return themeImages[bgImage] || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80";
}