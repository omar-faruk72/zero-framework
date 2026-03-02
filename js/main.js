async function loadComponent(id, path) {
    const element = document.getElementById(id);
    if (element) {
        try {
            const res = await fetch(path);
            if (res.ok) {
                element.innerHTML = await res.text();
            } else {
                console.error(`${path} `);
            }
        } catch (err) {
            console.error(`${id} `, err);
        }
    }
}

async function loadLayout() {
    // header lod
    await loadComponent('header-placeholder', '/shared/header.html');
    loadComponent('why-choose-section', '/home-page/why-choose.html');
    // touch section lod
    loadComponent('touch-section', '/home-page/get-in-touch.html');
    // contact lod
    loadComponent('contact-info-section', '/home-page/contact-info.html');
    // brands lod
 loadComponent('brands-section', '/home-page/brands.html');

    // footer load
loadComponent('footer-placeholder', '/shared/footer.html');
    // button load
    await loadComponent('hero-btn-solid', '/shared/btn-solid.html');
    await loadComponent('hero-btn-outline', '/shared/btn-outline.html');
}

loadLayout();