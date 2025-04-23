// /js/clubs.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const clubListContainer = document.getElementById('club-list');
    const searchInput = document.getElementById('club-search');
    const categoryFilter = document.getElementById('club-filter-category');
    const noResultsDiv = document.getElementById('no-results');

    // Check if the clubs data is available
    if (typeof clubs === 'undefined' || !Array.isArray(clubs)) {
        console.error("Clubs data is missing or not in the correct format.");
        if (clubListContainer) {
            clubListContainer.innerHTML = '<p class="col-12 text-danger">Could not load club information. Please try again later.</p>';
        }
        // Disable filters if data is missing
        if (searchInput) searchInput.disabled = true;
        if (categoryFilter) categoryFilter.disabled = true;
        return; // Stop execution if data is missing
    }

    /**
     * Renders the list of clubs in the DOM.
     * @param {Array} clubsToDisplay - An array of club objects to display.
     */
    function displayClubs(clubsToDisplay) {
        // Clear the current list or loading message
        clubListContainer.innerHTML = '';
        // Hide the 'no results' message by default
        noResultsDiv.style.display = 'none';

        if (clubsToDisplay.length === 0) {
            // If no clubs match, show the 'no results' message
            noResultsDiv.style.display = 'block';
        } else {
            // If there are clubs, create and append a card for each
            clubsToDisplay.forEach(club => {
                // --- Button HTML Updated Here ---
                const clubCardHTML = `
                    <div class="col">
                        <div class="card h-100 shadow-sm">
                             <img src="${club.logo || 'https://placehold.co/150x150/CCCCCC/FFFFFF?text=No+Logo'}" class="card-img-top p-3 club-logo" alt="${club.name || 'Unnamed Club'} Logo" onerror="this.onerror=null;this.src='https://placehold.co/150x150/CCCCCC/FFFFFF?text=No+Logo';">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${club.name || 'Unnamed Club'}</h5>
                                <span class="badge bg-secondary align-self-start mb-2">${club.category || 'General'}</span>
                                <p class="card-text flex-grow-1 small">${club.description || 'No description available.'}</p>
                                <a href="club-details.html?id=${club.id}" class="btn btn-primary mt-auto align-self-start">
    Learn More <i class="bi bi-info-circle"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                clubListContainer.innerHTML += clubCardHTML;
            });
        }
    }

    /**
     * Filters the global 'clubs' array based on current search and category selections,
     * then calls displayClubs to update the UI.
     */
    function filterAndDisplayClubs() {
        // Get current filter values, converting search term to lowercase for case-insensitive matching
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value; // Value is "" for "All Categories"

        // Filter the clubs array
        const filteredClubs = clubs.filter(club => {
            // Check if club name includes the search term
            const nameMatch = !searchTerm || (club.name && club.name.toLowerCase().includes(searchTerm));
            // Check if category matches (or if "All Categories" is selected)
            const categoryMatch = !selectedCategory || (club.category && club.category === selectedCategory);
            // Club must match both criteria
            return nameMatch && categoryMatch;
        });

        // Update the displayed clubs
        displayClubs(filteredClubs);
    }

    // --- Initial Setup ---

    // Display all clubs when the page first loads
    displayClubs(clubs);

    // --- Event Listeners ---

    // Add event listener to the search input (triggers on every key press)
    if (searchInput) {
        searchInput.addEventListener('input', filterAndDisplayClubs);
    }

    // Add event listener to the category filter dropdown (triggers when selection changes)
     if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndDisplayClubs);
    }
});