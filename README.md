# sakura-hugo-theme

A minimal blog theme for Hugo using [Sakura](https://github.com/oxalorg/sakura) that uses no custom CSS.

For an example of this theme in action, check out [my blog](https://blog.elnu.com/) ([repository](https://github.com/ElnuDev/blog.elnu.com))!

## Parameters

This theme supports some basic configuration options in addition to support for [Matomo analytics](https://matomo.org/) a FOSS and self-hosted analytics solution.

- `Theme`: Variant of Sakura to use. If unspecified, will default to `sakura.css`. e.g `Theme = 'dark'` will use `sakura-dark.css`. Available variant themes:
  - `dark-solarized`
  - `dark`
  - `earthly`
  - `ink`
  - `pink`
  - `vader`
- `HomepageHeader`: Text displayed at the absolute top of the homepage, hidden on pagination. Can include HTML markup.
- `MatomoURL`: URL of Matomo analytics server.
- `MatomoSiteId`: Site ID of Matomo. **Must be string.**
