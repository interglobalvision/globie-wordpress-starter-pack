<section id="scripts">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="<?php bloginfo('stylesheet_directory'); ?>/js/vendor/jquery-3.1.0.min.js"><\/script>')</script>
  <?php wp_footer(); ?>
<?php
$google_tracking_id = IGV_get_option('_igv_site_options', '_igv_google_analytics_id');

if (!empty($google_tracking_id)) {
?>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', '<?php echo $google_tracking_id; ?>', 'auto');
    ga('send', 'pageview');

  </script>
<?php
}
?>
</section>