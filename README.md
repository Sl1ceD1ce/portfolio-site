A personal portfolio website built with React, Vite, and Tailwind CSS. Hope you enjoy what you see and let me know of any changes I should make.

## Adding projects

Add an entry to [`src/data/projects.ts`](src/data/projects.ts) with a unique `title` and a `description`. Line breaks in `description` appear in the Projects popup. For an optional `image`, set `src` to a path relative to `public/` or an absolute URL and describe the image in `alt`.

```ts
{
  title: "Project name",
  description: "First line.\n\nSecond paragraph.",
  image: { src: "images/project.webp", alt: "Screenshot of the project dashboard" },
}
```

## Planned features

- Small games that I personally enjoy. E.g. Snake?
- More options to change theme in the future?
