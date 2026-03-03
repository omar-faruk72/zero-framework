const urlParams = new URLSearchParams(window.location.search);
const serviceId = urlParams.get('id');

async function loadServiceDetails() {
    const content = document.getElementById('service-details-content');
    
    if (!serviceId) {
        content.innerHTML = "<h2>Service not found!</h2>";
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/service/${serviceId}`);
        const result = await response.json();

        if (result.status) {
            const service = result.data;
            content.innerHTML = `
                <div style="display: flex; gap: 50px; align-items: center;">
                    <div style="flex: 1;">
                        <img src="${service.imageUrl}" style="width: 100%; border-radius: 20px;">
                    </div>
                    <div style="flex: 1;">
                        <h1 style="color: #7da5a0; font-size: 40px;">${service.name}</h1>
                        <p style="font-size: 18px; color: #555; margin: 20px 0;">${service.description}</p>
                        <h3 style="color: #27ae60; font-size: 24px;">Price: $${service.price}</h3>
                        <p>Duration: ${service.duration}</p>
                      
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error:", error);
        content.innerHTML = "<h2>Error loading service details.</h2>";
    }
}

loadServiceDetails();