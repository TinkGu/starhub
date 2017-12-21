# How to write .hbs

# cheatsheet

```handlebars
A file "/folder/file.handlebars".
{{> partial}} will reference "/folder/partial.handlebars".
{{> ../partial}} will reference "/partial.handlebars".
{{> $module/partial}} will reference "/folder/node_modules/module/partial.handlebars".
{{helper}} will reference the helper "/folder/helper.js" if this file exists.
{{[nested/helper] 'helper parameter'}} will reference the helper "/folder/nested/helper.js" if this file exists, passes 'helper parameter' as first parameter to helper.
{{../helper}} {{$module/helper}} are resolved similarly to partials.
```

- [Handlebars\.js: Minimal Templating on Steroids](http://handlebarsjs.com/)
- [pcardune/handlebars\-loader: A handlebars template loader for webpack](https://github.com/pcardune/handlebars-loader)
