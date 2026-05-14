import { supabase } from "@/lib/supabase";
import type { Proposal } from "@/lib/types";

export async function listProposals() {
  const { data, error } = await supabase
    .from("proposals")
    .select("id,title,client_name,slug,updated_at,data")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function saveProposal(proposal: Proposal) {
  const payload = {
    title: proposal.title,
    client_name: proposal.clientName,
    slug: proposal.slug,
    data: proposal,
  };

  const { data, error } = await supabase
    .from("proposals")
    .upsert(payload, { onConflict: "slug" })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function duplicateProposal(proposal: Proposal) {
  const copySlug = `${proposal.slug}-copy-${Date.now()}`;

  const copy = {
    ...proposal,
    id: crypto.randomUUID(),
    clientName: `${proposal.clientName} Copy`,
    slug: copySlug,
  };

  const { data, error } = await supabase
    .from("proposals")
    .insert({
      title: copy.title,
      client_name: copy.clientName,
      slug: copy.slug,
      data: copy,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProposalBySlug(slug: string) {
  const { error } = await supabase
    .from("proposals")
    .delete()
    .eq("slug", slug);

  if (error) throw error;
}