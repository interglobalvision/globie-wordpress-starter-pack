<?php
$options = get_site_option('_igv_site_options');

$json_ld = array(
  "@context" => "http://schema.org",
  "@type" => "Organization",
  "url" => home_url(),
);

if (isset($options['metadata_logo'])) {
  $image = wp_get_attachment_image_src($options['metadata_logo_id'], 'opengraph');

  $json_ld['logo'] = $image[0];
}

$same_as_array = array();

if (isset($options['socialmedia_facebook_url'])) {
  $same_as_array[] = $options['socialmedia_facebook_url'];
}

if (isset($options['socialmedia_twitter'])) {
  $same_as_array[] = 'https://twitter.com/' . $options['socialmedia_twitter'];
}

if (isset($options['socialmedia_instagram'])) {
  $same_as_array[] = 'https://instagram.com/' . $options['socialmedia_instagram'];
}

if (count($same_as_array) > 0) {
  $json_ld['sameAs'] = $same_as_array;
}
?>
<script type="application/ld+json"><?php echo json_encode($json_ld); ?></script>