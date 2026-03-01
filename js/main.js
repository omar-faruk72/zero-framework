async function loadLayout() {
    try{

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