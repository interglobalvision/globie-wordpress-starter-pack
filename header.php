<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title><?php wp_title('|',true,'right'); bloginfo('name'); ?></title>
  <meta name="description" content="<?php bloginfo('description'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta name="twitter:site" value="@">
  <?php if (have_posts()):while(have_posts()):the_post();
    $excerpt = get_the_excerpt();
    if(has_post_thumbnail()) {
      $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'opengraph' );
    }
    endwhile; endif;
    if (!empty($thumb)) {
  ?>
  <meta property="og:image" content="<?php echo $thumb['0'] ?>" />
    <?php } else { ?>
  <meta property="og:image" content="<?php bloginfo('stylesheet_directory'); ?>/img/favicon.png" />
    <?php }
    if (is_home()) { ?>
  <meta property="og:title" content="<?php bloginfo('name'); ?>" />
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="<?php bloginfo('description'); ?>" />
  <meta name="twitter:card" value="<?php bloginfo('description'); ?>">
<?php } elseif (is_single()) { ?>
  <meta property="og:url" content="<?php the_permalink() ?>"/>
  <meta property="og:title" content="<?php single_post_title(''); ?>" />
  <meta property="og:description" content="<?php echo $excerpt ?>" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
<?php } else { ?>
  <meta property="og:title" content="<?php single_post_title(''); ?>" />
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
  <meta property="og:description" content="<?php bloginfo('description'); ?>" />
  <meta property="og:type" content="website" />
<?php } ?>

  <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
  <link rel="icon" href="<?php bloginfo('stylesheet_directory'); ?>/img/favicon.png">
  <link rel="shortcut" href="<?php bloginfo('stylesheet_directory'); ?>/img/favicon.ico">
  <link rel="apple-touch-icon" href="<?php bloginfo('stylesheet_directory'); ?>/img/favicon-touch.png">
  <link rel="apple-touch-icon" sizes="114x114" href="<?php bloginfo('stylesheet_directory'); ?>/img/favicon.png">

  <script src="<?php bloginfo('stylesheet_directory'); ?>/js/modernizr.js"></script>
  <script type="text/javascript">
    Modernizr.load([
      {
        test: Modernizr.mq('only all'),
        nope: "<?php bloginfo('stylesheet_directory'); ?>/js/polyfills/mediaqueries.js"
      }
    ]);
  </script>

<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<!--[if lt IE 7]><p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p><![endif]-->

<section id="main-container">

<!-- start content -->
<header id="header">

  <h1>
    <a href="<?php echo home_url(); ?>">
      <?php echo home_url(); ?>
    </a>
  </h1>

</header>