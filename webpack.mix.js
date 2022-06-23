const mix = require('laravel-mix');

mix.postCss('src/input.css', 'dist/app.css', [
  require('tailwindcss')
])