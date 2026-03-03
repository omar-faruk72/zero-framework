// js/main.js

async function loadComponent(id, path) {
    const element = document.getElementById(id);
    if (element) {
        try {
            const res = await fetch(path);
            if (res.ok) {
                element.innerHTML = await res.text();
                return true; 
            }
        } catch (err) {
            console.error(`Error loading ${id}:`, err);
        }
    }
    return false;
}

async function loadLayout() {
    await loadComponent('header-placeholder', '/shared/header.html');
    
    const serviceLoaded = await loadComponent('services', '/home-page/services.html');
    if (serviceLoaded) {
        displayServices(); 
    }

    loadComponent('scan-section-placeholder', '/home-page/invisalign-scan.html');
    loadComponent('why-choose-section', '/home-page/why-choose.html');
    loadComponent('touch-section', '/home-page/get-in-touch.html');
    loadComponent('contact-info-section', '/home-page/contact-info.html');
    loadComponent('brands-section', '/home-page/brands.html');
    loadComponent('footer-placeholder', '/shared/footer.html');
    
    await loadComponent('hero-btn-solid', '/shared/btn-solid.html');
    await loadComponent('hero-btn-outline', '/shared/btn-outline.html');
}

loadLayout();