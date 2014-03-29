"use strict";

function socialsharingDemo() {
  window.plugins.socialsharing.available(function(isAvailable) {
    if (isAvailable) {
      // use a local image from inside the www folder:
//      window.plugins.socialsharing.share('Some text', 'Some subject', null, 'http://www.nu.nl');
//      window.plugins.socialsharing.share('Some text');

//      window.plugins.socialsharing.share('test', null, 'data:image/png;base64,R0lGODlhDAAMALMBAP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUKAAEALAAAAAAMAAwAQAQZMMhJK7iY4p3nlZ8XgmNlnibXdVqolmhcRQA7', null, function(e){alert("success: " + e)}, function(e){alert("error: " + e)});
//       window.plugins.socialsharing.share(null, null, 'data:image/png;base64,R0lGODlhDAAMALMBAP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUKAAEALAAAAAAMAAwAQAQZMMhJK7iY4p3nlZ8XgmNlnibXdVqolmhcRQA7', null);
      // alternative usage:

      // 1) a local image from anywhere else (if permitted):
       window.plugins.socialsharing.share('Some text',  'http://www.barcelonabeerfestival.com', 'http://www.barcelonabeerfestival.com/imatges2014/logo2014.png');

      // 2) an image from the internet:
     //window.plugins.socialsharing.share('Some text', 'Some subject', 'http://www.barcelonabeerfestival.com', 'http://www.barcelonabeerfestival.com/imatges2014/logo2014.png');

      // 3) text and link:
//      window.plugins.socialsharing.share('Some text and a link', '', '', 'http://www.nu.nl');
    }
  });
}