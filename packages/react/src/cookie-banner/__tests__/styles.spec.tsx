import { test } from 'vitest';
import { CookieBanner } from '../../index';
import type { ThemeValue } from '../../theme';
import testComponentStyles from './utils';

type TestCase = {
	testId: string;
	styles: string | ThemeValue;
};

type ComponentTestCase = {
	testId: string;
	themeKey: string;
	styles: string;
};

const ALL_COMPONENTS: ComponentTestCase[] = [
	{
		testId: 'cookie-banner-root',
		themeKey: 'cookie-banner.root',
		styles: 'custom-root',
	},
	{
		testId: 'cookie-banner-card',
		themeKey: 'cookie-banner.card',
		styles: 'custom-card',
	},
	{
		testId: 'cookie-banner-header',
		themeKey: 'cookie-banner.header.root',
		styles: 'custom-header',
	},
	{
		testId: 'cookie-banner-title',
		themeKey: 'cookie-banner.header.title',
		styles: 'custom-title',
	},
	{
		testId: 'cookie-banner-description',
		themeKey: 'cookie-banner.header.description',
		styles: 'custom-description',
	},
	{
		testId: 'cookie-banner-footer',
		themeKey: 'cookie-banner.footer',
		styles: 'custom-footer',
	},
	{
		testId: 'cookie-banner-footer-sub-group',
		themeKey: 'cookie-banner.footer.sub-group',
		styles: 'custom-footer-sub-group',
	},
	{
		testId: 'cookie-banner-overlay',
		themeKey: 'cookie-banner.overlay',
		styles: 'custom-overlay',
	},
	{
		testId: 'cookie-banner-reject-button',
		themeKey: 'cookie-banner.footer.reject-button',
		styles: 'custom-reject-button',
	},
	{
		testId: 'cookie-banner-customize-button',
		themeKey: 'cookie-banner.footer.customize-button',
		styles: 'custom-customize-button',
	},
	{
		testId: 'cookie-banner-accept-button',
		themeKey: 'cookie-banner.footer.accept-button',
		styles: 'custom-accept-button',
	},
];

test('Theme prop applies string classnames to all components', async () => {
	const test = (
		<CookieBanner
			theme={ALL_COMPONENTS.reduce(
				(acc, { themeKey, styles }) => {
					acc[themeKey] = styles;
					return acc;
				},
				{} as Record<string, ThemeValue>
			)}
		/>
	);

	await testComponentStyles({
		component: test,
		testCases: ALL_COMPONENTS.map(({ testId, styles }) => ({
			testId,
			styles,
		})),
	});
});

test('Theme prop supports object format with className and style for all components', async () => {
	const style = {
		backgroundColor: '#ffffff',
		padding: '20px',
		border: '1px solid #000000',
	} as const;

	const testCases = ALL_COMPONENTS.map(({ testId, themeKey, styles }) => ({
		testId,
		themeKey,
		className: styles,
		style,
	}));

	const test = (
		<CookieBanner
			theme={testCases.reduce(
				(acc, { themeKey, className, style }) => {
					acc[themeKey] = {
						className,
						style,
					};
					return acc;
				},
				{} as Record<string, ThemeValue>
			)}
		/>
	);

	await testComponentStyles({
		component: test,
		testCases: testCases.map(({ testId, className, style }) => ({
			testId,
			styles: {
				className,
				style,
			},
		})),
	});
});

test('No style prop removes default styles but keeps custom classNames', async () => {
	const test = (
		<CookieBanner
			noStyle
			theme={ALL_COMPONENTS.reduce(
				(acc, { themeKey, styles }) => {
					acc[themeKey] = styles;
					return acc;
				},
				{} as Record<string, ThemeValue>
			)}
		/>
	);

	await testComponentStyles({
		component: test,
		testCases: ALL_COMPONENTS.map(({ testId, styles }) => ({
			testId,
			styles,
		})),
		noStyle: true,
	});
});

test('Theme prop handles mixed format (string and object) correctly', async () => {
	const mixedTheme: Record<string, ThemeValue> = {
		'cookie-banner.root': {
			className: 'custom-root',
			style: {
				backgroundColor: 'rgb(255, 255, 255)',
				padding: '16px',
			},
		},
		'cookie-banner.header.title': 'custom-title',
	};

	const test = <CookieBanner theme={mixedTheme} />;

	await testComponentStyles({
		component: test,
		testCases: [
			{
				testId: 'cookie-banner-root',
				styles: {
					className: 'custom-root',
					style: {
						backgroundColor: 'rgb(255, 255, 255)',
						padding: '16px',
					},
				},
			},
			{
				testId: 'cookie-banner-title',
				styles: 'custom-title',
			},
		],
	});
});

test('Theme prop handles edge cases gracefully', async () => {
	const edgeCaseTheme: Record<string, ThemeValue> = {
		'cookie-banner.root': '',
		'cookie-banner.title': '',
		'cookie-banner.description': '',
		'cookie-banner.footer': {
			className: '',
			style: {
				margin: '0',
				padding: '0',
			},
		},
	};

	const test = <CookieBanner theme={edgeCaseTheme} />;

	await testComponentStyles({
		component: test,
		testCases: [
			{
				testId: 'cookie-banner-root',
				styles: '',
			},
			{
				testId: 'cookie-banner-title',
				styles: '',
			},
			{
				testId: 'cookie-banner-footer',
				styles: {
					className: '',
					style: {
						margin: '0',
						padding: '0',
					},
				},
			},
		],
	});
});
