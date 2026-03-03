
const token = localStorage.getItem('token');
const role = localStorage.getItem('userRole');

if (!token || role !== 'admin') {
    alert("Access Denied!");
    window.location.href = 'login.html';
}

// Service Form Submission
const serviceForm = document.getElementById('service-form');
const msg = document.getElementById('msg');

if (serviceForm) {
    serviceForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const serviceData = {
            name: document.getElementById('serviceName').value,
            category: document.getElementById('category').value,
            price: document.getElementById('price').value,
            duration: document.getElementById('duration').value,
            contactEmail: document.getElementById('contactEmail').value,
            imageUrl: document.getElementById('imageUrl').value,
            description: document.getElementById('description').value
        };

        try {
            const response = await fetch('http://localhost:8000/add-services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(serviceData)
            });

            const result = await response.json();

            if (response.ok) {
                msg.style.color = "green";
                msg.innerText = "Service added successfully!";
                serviceForm.reset(); 
            } else {
                msg.style.color = "red";
                msg.innerText = "Error: " + result.message;
            }
        } catch (error) {
            msg.style.color = "red";
            msg.innerText = "Server error or connection failed!";
        }
    });
}

function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}