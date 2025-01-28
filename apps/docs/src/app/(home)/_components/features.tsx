import Features from "../../../components/marketing/feature-selector";
import { Section } from "../../../components/marketing/section";

import { siteConfig } from "../config";

export function FeaturesSection() {
	const features = siteConfig.features;

	return (
		<Section id="features" title="Features">
			<Features.Root>
				{features.map((feature, index) => (
					<Features.Item
						key={feature.name}
						title={feature.name}
						description={feature.description}
						icon={feature.icon}
						index={index}
					/>
				))}
			</Features.Root>
		</Section>
	);
}
