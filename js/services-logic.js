let currentServicePage = 1;
const serviceLimit = 4;

async function displayServices(page = 1) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    try {
        const response = await fetch(`http://127.0.0.1:8000/all-services?page=${page}&limit=${serviceLimit}`);
        const result = await response.json();

        if (result.status && result.data.services.length > 0) {
            grid.innerHTML = ""; 
            
            result.data.services.forEach(service => {
                grid.innerHTML += `
                    <div class="service-card">
                        <div class="service-img-container">
                            <img src="${service.imageUrl || 'https://via.placeholder.com/300x400'}" alt="${service.name}">
                        </div>
                        <h3>${service.name}</h3>
                    </div>
                `;
            });

            renderPaginationControls(result.data.totalPages, result.data.currentPage);
        } else {
            grid.innerHTML = "<p>No services found.</p>";
        }
    } catch (error) {
        console.error("Error:", error);
        grid.innerHTML = "<p style='color:red;'>Failed to load services.</p>";
    }
}

function renderPaginationControls(totalPages, activePage) {
    const container = document.getElementById('pagination-controls');
    if (!container) return;

    container.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerHTML = i; 
        if (i === activePage) btn.classList.add('active');
        
        btn.onclick = () => {
            currentServicePage = i;
            displayServices(i);
        };
        container.appendChild(btn);
    }
}

displayServices(currentServicePage);