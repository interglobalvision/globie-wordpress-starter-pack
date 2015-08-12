<meta name="twitter:site" value="@">
<?php
if( have_posts() ) {
  while( have_posts() ) {
    the_post();
      $excerpt = get_the_excerpt();
      if(has_post_thumbnail()) {
        $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'opengraph' );
      }
  }
}
if( !empty($thumb) && is_single() ) {
?>
  <meta property="og:image" content="<?php echo $thumb[0] ?>" />
<?php
} else {
?>
  <meta property="og:image" content="<?php echo get_stylesheet_directory_uri(); ?>/img/og.jpg" />
<?php
}
if( is_home() ) {
?>
  <meta property="og:url" content="<?php bloginfo('url'); ?>"/>
  <meta property="og:title" content="<?php bloginfo('name'); ?>" />
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="<?php bloginfo('description'); ?>" />
  <meta name="twitter:card" value="<?php bloginfo('description'); ?>">
<?php
} elseif( is_single() ) {
?>
  <meta property="og:url" content="<?php the_permalink(); ?>"/>
  <meta property="og:title" content="<?php the_title(); ?>" />
  <meta property="og:description" content="<?php echo htmlspecialchars($excerpt) ?>" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
<?php
} else {
?>
  <meta property="og:url" content="<?php the_permalink() ?>"/>
  <meta property="og:title" content="<?php the_title(); ?>" />
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
  <meta property="og:description" content="<?php bloginfo('description'); ?>" />
  <meta property="og:type" content="website" />
<?php
}
?>
