# Markdown micro site

A markdown micro site is specified in the markdown list in the [siteConfig.js](./site-config.md)
file. A markdown micro site is specified by an object of the form:
```javascript
{
    slug: "docs",
    path: "docs/",
    template (body) {
        return body;
    }
}
```
