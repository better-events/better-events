import type { AllConsentNames } from '@consent-management/core';

import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	type Ref,
	forwardRef,
	useCallback,
} from 'react';
import { useConsentManager } from '../../common';
import { Box, type BoxProps } from '../../primitives/box';
import * as RadixAccordion from '../../ui/components/accordion';
import * as RadixSwitch from '../../ui/components/switch';

/**
 * Accordion sub-group component for organizing consent options.
 *
 * @remarks
 * - Provides visual grouping for related consent options
 * - Supports theme customization
 * - Maintains accessibility structure
 */
const ConsentManagerWidgetAccordionSubGroup = forwardRef<
	HTMLDivElement,
	Omit<BoxProps, 'themeKey'>
>(({ children, ...props }, ref) => {
	return (
		<Box
			ref={ref as Ref<HTMLDivElement>}
			baseClassName="kf-accordion-trigger-sub-group"
			themeKey={'consent-manager-widget.accordion.trigger-sub-group'}
			{...props}
		>
			{children}
		</Box>
	);
});

const ConsentManagerWidgetAccordionTrigger = RadixAccordion.Trigger;
const ConsentManagerWidgetAccordionContent = RadixAccordion.Content;
const ConsentManagerWidgetAccordionArrow = RadixAccordion.Arrow;
const ConsentManagerWidgetAccordion = RadixAccordion.Root;
const ConsentManagerWidgetSwitch = RadixSwitch.Root;

/**
 * Renders a list of consent options as accordion items.
 *
 * @remarks
 * Key features:
 * - Automatically generates items from consent configuration
 * - Handles consent state management
 * - Implements accessible toggle controls
 * - Supports keyboard navigation
 *
 * @example
 * ```tsx
 * <ConsentManagerWidgetAccordion>
 *   <ConsentManagerWidgetAccordionItems />
 * </ConsentManagerWidgetAccordion>
 * ```
 */
const ConsentManagerWidgetAccordionItems = () => {
	const { consents, setConsent, getDisplayedConsents } = useConsentManager();
	const handleConsentChange = useCallback(
		(name: AllConsentNames, checked: boolean) => {
			setConsent(name, checked);
		},
		[setConsent]
	);
	return getDisplayedConsents().map((consent) => (
		<ConsentManagerWidgetAccordionItem
			value={consent.name}
			key={consent.name}
			themeKey={`consent-manager-widget.accordion.item-${consent.name}`}
		>
			<ConsentManagerWidgetAccordionTrigger
				themeKey="consent-manager-widget.accordion.trigger"
				data-testid={`consent-manager-widget-accordion-trigger-${consent.name}`}
			>
				<ConsentManagerWidgetAccordionSubGroup
					data-testid={`consent-manager-widget-accordion-sub-group-${consent.name}`}
				>
					<ConsentManagerWidgetAccordionArrow
						data-testid={`consent-manager-widget-accordion-arrow-${consent.name}`}
					/>
					{consent.name.replace('_', ' ').charAt(0).toUpperCase() +
						consent.name.replace('_', ' ').slice(1)}
				</ConsentManagerWidgetAccordionSubGroup>

				<ConsentManagerWidgetSwitch
					checked={consents[consent.name]}
					onClick={(e) => e.stopPropagation()}
					onKeyUp={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
					onCheckedChange={(checked) =>
						handleConsentChange(consent.name, checked)
					}
					disabled={consent.disabled}
					theme={{
						root: { themeKey: 'consent-manager-widget.switch' },
						thumb: { themeKey: 'consent-manager-widget.switch.thumb' },
						track: { themeKey: 'consent-manager-widget.switch.track' },
					}}
					data-testid={`consent-manager-widget-switch-${consent.name}`}
				/>
			</ConsentManagerWidgetAccordionTrigger>
			<ConsentManagerWidgetAccordionContent
				theme={{
					content: { themeKey: 'consent-manager-widget.accordion.content' },
					contentInner: {
						themeKey: 'consent-manager-widget.accordion.content',
					},
				}}
				data-testid={`consent-manager-widget-accordion-content-${consent.name}`}
			>
				{consent.description}
			</ConsentManagerWidgetAccordionContent>
		</ConsentManagerWidgetAccordionItem>
	));
};

const ConsentManagerWidgetAccordionItem = forwardRef<
	ComponentRef<typeof RadixAccordion.Item>,
	ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ className, ...rest }, forwardedRef) => {
	return <RadixAccordion.Item ref={forwardedRef} {...rest} />;
});

const AccordionSubGroup = ConsentManagerWidgetAccordionSubGroup;
const AccordionTrigger = ConsentManagerWidgetAccordionTrigger;
const AccordionContent = ConsentManagerWidgetAccordionContent;
const AccordionArrow = ConsentManagerWidgetAccordionArrow;
const Accordion = ConsentManagerWidgetAccordion;
const Switch = ConsentManagerWidgetSwitch;
const AccordionItems = ConsentManagerWidgetAccordionItems;
const AccordionItem = ConsentManagerWidgetAccordionItem;

export {
	ConsentManagerWidgetAccordionSubGroup,
	ConsentManagerWidgetAccordionTrigger,
	ConsentManagerWidgetAccordionContent,
	ConsentManagerWidgetAccordionArrow,
	ConsentManagerWidgetAccordion,
	ConsentManagerWidgetSwitch,
	ConsentManagerWidgetAccordionItems,
	ConsentManagerWidgetAccordionItem,
	AccordionSubGroup,
	AccordionTrigger,
	AccordionContent,
	AccordionArrow,
	Accordion,
	Switch,
	AccordionItems,
	AccordionItem,
};
