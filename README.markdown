globie-wordpress-starter-pack
---
v 1.7.6

Starting point for our wordpress themes

`git clone git@github.com:interglobalvision/globie-wordpress-starter-pack.git`

Tech this uses [thnx]:

- http://gulpjs.com/
- https://getcomposer.org/
- https://bower.io/
- https://github.com/WebDevStudios/CMB2
- https://github.com/fightbulc/moment.php
- https://github.com/aFarkas/lazysizes

---

#### Setup

- `npm install` or `yarn`
- check composer.json if you want moment or other things
- `composer install`
- check bower.json if you want to add more than just lazysizes
- `bower install`
- `gulp build` or `gulp`

#### Notes

- When you install bower packages make sure to `--save` into the `bower.json` otherwise the gulpfile will fail to find and import correctly into the libraries

![](http://i.imgur.com/G56ITX7.png)