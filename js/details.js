const urlParams = new URLSearchParams(window.location.search);
const serviceId = urlParams.get('id');

async function loadServiceDetails() {
    if (!serviceId) {
        document.body.innerHTML = "<h2 style='text-align:center; margin-top:50px;'>Service not found!</h2>";
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/service/${serviceId}`);
        const result = await response.json();

        if (result.status) {
            const data = result.data;
            
            document.getElementById('service-img').src = data.imageUrl;
            document.getElementById('service-name').innerText = data.name;
            document.getElementById('service-cat').innerText = data.category;
            document.getElementById('service-price').innerText = `$${data.price}`;
            document.getElementById('service-duration').innerText = data.duration;
            document.getElementById('service-email').innerText = data.contactEmail;
            document.getElementById('service-email').href = `mailto:${data.contactEmail}`;

            let rawDesc = data.description || "";
            let cleanText = rawDesc.replace(/\\n/g, '\n');

            const formattedHTML = cleanText
                .replace(/### Overview/g, '<div class="desc-section"><h2>1. Overview</h2>')
                .replace(/### Key Benefits/g, '</div><div class="desc-section"><h2>2. Key Benefits</h2>')
                .replace(/### Our Process/g, '</div><div class="desc-section"><h2>3. Our Process</h2>')
                .replace(/### Aftercare & Tips/g, '</div><div class="desc-section"><h2>4. Aftercare & Tips</h2>')
                .split('\n')
                .map(line => {
                    const l = line.trim();
                    if (!l) return "";
                    
                    if (l.startsWith('*') || l.match(/^\d\./)) {
                        let cleanLine = l.replace(/^\* |^\d\./, '').replace(/\*\*/g, ''); 
                        return `<div class="list-item"><span>✅</span> ${cleanLine}</div>`;
                    }
                    
                    if (!l.includes('<div') && !l.includes('<h2')) {
                        return `<p>${l}</p>`;
                    }
                    return l;
                })
                .join('') + '</div>';

            document.getElementById('service-description').innerHTML = formattedHTML;
            document.title = data.name + " | Details";
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

loadServiceDetails();