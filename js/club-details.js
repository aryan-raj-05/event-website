// /js/club-details.js

document.addEventListener('DOMContentLoaded', () => {
    // Get containers for content and error messages
    const contentContainer = document.getElementById('club-detail-content');
    const notFoundDiv = document.getElementById('club-not-found');

    // --- Get Club ID from URL ---
    const params = new URLSearchParams(window.location.search);
    const clubIdParam = params.get('id'); // Get the 'id' parameter value as a string

    // Validate the club ID
    if (!clubIdParam) {
        showError("No club ID specified in the URL.");
        return;
    }

    // Convert the ID to a number, ensuring it's a valid integer
    const clubId = parseInt(clubIdParam, 10);
    if (isNaN(clubId)) {
        showError(`Invalid club ID format: "${clubIdParam}". ID must be a number.`);
        return;
    }

    // Check if the clubs data is available
    if (typeof clubs === 'undefined' || !Array.isArray(clubs)) {
         console.error("Clubs data (from data.js) is missing or not an array.");
         showError("Could not retrieve club information. Data unavailable.");
         return;
    }

    // --- Find the Club ---
    // Use find() to get the club object matching the ID
    const club = clubs.find(c => c.id === clubId);

    // --- Display Club or Error ---
    if (club) {
        // If club is found, display its details
        displayClubDetails(club);
    } else {
        // If club with the given ID is not found in the data
        showError(`Club with ID ${clubId} not found.`);
    }

    /**
     * Populates the page with the details of the found club.
     * @param {object} clubData - The club object from the data.js array.
     */
    function displayClubDetails(clubData) {
        // Clear the loading message
        contentContainer.innerHTML = '';

        // Set the page title dynamically
        document.title = `${clubData.name || 'Club Details'} - Campus Connect Portal`;

        // Construct the HTML for the club details using template literals
        // You might want to add more fields here (contact, meeting times) if you add them to data.js
        contentContainer.innerHTML = `
            <nav aria-label="breadcrumb" class="mb-3">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item"><a href="clubs.html">Clubs</a></li>
                <li class="breadcrumb-item active" aria-current="page">${clubData.name || 'Club Details'}</li>
              </ol>
            </nav>

            <div class="row g-4 align-items-center">
                <div class="col-md-4 text-center">
                     <img id="club-logo"
                          src="${clubData.logo || 'https://placehold.co/200x200/CCCCCC/FFFFFF?text=No+Logo'}"
                          alt="${clubData.name || 'Club'} Logo"
                          class="img-fluid rounded-circle mb-3 shadow-sm"
                          style="max-width: 200px; border: 3px solid #dee2e6;"
                          onerror="this.onerror=null;this.src='https://placehold.co/200x200/CCCCCC/FFFFFF?text=Logo+Error';">
                </div>
                 <div class="col-md-8">
                     <h1 id="club-name" class="display-5 mb-3">${clubData.name || 'Unnamed Club'}</h1>
                     <p><strong>Category:</strong> <span id="club-category" class="badge bg-secondary fs-6">${clubData.category || 'General'}</span></p>
                     <hr>
                     <h5>About Us</h5>
                     <p id="club-description" class="lead">${clubData.description || 'No description provided.'}</p>
                     <hr>
                     <a href="mailto:contact@example.com?subject=Inquiry about ${clubData.name}" class="btn btn-outline-primary mt-3">
                        <i class="bi bi-envelope"></i> Contact Club (Example)
                     </a>
                 </div>
            </div>
        `;
        // Note: No interactive elements like registration buttons are needed here currently.
    }

    /**
     * Displays an error message on the page.
     * Hides the normal content area and shows the error div.
     * @param {string} message - The error message to display.
     */
    function showError(message) {
         console.error("Club Details Error:", message); // Log error to console
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
         document.title = "Error - Campus Connect Portal";
    }
});