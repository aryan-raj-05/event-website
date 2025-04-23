// /js/events.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements for filtering and display
    const eventListContainer = document.getElementById('event-list');
    const searchInput = document.getElementById('event-search');
    const categoryFilter = document.getElementById('event-filter-category');
    const timeFilter = document.getElementById('event-filter-time'); // Filter for upcoming/past/all
    const noResultsDiv = document.getElementById('no-results-events');
    const now = new Date(); // Current date and time for comparison

    // --- Data Availability Check ---
    if (typeof events === 'undefined' || !Array.isArray(events)) {
        console.error("Events data (from data.js) is missing or not an array.");
        if (eventListContainer) {
            eventListContainer.innerHTML = '<p class="col-12 text-danger">Could not load event information. Data unavailable.</p>';
        }
        // Disable filters if data is missing
        if (searchInput) searchInput.disabled = true;
        if (categoryFilter) categoryFilter.disabled = true;
        if (timeFilter) timeFilter.disabled = true;
        return; // Stop execution
    }

    /**
     * Renders the list of events in the DOM based on the provided array.
     * @param {Array} eventsToDisplay - An array of event objects to display.
     */
    function displayEvents(eventsToDisplay) {
        // Clear the current list or loading message
        eventListContainer.innerHTML = '';
        // Hide the 'no results' message by default
        noResultsDiv.style.display = 'none';

        if (eventsToDisplay.length === 0) {
            // If no events match the filters, show the 'no results' message
            noResultsDiv.style.display = 'block';
        } else {
            // Sort events before displaying (e.g., by date, upcoming first, then past descending)
            eventsToDisplay.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                // Handle invalid dates if necessary
                if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                    return 0; // Keep original order if dates are invalid
                }

                // Prioritize upcoming events, sort them ascending (soonest first)
                if (dateA >= now && dateB < now) return -1;
                if (dateA < now && dateB >= now) return 1;

                // If both are upcoming, sort ascending
                if (dateA >= now && dateB >= now) return dateA - dateB;

                // If both are past, sort descending (most recent past first)
                if (dateA < now && dateB < now) return dateB - dateA;

                return 0; // Should not be reached if logic is sound
            });


            // If there are events, create and append a card for each
            eventsToDisplay.forEach(event => {
                // Determine if event is past or upcoming for potential styling
                const isPast = new Date(event.date) < now;
                const cardClass = isPast ? 'opacity-75' : ''; // Add opacity to past events

                const eventCardHTML = `
                    <div class="col">
                        <div class="card h-100 shadow-sm ${cardClass}">
                            <img src="${event.image || 'https://placehold.co/300x150/CCCCCC/FFFFFF?text=No+Image'}"
                                 class="card-img-top" alt="${event.title || 'Event Image'}"
                                 onerror="this.onerror=null;this.src='https://placehold.co/300x150/CCCCCC/FFFFFF?text=Image+Error';">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${event.title || 'Untitled Event'}</h5>
                                <p class="card-text text-muted small mb-2">
                                    <i class="bi bi-calendar-event"></i> ${formatDateTime(event.date)}
                                    ${isPast ? '<span class="badge bg-secondary ms-2">Past</span>' : ''}
                                </p>
                                <p class="card-text small text-muted mb-3">
                                    <i class="bi bi-geo-alt-fill"></i> ${event.location || 'Location TBD'}
                                </p>
                                <p class="card-text flex-grow-1 small">${(event.description || '').substring(0, 80)}...</p>
                                <a href="event-details.html?id=${event.id}" class="btn btn-sm btn-outline-primary mt-auto align-self-start">
                                    View Details <i class="bi bi-arrow-right-short"></i>
                                </a>
                            </div>
                             <div class="card-footer bg-transparent border-0 pt-0">
                                 <span class="badge bg-info text-dark">${event.category || 'General'}</span>
                             </div>
                        </div>
                    </div>
                `;
                eventListContainer.innerHTML += eventCardHTML;
            });
        }
    }

    /**
     * Filters the global 'events' array based on current search, category, and time selections,
     * then calls displayEvents to update the UI.
     */
    function filterAndDisplayEvents() {
        // Get current filter values
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value; // "" for "All Categories"
        const selectedTime = timeFilter.value; // "all", "upcoming", "past"

        // Filter the events array
        const filteredEvents = events.filter(event => {
            // 1. Check Search Term
            const titleMatch = !searchTerm || (event.title && event.title.toLowerCase().includes(searchTerm));

            // 2. Check Category
            const categoryMatch = !selectedCategory || (event.category && event.category === selectedCategory);

            // 3. Check Time Filter
            let timeMatch = true; // Assume match initially
            try {
                 const eventDate = new Date(event.date);
                 if (isNaN(eventDate.getTime())) {
                     // Handle invalid dates - perhaps exclude them or log a warning
                     console.warn(`Invalid date for event ID ${event.id}: ${event.date}`);
                     timeMatch = false; // Exclude events with invalid dates from time filtering
                 } else if (selectedTime === 'upcoming') {
                    timeMatch = eventDate >= now;
                 } else if (selectedTime === 'past') {
                    timeMatch = eventDate < now;
                 }
                 // If selectedTime is 'all', timeMatch remains true
            } catch (e) {
                console.error(`Error parsing date for event ID ${event.id}: ${event.date}`, e);
                timeMatch = false; // Exclude if date parsing fails
            }


            // Event must match all active filters
            return titleMatch && categoryMatch && timeMatch;
        });

        // Update the displayed events
        displayEvents(filteredEvents);
    }

    // --- Initial Setup ---

    // Display all events initially (or apply default filters if desired)
    filterAndDisplayEvents(); // Call initially to apply default "All Times" filter

    // --- Event Listeners ---

    // Add listeners to filter controls to re-filter when changed
    if (searchInput) {
        searchInput.addEventListener('input', filterAndDisplayEvents);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndDisplayEvents);
    }
    if (timeFilter) {
        timeFilter.addEventListener('change', filterAndDisplayEvents);
    }
});
