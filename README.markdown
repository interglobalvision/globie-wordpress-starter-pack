globie-wordpress-starter-pack
---
v 1.8

Starting point for our wordpress themes


## Tech

This works thanks to the great work of:

- https://webpack.js.org/
- https://getcomposer.org/
- https://github.com/WebDevStudios/CMB2
- https://github.com/fightbulc/moment.php
- https://github.com/aFarkas/lazysizes

---

## Create a new theme

```
git clone git@github.com:interglobalvision/globie-wordpress-starter-pack.git /path/to/new-theme
cd /path/to/new-theme
rm -rf .git
git init
```

## Setup

- `yarn`
- check composer.json if you want moment or other things
- `composer install`
- `webpack`

## Add new packages

To install new packages use [yarn](https://yarnpkg.com/en/)

E.g. **Slick Slider**

```
yarn add slick-carousel
```

Then import js files in `main.js`:

```
import 'slick-carousel';

```

And import css files in `site.styl`:

```
@import '~slick-carousel/slick/slick.css';
```

*`~` is used to ref `node_modules` inside stylus*

Each package is added differently depending on it's export and nature. Most modern packages are webpack friendly :)



## Dev

```
git clone git@github.com:interglobalvision/globie-wordpress-starter-pack.git /path/to/new-theme
cd /path/to/new-theme
```

Locally exclude built files and stuff. Edit `.git/info/exclude`:

```
composer.lock
dist/
```
