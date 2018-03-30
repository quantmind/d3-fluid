---
title: siteConfig.js
---

# siteConfig.js

A large part of site configuration is done by editing the ``siteConfig.js`` file.

## siteConfig Fields

The siteConfig object contains the bulk of the configuration settings for your website.

### title

**required**

Title for your website

### markdown

A list of markdown micro-sites
```javascript
markdown: [
    {markdown1},
    {markdown2},
    ...
]
```
See the [markdown](./markdown.md) documenation for how to specify the morkdown objects.
