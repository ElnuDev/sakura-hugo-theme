# sakura-hugo-theme

A minimal blog theme for Hugo using [Sakura](https://github.com/oxalorg/sakura) that uses no custom CSS. Supports furigana/ruby text `[振]{ふ}り[仮]{が}[名]{な}` markup out of the box.

For an example of this theme in action, check out [my blog](https://blog.elnu.com/) ([repository](https://github.com/ElnuDev/blog.elnu.com))!

If you're using Hugo's syntax highlighting and one of the light Sakura variants, it's recommended to use the `friendly` theme. To use it, add the following to your `config.toml`:

```TOML
[markup]
	[markup.highlight]
		style = 'friendly'
```

## Parameters

This theme supports some basic configuration options in addition to support for [Matomo analytics](https://matomo.org/), a FOSS and self-hosted analytics solution.

- `Author`: Author name for all posts. Required for proper post metadata.
- `AuthorProfile`: URL to author profile, used for [Open Graph](https://ogp.me/).
- `AuthorTwitter`: Author Twitter handle **without @**, used for Twitter cards.
- `SiteTwitter`: Site Twitter handle (generally should be same as `AuthorTwitter`)
- `Theme`: Variant of Sakura to use. If unspecified, will default to `sakura.css`. e.g `Theme = 'dark'` will use `sakura-dark.css`. Available variant themes:
  - `dark-solarized`
  - `dark`
  - `earthly`
  - `ink`
  - `pink`
  - `vader`
- `ThemeColor`: Theme color for embeds, etc. eg. `#000000`
- `HomepageHeader`: Text displayed at the absolute top of the homepage, hidden on pagination. Can include HTML markup.
- `MatomoURL`: URL of Matomo analytics server.
- `MatomoSiteId`: Site ID of Matomo. **Must be string.**
