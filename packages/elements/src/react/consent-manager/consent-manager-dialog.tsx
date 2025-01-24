/**
 * @packageDocumentation
 * Provides the dialog component for detailed privacy consent management.
 * Implements an accessible, animated modal interface for consent customization.
 */

"use client";

import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { useConsentManager } from "../headless";
import { ThemeContext, type ThemeContextValue } from "../theme";
import { ConsentCustomizationCard } from "./atoms/dialog-card";
import { Overlay } from "./atoms/overlay";
import type { ConsentManagerWidgetTheme } from "./theme";

import "./consent-manager-dialog.css";
import "../ui/components/card.css";

/**
 * Animation variants for the dialog container
 * @internal
 */
const dialogVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

/**
 * Animation variants for the dialog content
 * @internal
 */
const contentVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { type: "spring", stiffness: 300, damping: 30 },
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		transition: { duration: 0.2 },
	},
};

/**
 * Props for the ConsentManagerDialog component
 * 
 * @remarks
 * Extends ThemeContextValue to provide comprehensive theming support
 * while maintaining type safety for consent management specific features.
 */
interface ConsentManagerDialogProps extends ThemeContextValue<ConsentManagerWidgetTheme> {
	/** Disables animation when true */
	disableAnimation?: boolean;
	/** Removes default styling when true */
	noStyle?: boolean;
}

/**
 * A modal dialog component for detailed privacy consent management.
 * 
 * @remarks
 * Key features:
 * - Provides an accessible modal interface for consent customization
 * - Implements smooth enter/exit animations
 * - Manages proper focus handling
 * - Supports theme customization
 * - Handles client-side portal rendering
 * 
 * @example
 * ```tsx
 * <ConsentManagerDialog
 *   theme={customTheme}
 *   disableAnimation={false}
 *   noStyle={false}
 * />
 * ```
 * 
 * @public
 */
export const ConsentManagerDialog: FC<ConsentManagerDialogProps> = ({
	theme,
	disableAnimation,
	noStyle,
}) => {
	const consentManager = useConsentManager();
	const [isMounted, setIsMounted] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	// Handle client-side mounting
	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	/**
	 * Handles saving consent preferences and closing the dialog
	 * @internal
	 */
	const handleSave = useCallback(() => {
		consentManager.saveConsents("custom");
		consentManager.setIsPrivacyDialogOpen(false);
	}, [consentManager]);

	/**
	 * Dialog content with theme context and animation support
	 * @internal
	 */
	const dialogContent = (
		<ThemeContext.Provider
			value={{
				...consentManager,
				theme,
				disableAnimation,
				noStyle,
			}}
		>
			<AnimatePresence mode="wait">
				{consentManager.isPrivacyDialogOpen && (
					<>
						<Overlay />
						<motion.dialog
							className="consent-manager-dialog-root"
							variants={dialogVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							aria-modal="true"
							aria-labelledby="privacy-settings-title"
						>
							<motion.div
								ref={contentRef}
								className="consent-manager-dialog-container"
								variants={contentVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
							>
								<ConsentCustomizationCard noStyle={noStyle} />
							</motion.div>
						</motion.dialog>
					</>
				)}
			</AnimatePresence>
		</ThemeContext.Provider>
	);

	// Only render on client-side to prevent hydration issues
	return isMounted && createPortal(dialogContent, document.body);
};
