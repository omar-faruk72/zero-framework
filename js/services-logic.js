
async function displayServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) {
        setTimeout(displayServices, 100);
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/all-services');
        const result = await response.json();

        if (result.status && result.data.length > 0) {
            grid.innerHTML = ""; 
            result.data.forEach(service => {
                const descriptionText = service.description 
                    ? service.description.substring(0, 100) + "..." 
                    : "No description available for this service.";

                grid.innerHTML += `
                    <div class="service-card">
                        <div class="service-image">
                            <img src="${service.imageUrl || 'https://via.placeholder.com/300'}" alt="${service.name || 'Service'}">
                            <span class="category">${service.category || 'General'}</span>
                        </div>
                        <div class="service-content">
                            <h3>${service.name || 'Unnamed Service'}</h3>
                            <p>${descriptionText}</p>
                            <div class="service-footer">
                                <span class="price">$${service.price || '0.00'}</span>
                                <span class="duration">${service.duration || 'N/A'}</span>
                            </div>
                            <button class="btn-details" onclick="viewServiceDetails('${service._id}')">View Details</button>
                        </div>
                    </div>
                `;
            });
        } else {
            grid.innerHTML = "<p>No services found.</p>";
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

function viewServiceDetails(id) {
    console.log("Service ID:", id);
}