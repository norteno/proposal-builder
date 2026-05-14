import { supabase } from "@/lib/supabase";
import { starterProposal } from "@/lib/starterProposal";
import { normalizeProposal } from "@/lib/storage";
import type { Proposal } from "@/lib/types";

export type ProposalRow = {
  id: string;
  title: string;
  client_name: string;
  slug: string;
  data: Partial<Proposal>;
  created_at?: string;
  updated_at?: string;
};

function ensureSupabase() {
  if (!supabase) {
    throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  return supabase;
}

function proposalToRow(proposal: Proposal) {
  return {
    id: proposal.id,
    title: proposal.title || "Untitled Proposal",
    client_name: proposal.clientName || "New Client",
    slug: proposal.slug || starterProposal.slug,
    data: proposal
  };
}

function rowToProposal(row: ProposalRow): Proposal {
  return normalizeProposal({
    ...row.data,
    id: row.data?.id || row.id,
    title: row.data?.title || row.title,
    clientName: row.data?.clientName || row.client_name,
    slug: row.data?.slug || row.slug
  });
}

export async function listRemoteProposals(): Promise<Proposal[]> {
  const client = ensureSupabase();
  const { data, error } = await client
    .from("proposals")
    .select("id,title,client_name,slug,data,created_at,updated_at")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data || []).map((row) => rowToProposal(row as ProposalRow));
}

export async function getRemoteProposalBySlug(slug: string): Promise<Proposal | null> {
  const client = ensureSupabase();
  const { data, error } = await client
    .from("proposals")
    .select("id,title,client_name,slug,data,created_at,updated_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToProposal(data as ProposalRow) : null;
}

export async function saveRemoteProposal(proposal: Proposal): Promise<Proposal> {
  const client = ensureSupabase();
  const row = proposalToRow(proposal);
  const { data, error } = await client
    .from("proposals")
    .upsert(row, { onConflict: "id" })
    .select("id,title,client_name,slug,data,created_at,updated_at")
    .single();

  if (error) throw error;
  return rowToProposal(data as ProposalRow);
}

export async function createRemoteProposal(proposal: Proposal): Promise<Proposal> {
  const client = ensureSupabase();
  const row = proposalToRow(proposal);
  const { data, error } = await client
    .from("proposals")
    .insert(row)
    .select("id,title,client_name,slug,data,created_at,updated_at")
    .single();

  if (error) throw error;
  return rowToProposal(data as ProposalRow);
}

export async function deleteRemoteProposal(id: string): Promise<void> {
  const client = ensureSupabase();
  const { error } = await client.from("proposals").delete().eq("id", id);
  if (error) throw error;
}
