<?php
$options = get_site_option('_igv_site_options');
?>
<script type="application/ld+json">
{
  "@context": "http://schema.org",
    "@type": "Organization",
    "url": "<?php echo home_url(); ?>",
<?php
if (isset($options['metadata_logo'])) {
  $image = wp_get_attachment_image_src($options['metadata_logo_id'], 'opengraph');

  echo '"logo": "' . $image[0] . '",';
}
?>
"sameAs" : [
<?php
if (isset($options['socialmedia_facebook_url'])) {
  echo '"' . $options['socialmedia_facebook_url'] . '",';
}

if (isset($options['socialmedia_twitter'])) {
  echo '"https://twitter.com/' . $options['socialmedia_twitter'] . '",';
}

if (isset($options['socialmedia_instagram'])) {
  echo '"https://instagram.com/' . $options['socialmedia_instagram'] . '",';
}
?>
]
  }
</script>
