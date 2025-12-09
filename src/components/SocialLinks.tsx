type LinkItem = { type: 'facebook' | 'instagram' | 'twitter' | 'youtube'; url: string };

const labels: Record<LinkItem['type'], string> = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    twitter: 'Twitter',
    youtube: 'YouTube',
};

export function SocialLinks({ links }: { links: LinkItem[] }) {
    return (
        <div className="flex gap-3">
            {links.map(link => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 border rounded-md bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring" aria-label={`Buka ${labels[link.type]} BPKPAD`}>
                    <span className="sr-only">{labels[link.type]}</span>
                    <span aria-hidden>{labels[link.type]}</span>
                </a>
            ))}
        </div>
    );
}
