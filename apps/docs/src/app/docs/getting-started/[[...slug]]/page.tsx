import { gettingStartedSource } from '~/lib/source';
import {
	SharedDocsPage,
	generateSharedMetadata,
} from '../../_components/shared-docs-page';

/**
 * The main documentation page component that renders content based on the current slug.
 *
 * @param props - The component props
 * @param props.params - A promise containing the route parameters
 * @param props.params.slug - Optional array of path segments representing the current page path
 * @returns The rendered documentation page
 */
export default async function Page(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	return SharedDocsPage({ params, source: gettingStartedSource });
}

/**
 * Generates the static paths for all documentation pages at build time.
 *
 * @returns A promise that resolves to an array of valid route parameters
 */
export const generateStaticParams = async () =>
	gettingStartedSource.generateParams();

/**
 * Generates the metadata for the current documentation page.
 *
 * @param props - The metadata generation props
 * @param props.params - A promise containing the route parameters
 * @param props.params.slug - Optional array of path segments representing the current page path
 * @returns The page metadata including title, description and OpenGraph data
 */
export async function generateMetadata(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	return generateSharedMetadata(params, gettingStartedSource);
}
