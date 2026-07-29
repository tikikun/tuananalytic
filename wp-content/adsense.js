/*
 * Google AdSense loader — single source of truth.
 * To change the AdSense publisher/host account for the WHOLE site,
 * edit ONLY this file. Every page loads this via:
 *   <script src="/wp-content/adsense.js"></script>
 *
 * NOTE: individual ad units still live inline in each page as
 *   <ins class="adsbygoogle" data-ad-client="..." data-ad-slot="...">
 * followed by (adsbygoogle = window.adsbygoogle || []).push({});
 */
(function () {
  // 👉 Change your AdSense IDs here (and nowhere else).
  var CLIENT = 'ca-pub-5877339755641507';
  var HOST   = 'ca-host-pub-2644536267352236';

  var s = document.createElement('script');
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        + '?client=' + CLIENT
        + '&host='  + HOST;
  document.head.appendChild(s);
})();
