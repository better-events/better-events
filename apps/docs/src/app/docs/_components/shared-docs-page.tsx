import { cn } from '@koroflow/shadcn/libs';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Installer } from '~/components/docs/installer';
import { PoweredBy } from '~/components/docs/powered-by';
import { Preview } from '~/components/docs/preview';
import type { source as Source } from '~/lib/source';

/**
 * Custom MDX components used for rendering documentation content
 */
const components = {
	...defaultMdxComponents,
	Tabs,
	Tab,
	Installer,
	Preview,
	PoweredBy,
};

/**
 * Props for the SharedDocsPage component
 *
 * @interface SharedDocsPageProps
 * @property {Object} params - The route parameters
 * @property {string[]} [params.slug] - Optional array of path segments representing the current page path
 * @property {Source} source - The documentation source containing page data and content
 */
interface SharedDocsPageProps {
	params: { slug?: string[] };
	source: typeof Source;
}

/**
 * A shared page component for rendering documentation content with consistent structure
 * and styling across different documentation sections.
 *
 * @component
 * @param {SharedDocsPageProps} props - The component props
 * @param {Object} props.params - The route parameters
 * @param {Source} props.source - The documentation source
 * @returns {JSX.Element} The rendered documentation page
 * @throws {NotFoundError} When the requested page is not found in the source
 *
 * @example
 * ```tsx
 * <SharedDocsPage
 *   params={{ slug: ['getting-started'] }}
 *   source={myDocsSource}
 * />
 * ```
 */
export function SharedDocsPage({ params, source }: SharedDocsPageProps) {
	const page = source.getPage(params.slug);

	if (!page) {
		notFound();
	}

	const MDX = page.data.body;

	return (
		<DocsPage
			toc={page.data.toc}
			full={page.data.full}
			tableOfContent={{ style: 'clerk' }}
		>
			<DocsTitle className="tracking-tighter lg:text-4xl">
				{page.data.title}
			</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody className={cn()}>
				<MDX components={{ ...components }} />
			</DocsBody>
		</DocsPage>
	);
}

/**
 * Generates metadata for a documentation page based on its content.
 *
 * @param {Object} params - The route parameters
 * @param {string[]} [params.slug] - Optional array of path segments representing the current page path
 * @param {Source} source - The documentation source containing page data
 * @returns {Metadata} The page metadata including title, description and OpenGraph data
 * @throws {NotFoundError} When the requested page is not found in the source
 *
 * @example
 * ```tsx
 * const metadata = generateSharedMetadata(
 *   { slug: ['getting-started'] },
 *   myDocsSource
 * );
 * ```
 */
export function generateSharedMetadata(
	params: { slug?: string[] },
	source: typeof Source
): Metadata {
	const page = source.getPage(params.slug);

	if (!page) {
		notFound();
	}

	return {
		title: page.data.title,
		description: page.data.description,
		openGraph: {
			title: page.data.title,
			description: page.data.description,
			type: 'website',
			images: [
				{
					url: `/og?slug=${params.slug?.join('/') ?? ''}`,
					width: 1200,
					height: 630,
				},
			],
		},
	};
}
