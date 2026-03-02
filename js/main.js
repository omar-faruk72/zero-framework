async function loadLayout() {
    try{

   // ১. হেডার লোড করা
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            const res = await fetch('/shared/header.html');
            headerPlaceholder.innerHTML = await res.text();
        }

        // footer load
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if(footerPlaceholder) {
            footerPlaceholder.innerHTML = await Response.text();
        };

    }catch(err) {
        console.log("layout load error", err)
    }

};

loadLayout();