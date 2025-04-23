// /js/event-details.js

document.addEventListener('DOMContentLoaded', () => {
    // Get containers for content and error messages
    const contentContainer = document.getElementById('event-detail-content');
    const notFoundDiv = document.getElementById('event-not-found');

    // --- Get Event ID from URL ---
    const params = new URLSearchParams(window.location.search);
    const eventIdParam = params.get('id'); // Get the 'id' parameter value as a string

    // Validate the event ID
    if (!eventIdParam) {
        showError("No event ID specified in the URL.");
        return;
    }

    // Convert the ID to a number, ensuring it's a valid integer
    const eventId = parseInt(eventIdParam, 10);
    if (isNaN(eventId)) {
        showError(`Invalid event ID format: "${eventIdParam}". ID must be a number.`);
        return;
    }

    // Check if the events data is available
    if (typeof events === 'undefined' || !Array.isArray(events)) {
         console.error("Events data is missing or not in the correct format.");
         showError("Could not retrieve event information. Data unavailable.");
         return;
    }

    // --- Find the Event ---
    // Use find() to get the event object matching the ID
    const event = events.find(e => e.id === eventId);

    // --- Display Event or Error ---
    if (event) {
        // If event is found, display its details
        displayEventDetails(event);
    } else {
        // If event with the given ID is not found in the data
        showError(`Event with ID ${eventId} not found.`);
    }

    /**
     * Populates the page with the details of the found event.
     * @param {object} eventData - The event object from the data.js array.
     */
    function displayEventDetails(eventData) {
        // Clear the loading message
        contentContainer.innerHTML = '';

        // Set the page title dynamically
        document.title = `${eventData.title || 'Event Details'} - Campus Connect Portal`;

        // Construct the HTML for the event details using template literals
        contentContainer.innerHTML = `
            <nav aria-label="breadcrumb" class="mb-3">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item"><a href="events.html">Events</a></li>
                <li class="breadcrumb-item active" aria-current="page">${eventData.title || 'Event Details'}</li>
              </ol>
            </nav>

            <h1 id="event-title" class="mb-3 display-5">${eventData.title || 'Untitled Event'}</h1>

            <img src="${eventData.image || 'https://placehold.co/800x400/CCCCCC/FFFFFF?text=No+Image'}"
                 alt="${eventData.title || 'Event Image'}"
                 class="img-fluid rounded mb-4 shadow-sm event-detail-image"
                 onerror="this.onerror=null;this.src='https://placehold.co/800x400/CCCCCC/FFFFFF?text=Image+Error';">

            <div class="row mb-3 g-3">
                <div class="col-md-6">
                    <p class="mb-1"><strong><i class="bi bi-calendar-event text-primary"></i> Date & Time:</strong> <span id="event-datetime">${formatDateTime(eventData.date)}</span></p>
                    <p class="mb-1"><strong><i class="bi bi-geo-alt-fill text-success"></i> Location:</strong> <span id="event-location">${eventData.location || 'To Be Determined'}</span></p>
                </div>
                 <div class="col-md-6">
                     <p class="mb-1"><strong><i class="bi bi-tag-fill text-info"></i> Category:</strong> <span id="event-category" class="badge bg-info text-dark">${eventData.category || 'General'}</span></p>
                    <p class="mb-1"><strong><i class="bi bi-person-fill text-secondary"></i> Organized by:</strong> <span id="event-organizer">${eventData.organizer || 'Campus Administration'}</span></p>
                </div>
            </div>

            <hr class="my-4">

            <h5 class="mt-4">About this Event</h5>
            <p id="event-description" class="lead">${eventData.description || 'No description provided.'}</p>

            <hr class="my-4">

            <div id="registration-section">
                <h5>Registration</h5>
                <p>Click the button below to register for this event (simulation).</p>
                <button id="register-btn" class="btn btn-primary btn-lg shadow">
                    <i class="bi bi-check2-circle"></i> Register Now (Simulated)
                </button>
                <div id="register-status" class="mt-3 fw-bold" role="alert" aria-live="polite"></div>
            </div>
        `;

        // --- Add Event Listener for the Simulated Registration Button ---
        // Get the button and status elements *after* they have been added to the DOM
        const registerButton = document.getElementById('register-btn');
        const registerStatus = document.getElementById('register-status');

        if (registerButton && registerStatus) {
            registerButton.addEventListener('click', () => {
                // Update the status message
                registerStatus.textContent = 'Thank you for registering! (This is a simulation).';
                registerStatus.className = 'mt-3 fw-bold alert alert-success'; // Style as a success alert

                // Disable the button to prevent multiple clicks
                registerButton.disabled = true;
                registerButton.textContent = 'Registered (Simulated)';
                registerButton.classList.remove('btn-primary');
                registerButton.classList.add('btn-success'); // Change button style to indicate success
            });
        } else {
            console.warn("Could not find registration button or status element.");
        }
    }

    /**
     * Displays an error message on the page.
     * Hides the normal content area and shows the error div.
     * @param {string} message - The error message to display.
     */
    function showError(message) {
         console.error("Event Details Error:", message); // Log error to console
         if (contentContainer) {
            contentContainer.innerHTML = ''; // Clear any loading message
            contentContainer.style.display = 'none'; // Hide the main content area
         }
         if (notFoundDiv) {
             // Display the error message in the dedicated error div
             notFoundDiv.textContent = `Error: ${message}`;
             notFoundDiv.style.display = 'block'; // Make the error div visible
         } else {
             // Fallback if the error div itself is missing
             if(contentContainer) { // Try putting error in content container as last resort
                contentContainer.innerHTML = `<div class="alert alert-danger" role="alert">Error: ${message}</div>`;
                contentContainer.style.display = 'block';
             }
         }
         // Set a generic error title
         document.title = "Error - SIR MVIT Portal";
    }
});