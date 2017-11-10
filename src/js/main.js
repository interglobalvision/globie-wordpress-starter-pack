/* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document */

// Import style
import '../styl/site.styl';

// Import modules
import ShopifyBuy from 'shopify-buy';

class Site {
  constructor() {
    this.mobileThreshold = 601;

    this.shopClient = ShopifyBuy.buildClient({
      accessToken: 'bbf8cac808a116296bbae0bf8bf97ba0',
      domain: 'shop-apt-25.myshopify.com',
      appId: '924581901'
    });

    $(window).resize(this.onResize.bind(this));

    $(document).ready(this.onReady.bind(this));

  }

  onResize() {

  }

  onReady() {

    // fetch a product using resource id
    this.shopClient.fetchProduct('33448427533')
      .then(function (product) {
        console.log(product);
      })
      .catch(function () {
        console.log('Request failed');
      });

  }

  fixWidows() {
    // utility class mainly for use on headines to avoid widows [single words on a new line]
    $('.js-fix-widows').each(function(){
      var string = $(this).html();
      string = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
      $(this).html(string);
    });
  }
}

new Site();
