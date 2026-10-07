import { redirect } from "next/navigation";

export default async function ProposalPage({ params }) {
  const { slug } = await params;
  redirect(`/vara-fragor/${slug}`);
}