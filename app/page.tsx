import { getCourses } from "@/lib/queries/courses"
import { DashboardView } from "@/components/dashboard/dashboard-view"
import { StaggerContainer, StaggerItem } from "@/components/dashboard/stagger-container"

import { Course } from "@/types/course"

export default async function HomePage() {
  let courses: Course[] = []
  let isError = false

  try {
    courses = await getCourses()
  } catch {
    isError = true
  }

  return (
    <StaggerContainer className="w-full">
      <StaggerItem>
        <DashboardView initialCourses={courses} isError={isError} />
      </StaggerItem>
    </StaggerContainer>
  )
}