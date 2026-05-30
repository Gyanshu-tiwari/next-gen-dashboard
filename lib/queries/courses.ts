import { supabase } from "../supabase/server"
import { Course } from "@/types/course"

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return data
}