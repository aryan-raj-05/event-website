// /js/data.js

// Sample Event Data
// Using ISO 8601 format (YYYY-MM-DDTHH:mm:ss) for dates is recommended for consistency and easier parsing/sorting.
const events = [
    {
        id: 1,
        title: "Technical Quiz",
        date: "2025-05-15T14:00:00", // Use ISO format for easier sorting/display
        location: "Admin block",
        description: "",
        organizer: "Student Activities Board",
        category: "Social",
        image: "https://placehold.co/600x300/88AAEE/FFFFFF?text=Technical+Quiz" // Placeholder image URL
    },
    {
        id: 2,
        title: "Cultural night",
        date: "2025-05-10T18:00:00",
        location: "Auditorium",
        description: "An evening of music,dance, and drama showcasing campus talent.",
        organizer: "Cultural club",
        category: "Social",
        image: "https://placehold.co/600x300/AADDCC/FFFFFF?text=AI+Lecture" // Placeholder image URL
    },
    {
        id: 3,
        title: "Introduction to Photography Workshop",
        date: "2025-05-20T10:00:00",
        location: "ADMIN BLOCK, Room 205",
        description: "Learn the basics of composition, lighting, and camera settings. Bring your own camera (DSLR or smartphone). Limited spots available.",
        organizer: "Photography Club",
        category: "Workshop",
        image: "https://placehold.co/600x300/EEDD99/333333?text=Photo+Workshop" // Placeholder image URL
    },
    {
        id: 4,
        title: "End-of-Semester Study Jam",
        date: "2025-05-08T19:00:00",
        location: "Library, Floor 3",
        description: "Quiet study space with free coffee and snacks provided to help you prepare for finals.",
        organizer: "Library Services",
        category: "Academic",
        image: "https://placehold.co/600x300/DDAAEE/FFFFFF?text=Study+Jam" // Placeholder image URL
    },
    {
        id: 5, // Added another future event for testing
        title: "Outdoor Movie Night: Sci-Fi Classics",
        date: "2025-05-25T20:00:00",
        location: "Campus Green",
        description: "Bring a blanket and enjoy a classic sci-fi movie under the stars. Free popcorn!",
        organizer: "Film Society",
        category: "Social",
        image: "https://placehold.co/600x300/AAAAAA/FFFFFF?text=Movie+Night" // Placeholder image URL
    }
];

// Sample Club Data
const clubs = [
    {
        id: 101,
        name: "E-CELL",
        description: "Sharpen your arguments and public speaking skills. We participate in regional competitions.",
        category: "Technical",
        logo: "https://placehold.co/150x150/FFCCCC/333333?text=Debate" // Placeholder logo URL
    },
    {
        id: 102,
        name: "Sports club",
        description: "Explore local trails and enjoy the great outdoors. Weekly hikes for all fitness levels.",
        category: "Sports",
        logo: "https://placehold.co/150x150/CCFFCC/333333?text=Hiking" // Placeholder logo URL
    },
    {
        id: 103,
        name: "Codeshack",
        description: "Collaborate on projects, learn new technologies, and prepare for tech careers. All skill levels welcome.",
        category: "Technical",
        logo: "https://placehold.co/150x150/CCCCFF/333333?text=Code" // Placeholder logo URL
    },
     {
        id: 104,
        name: "Literature",
        description: "A space for painters, sculptors, digital artists, and creatives to share work and collaborate.",
        category: "Academic",
        logo: "https://placehold.co/150x150/FFFFCC/333333?text=Art" // Placeholder logo URL
    },
    {
        id: 105,
        name: "Volunteer Network",
        description: "Connect with local non-profits and make a difference in the community.",
        category: "Social",
        logo: "https://placehold.co/150x150/FFDDAA/333333?text=Volunteer" // Placeholder logo URL
    }
];

// Sample Announcement Data (Optional - for Home Page)
const announcements = [
    { id: 201, text: "Library hours extended for finals week starting May 5th.", date: "2025-04-20" },
    { id: 202, text: "Summer course registration opens May 1st.", date: "2025-04-18" },
    { id: 203, text: "Campus Shuttle schedule updated. Check the transportation website.", date: "2025-04-15" }
];

/**
 * Formats an ISO date string into a more readable format.
 * Example: "May 15, 2025, 2:00 PM"
 * @param {string} isoString - The ISO date string (e.g., "2025-05-15T14:00:00").
 * @returns {string} A formatted date string, or 'Date TBD'/'Invalid Date' on error.
 */
function formatDateTime(isoString) {
    if (!isoString) return 'Date TBD';
    try {
        const date = new Date(isoString);
         // Check if the date object is valid
        if (isNaN(date.getTime())) {
            console.warn("Invalid date string provided:", isoString);
            return 'Invalid Date';
        }
        // Use Intl.DateTimeFormat for better localization and options if needed,
        // but toLocaleString is often sufficient for basic needs.
        return date.toLocaleString('en-US', {
            year: 'numeric',    // e.g., 2025
            month: 'long',     // e.g., May
            day: 'numeric',     // e.g., 15
            hour: 'numeric',    // e.g., 2
            minute: '2-digit', // e.g., 00
            hour12: true        // Use AM/PM
        });
    } catch (e) {
        console.error("Error formatting date:", isoString, e);
        return 'Date Format Error';
    }
}