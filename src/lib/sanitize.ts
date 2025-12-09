import sanitize from 'sanitize-html';

export function sanitizeHtml(html: string) {
    return sanitize(html, {
        allowedTags: sanitize.defaults.allowedTags.concat(['img', 'h1', 'h2', 'span', 'iframe']),
        allowedAttributes: {
            ...sanitize.defaults.allowedAttributes,
            a: ['href', 'name', 'target', 'rel'],
            img: ['src', 'alt', 'title', 'width', 'height'],
            iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder'],
            '*': ['class', 'style'],
        },
        allowedSchemes: ['http', 'https', 'data', 'mailto', 'tel'],
        // Optionally, transform URLs or strip style if needed
    });
}
