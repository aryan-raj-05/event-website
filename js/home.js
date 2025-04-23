// /js/home.js

document.addEventListener('DOMContentLoaded', () => {
    // Get containers for dynamic content
    const upcomingEventsContainer = document.getElementById('upcoming-events');
    const announcementList = document.getElementById('announcement-list');
    const now = new Date(); // Get the current date and time

    // --- Load Upcoming Events ---
    if (upcomingEventsContainer && typeof events !== 'undefined') {
        try {
            // 1. Filter events to get only those occurring in the future
            const futureEvents = events.filter(event => {
                try {
                    // Ensure event.date is valid before creating a Date object
                    return event.date && new Date(event.date) >= now;
                } catch (e) {
                    console.error("Invalid date format for event:", event.title, event.date, e);
                    return false; // Exclude events with invalid dates
                }
            });

            // 2. Sort future events by date (soonest first)
            futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

            // 3. Select a limited number of events to display (e.g., the next 4)
            const eventsToShow = futureEvents.slice(0, 4);

            // 4. Clear the 'Loading...' message
            upcomingEventsContainer.innerHTML = '';

            // 5. Generate and append HTML for each event card
            if (eventsToShow.length > 0) {
                eventsToShow.forEach(event => {
                    const eventCardHTML = `
                        <div class="col">
                            <div class="card h-100 shadow-sm">
                                <img src="${event.image}" class="card-img-top" alt="${event.title || 'Event Image'}" onerror="this.onerror=null;this.src='https://placehold.co/300x150/CCCCCC/FFFFFF?text=Image+Not+Found';">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title">${event.title || 'Untitled Event'}</h5>
                                    <p class="card-text text-muted small mb-2">
                                        <i class="bi bi-calendar-event"></i> ${formatDateTime(event.date)}
                                    </p>
                                    <p class="card-text small text-muted mb-3">
                                        <i class="bi bi-geo-alt-fill"></i> ${event.location || 'Location TBD'}
                                    </p>
                                    <p class="card-text flex-grow-1">${(event.description || '').substring(0, 80)}...</p>
                                    <a href="event-details.html?id=${event.id}" class="btn btn-sm btn-outline-primary mt-auto align-self-start">
                                        Learn More <i class="bi bi-arrow-right-short"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                    upcomingEventsContainer.innerHTML += eventCardHTML;
                });
            } else {
                // Display a message if no upcoming events are found
                upcomingEventsContainer.innerHTML = '<p class="col-12 text-muted">No upcoming events scheduled at this time.</p>';
            }
        } catch (error) {
            console.error("Error loading upcoming events:", error);
            upcomingEventsContainer.innerHTML = '<p class="col-12 text-danger">Could not load upcoming events. Please try again later.</p>';
        }

    } else if (upcomingEventsContainer) {
         upcomingEventsContainer.innerHTML = '<p class="col-12 text-danger">Event data is unavailable.</p>';
         console.error("Upcoming events container found, but 'events' array is not defined or accessible.");
    }


    // --- Load Announcements ---
    if (announcementList && typeof announcements !== 'undefined') {
        try {
            // 1. Sort announcements by date descending (most recent first)
            // Assuming date format "YYYY-MM-DD" is sortable as strings or convert to Date objects
            const sortedAnnouncements = announcements.sort((a, b) => {
                 try {
                    // Robust sorting by converting to Date objects
                    return new Date(b.date) - new Date(a.date);
                 } catch(e) { return 0; } // Keep original order if dates are invalid
            });

            // 2. Select a limited number of announcements (e.g., top 5)
            const announcementsToShow = sortedAnnouncements.slice(0, 5);

            // 3. Clear the 'Loading...' message
            announcementList.innerHTML = '';

            // 4. Generate and append HTML for each announcement item
            if (announcementsToShow.length > 0) {
                announcementsToShow.forEach(ann => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item', 'small');
                    listItem.textContent = ann.text;

                    // Optional: Add formatted date below the text
                    const dateSpan = document.createElement('span');
                    dateSpan.classList.add('text-muted', 'd-block', 'mt-1');
                    dateSpan.style.fontSize = '0.8em'; // Make date slightly smaller
                    try {
                         dateSpan.textContent = `Posted: ${new Date(ann.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
                    } catch(e) {
                         dateSpan.textContent = 'Date unavailable';
                    }
                    listItem.appendChild(dateSpan);

                    announcementList.appendChild(listItem);
                });
            } else {
                // Display a message if no announcements are found
                 announcementList.innerHTML = '<li class="list-group-item text-muted">No recent announcements.</li>';
            }
        } catch (error) {
             console.error("Error loading announcements:", error);
            announcementList.innerHTML = '<li class="list-group-item text-danger">Could not load announcements.</li>';
        }
    } else if (announcementList) {
        announcementList.innerHTML = '<li class="list-group-item text-danger">Announcement data is unavailable.</li>';
        console.error("Announcement list container found, but 'announcements' array is not defined or accessible.");
    }
});