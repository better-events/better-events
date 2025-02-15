import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import {
	core,
	coreMeta,
	framework,
	frameworkMeta,
	gettingStarted,
	gettingStartedMeta,
	privacyRegulations,
	privacyRegulationsMeta,
	releaseNotes,
	releaseNotesMeta,
} from '../../.source';

export const gettingStartedSource = loader({
	baseUrl: '/docs/getting-started',
	source: createMDXSource(gettingStarted, gettingStartedMeta),
});

export const releaseNotesSource = loader({
	baseUrl: '/docs/release-notes',
	source: createMDXSource(releaseNotes, releaseNotesMeta),
});

export const frameworkSource = loader({
	baseUrl: '/docs/framework',
	source: createMDXSource(framework, frameworkMeta),
});

export const coreSource = loader({
	baseUrl: '/docs/core',
	source: createMDXSource(core, coreMeta),
});

export const privacyRegulationsSource = loader({
	baseUrl: '/docs/privacy-regulations',
	source: createMDXSource(privacyRegulations, privacyRegulationsMeta),
});

export type Source =
	| typeof gettingStartedSource
	| typeof releaseNotesSource
	| typeof frameworkSource
	| typeof coreSource
	| typeof privacyRegulationsSource;
