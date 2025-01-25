"use client";

import KoroflowDevTool from "@koroflow/dev-tools";
import { ConsentManagerDialog } from "@koroflow/elements/consent-manager";
import CookieBanner from "@koroflow/elements/cookie-banner";
import { ConsentManagerProvider, useConsentManager } from "@koroflow/elements/headless";
import "@koroflow/elements/globals.css";
import { DemoWidget } from "./component";

export default function PrivacyConsentPage() {
	return (
		<main className="container py-10">
			<ConsentManagerProvider
				initialGdprTypes={["necessary", "marketing", "functionality", "measurement"]}
				initialComplianceSettings={{
					gdpr: { enabled: true, appliesGlobally: true, applies: true },
					ccpa: { enabled: true, appliesGlobally: false, applies: undefined },
					lgpd: { enabled: false, appliesGlobally: false, applies: undefined },
					usStatePrivacy: {
						enabled: true,
						appliesGlobally: false,
						applies: undefined,
					},
				}}
			>
				<DemoWidget />
				<CookieBanner
					noStyle
					theme={{
						"cookie-banner.overlay": "bg-black/50 inset-0 fixed z-40",
						"cookie-banner.root":
							"bottom-12 left-12 fixed z-50 flex items-end sm:items-center justify-center px-4 sm:px-0",
						"cookie-banner.card":
							"max-w-md w-full relative border bg-gradient-to-b from-[#111111] rounded-lg to-black border-t-[.75px] border-white/20 overflow-hidden",
						"cookie-banner.header.root":
							"space-y-2 px-4 sm:px-6 pt-4 sm:pt-6 border-white/10 editor-top-gradient",
						"cookie-banner.header.title": "text-lg sm:text-xl",
						"cookie-banner.header.description": "text-sm sm:text-base",
						"cookie-banner.footer": "flex flex-col sm:flex-row justify-between gap-4 p-4 sm:p-6",
						"cookie-banner.footer.sub-group":
							"flex flex-col sm:flex-row justify-between gap-4 w-full sm:w-auto",
						"cookie-banner.footer.accept-button":
							"relative flex items-center px-4 gap-2 text-sm font-semibold text-black group-hover:bg-white/90 duration-1000 rounded-lg bg-gradient-to-r from-white/80 to-white h-10",
						"cookie-banner.footer.reject-button":
							"items-center gap-2 px-4 duration-500 border border-white/40 rounded-lg text-white/70 hover:text-white h-10 flex",
						"cookie-banner.footer.customize-button":
							"items-center gap-2 px-4 duration-500 border border-white/40 rounded-lg text-white/70 hover:text-white h-10 flex",
					}}
				/>
				<ConsentManagerDialog
					theme={{
						"consent-manager-widget.root": "space-y-6",
						"consent-manager.overlay": "fixed inset-0 bg-black/50 z-[999999997]",

						"consent-manager-widget.dialog":
							"fixed inset-0 z-[999999999] flex items-center justify-center",
						"consent-manager-widget.dialog.root":
							"bg-background rounded-lg border shadow-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto",
						"consent-manager-widget.dialog.header": "flex flex-col gap-1.5 p-6 border-b",
						"consent-manager-widget.dialog.title":
							"text-lg font-semibold leading-none tracking-tight",
						"consent-manager-widget.dialog.description": "text-sm text-muted-foreground",
						"consent-manager-widget.dialog.content": "px-6 py-4",
						"consent-manager-widget.dialog.footer":
							"flex items-center p-6 border-t justify-center text-center",

						"consent-manager-widget.accordion": "space-y-4",
						"consent-manager-widget.accordion.item": "border rounded-lg",
						"consent-manager-widget.accordion.trigger":
							"w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors",
						"consent-manager-widget.accordion.trigger-sub-group": "flex items-center gap-4",
						"consent-manager-widget.accordion.icon": "w-6 h-6",
						"consent-manager-widget.accordion.arrow.open":
							"rotate-180 transition-transform duration-200",
						"consent-manager-widget.accordion.arrow.close": "transition-transform duration-200",
						"consent-manager-widget.accordion.content": "overflow-hidden",
						"consent-manager-widget.accordion.content-inner": "p-4 pt-0",
						"consent-manager-widget.switch.track":
							"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
						"consent-manager-widget.switch.thumb":
							"pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
						"consent-manager-widget.footer": "mt-6 space-y-4 flex flex-row justify-between",
						"consent-manager-widget.footer.sub-group": "flex flex-row justify-between gap-4",
						"consent-manager-widget.footer.reject-button":
							"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2",
						"consent-manager-widget.footer.accept-button":
							"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2",
						"consent-manager-widget.footer.customize-button":
							"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2",
						"consent-manager-widget.footer.save-button":
							"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2",
						"consent-manager-widget.branding": "consent-manager-widget-branding",
					}}
					noStyle
				/>
				<KoroflowDevTool />
			</ConsentManagerProvider>
		</main>
	);
}
