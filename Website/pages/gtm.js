(function() {
    // Inject GTM script in <head>
    var gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-WRDDKH7X";
    document.head.appendChild(gtmScript);

    // Inject GTM noscript iframe at the very top of <body>
    var gtmNoscript = document.createElement("noscript");
    gtmNoscript.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WRDDKH7X" ' +
        'height="0" width="0" style="display:none;visibility:hidden"></iframe>';

    // Insert the noscript immediately inside <body> before any other content
    var body = document.body;
    if (body) {
        body.insertAdjacentElement("afterbegin", gtmNoscript);
    } else {
        document.addEventListener("DOMContentLoaded", function() {
            document.body.insertAdjacentElement("afterbegin", gtmNoscript);
        });
    }
})();
