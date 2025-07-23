'use server';

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formatData: CreateCompanion) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();

    console.log("Insert payload:", { ...formatData, author });
    const { data, error } = await supabase.from('companions').insert({ ...formatData, author }).select();
    console.log("Supabase insert result:", { data, error });

    if(error || !data) throw new Error(error?.message || 'Failed to create a companion')

    return data[0];
}