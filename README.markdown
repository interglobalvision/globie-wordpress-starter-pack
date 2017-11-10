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

## Setup

- `yarn`
- check composer.json if you want moment or other things
- `composer install`
- `webpack`



## Notes

- be here, now

![](http://i.imgur.com/G56ITX7.png)
