import { projects } from "../data/projects";

function projectImageSource(src: string) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(src)) return src;

  return `${import.meta.env.BASE_URL}${src.replace(/^\.?\//, "")}`;
}

export function Projects() {
  if (projects.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-frame/35 bg-panel px-4 py-6 text-center text-sm leading-relaxed text-ink">
        I’ll share my projects here soon.
      </p>
    );
  }

  return (
    <ul className="grid gap-3" role="list">
      {projects.map(({ title, description, image, technologies, links }) => (
        <li
          key={title}
          className="min-w-0 rounded-md border border-frame/25 bg-panel p-4 text-ink wrap-anywhere sm:p-5"
        >
          <h3 className="text-lg font-semibold">{title}</h3>
          {image && (
            <img
              src={projectImageSource(image.src)}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="my-3 block h-auto max-h-64 max-w-full rounded-sm object-contain"
            />
          )}
          <p className="mt-1 text-sm leading-relaxed whitespace-pre-line">
            {description}
          </p>

          {technologies?.length ? (
            <ul
              className="mt-3 flex flex-wrap gap-2"
              role="list"
              aria-label="Technologies"
            >
              {technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-sm border border-frame/25 px-2 py-0.5 text-xs"
                >
                  {technology}
                </li>
              ))}
            </ul>
          ) : null}

          {links?.length ? (
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2" role="list">
              {links.map(({ label, href }) => (
                <li key={`${label}:${href}`}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${label} for ${title}`}
                    className="rounded-sm text-sm font-medium underline decoration-2 underline-offset-4 hover:decoration-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
