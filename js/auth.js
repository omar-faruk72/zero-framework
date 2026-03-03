const regForm = document.getElementById('reg-form');
const loginForm = document.getElementById('login-form');
const msg = document.getElementById('msg');

// ==========================================
// 1. Registration (Frontend to Server)
// ==========================================
if (regForm) {
    regForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {
            const response = await fetch('https://zero-framework-server.vercel.app/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const result = await response.json();

            if (response.ok) { 
                msg.style.color = "green";
                msg.innerText = "Registration Successful!";
                console.log(response)
                setTimeout(() => window.location.href = 'login.html', 2000);
            } else {
                msg.style.color = "red";
                msg.innerText = result.message || "Registration Failed";
            }
        } catch (error) {
            msg.innerText = "Server not responding!";
        }
    });
}

// ==========================================
// 2. Login (Modified for Admin Redirection)
// ==========================================
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://zero-framework-server.vercel.app/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
           
                const token = result.data.token;
                const user = result.data.user;

                if (token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('userRole', user.role); 

                    msg.style.color = "green";
                    msg.innerText = "Login Successful! Redirecting...";

                    setTimeout(() => {
                        if (user.role === 'admin') {
                            window.location.href = 'admin-dashboard.html';
                        } else {
                            window.location.href = 'index.html';
                        }
                    }, 1500);
                }
            } else {
                msg.style.color = "red";
                msg.innerText = result.message || "Invalid Email or Password";
            }
        } catch (error) {
            console.error("Login Error:", error);
            msg.innerText = "Check your server connection!";
        }
    });
}