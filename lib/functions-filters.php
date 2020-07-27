<?php

// Custom filters (like pre_get_posts etc)

// Page Slug Body Class
function add_slug_body_class( $classes ) {
  global $post;
  if (isset($post) && !is_home() && !is_archive()) {
    $classes[] = $post->post_type . '-' . $post->post_name;
  }
  return $classes;
}
add_filter( 'body_class', 'add_slug_body_class' );

// Custom img attributes to be compatible with lazysize
function add_lazysize_on_srcset($attr, $attachment, $size) {

  if (!is_admin()) {

    // if image has data-no-lazysizes attribute dont add lazysizes classes
    if (isset($attr['data-no-lazysizes'])) {
      unset($attr['data-no-lazysizes']);
      return $attr;
    }

    $image = wp_get_attachment_image_src($attachment->ID, $size);

    // Add lazysize class
    $attr['class'] .= ' lazyload';

    if (isset($attr['srcset'])) {
      // Add lazysize data-srcset
      $attr['data-srcset'] = $attr['srcset'];
      // Remove default srcset
      unset($attr['srcset']);
    } else {
      // Add lazysize data-src
      $attr['data-src'] = $attr['src'];
    }

    $svg_color = 'transparent';

    // Set default to white blank
    $attr['src'] = 'data:image/svg+xml,%3Csvg style="background-color:' . $svg_color . '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' . $image[1] . ' ' . $image[2] . '"%3E%3C/svg%3E';

  }

  return $attr;

}
add_filter('wp_get_attachment_image_attributes', 'add_lazysize_on_srcset', 10, 3);
