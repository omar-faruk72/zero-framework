const regForm = document.getElementById('reg-form');
const msg = document.getElementById('msg');

if (regForm) {
    regForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const userData = {
            name: name,
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (result.status === true) {
                msg.style.color = "green";
                msg.innerText = "Registration Successful! Redirecting to login...";
                
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                msg.style.color = "red";
                msg.innerText = "Registration Failed: " + result.message;
            }

        } catch (error) {
            console.error("Error:", error);
            msg.style.color = "red";
            msg.innerText = "Server Error. Please make sure your backend is running!";
        }
    });
}