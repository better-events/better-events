import type { ReactNode } from 'react';
import { expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { ConsentManagerProvider } from '../../../index';
import type { ThemeValue } from '../../theme/types/style-types';

interface ComponentStyles {
	component: ReactNode;
	testCases: {
		testId: string;
		styles: string | ThemeValue;
	}[];
	noStyle?: boolean;
}

async function testComponentStyles({
	component,
	testCases,
	noStyle = false,
}: ComponentStyles): Promise<void> {
	const { getByTestId } = render(
		<ConsentManagerProvider>{component}</ConsentManagerProvider>
	);

	for (const { testId, styles } of testCases) {
		// Verify element exists first
		const element = getByTestId(testId);

		if (typeof styles === 'string' || styles?.className) {
			// biome-ignore lint/style/noNonNullAssertion: will always be a string
			const classNames = (
				typeof styles === 'string' ? styles : styles?.className
			)!;
			if (classNames) {
				// biome-ignore lint/suspicious/noMisplacedAssertion: utility function - will be called inside tests
				await expect
					.element(element)
					// @ts-expect-error - exact is not a valid prop for toHaveClass
					.toHaveClass(classNames, { exact: noStyle });
			}
		}

		if (typeof styles === 'object' && styles?.style) {
			const styleEntries = Object.entries(styles.style).map(([key, value]) => {
				// Convert camelCase to kebab-case
				const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
				return [cssKey, value];
			});

			// Wait for a small delay to ensure styles are applied
			await new Promise((resolve) => setTimeout(resolve, 100));

			for (const [property, value] of styleEntries) {
				// biome-ignore lint/suspicious/noMisplacedAssertion: utility function - will be called inside tests
				await expect.element(element).toHaveStyle({ [property]: value });
			}
		}
	}
}

export default testComponentStyles;
