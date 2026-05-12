export const dynamic = "force-dynamic";

import ProposalPreviewPage from "@/components/proposal-preview-page";

export default function Page({ params }: { params: { slug: string } }) {
  return <ProposalPreviewPage slug={params.slug} />;
}
