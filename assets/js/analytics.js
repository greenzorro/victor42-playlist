(function () {
    'use strict';

    const measurementId = 'G-14SGRFWENB';
    const SESSION_KEY = 'playlist_install_intent_sent';
    const CHROME_STORE = 'chromewebstore.google.com/detail/gapobidkeopfeojilkhhohnkhblhkkjn';
    const EDGE_STORE = 'microsoftedge.microsoft.com/addons/detail/jaibeclfgdnbgghhipbbddddlkjhckgb';
    const CRX_FILE = '小熊歌单搬家.zip';
    const CRX_FILE_ENCODED = '%E5%B0%8F%E7%86%8A%E6%AD%8C%E5%8D%95%E6%90%AC%E5%AE%B6.zip';

    if (window.location.hostname !== 'playlist.victor42.work') {
        return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    function installMethodFromHref(href) {
        if (!href) {
            return null;
        }
        if (href.indexOf(CHROME_STORE) !== -1) {
            return 'chrome';
        }
        if (href.indexOf(EDGE_STORE) !== -1) {
            return 'edge';
        }
        if (href.indexOf(CRX_FILE_ENCODED) !== -1) {
            return 'crx';
        }
        try {
            if (decodeURIComponent(href).indexOf(CRX_FILE) !== -1) {
                return 'crx';
            }
        } catch (error) {
            return null;
        }
        return null;
    }

    function alreadySent() {
        try {
            return window.sessionStorage.getItem(SESSION_KEY) === '1';
        } catch (error) {
            return false;
        }
    }

    function markSent() {
        try {
            window.sessionStorage.setItem(SESSION_KEY, '1');
        } catch (error) {
            // Private mode may block sessionStorage; still send this click.
        }
    }

    function trackInstallIntent(method) {
        if (alreadySent()) {
            return;
        }
        markSent();
        window.gtag('event', 'playlist_install_intent', {
            method: method,
            product_id: 'playlist',
            transport_type: 'beacon'
        });
    }

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }
        const anchor = target.closest('a');
        if (!anchor) {
            return;
        }
        const method = installMethodFromHref(anchor.href);
        if (!method) {
            return;
        }
        trackInstallIntent(method);
    }, true);
})();
