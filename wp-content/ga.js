/*
 * Google Analytics — single source of truth.
 * To change the tracking/config for the WHOLE site, edit ONLY this file.
 * Every page loads this via: <script src="/wp-content/ga.js"></script>
 */
(function () {
  // 👉 Change your GA4 Measurement ID here (and nowhere else).
  var MEASUREMENT_ID = 'G-CC82V5Z406';

  // Load the gtag.js library.
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(s);

  // Standard gtag bootstrap.
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);
})();
