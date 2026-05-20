import { SectionHeading } from '@/components/sections/section-heading';
import { Card } from '@/components/ui/card';

const courses = [
  {
    title: 'Flutter Development',
    description: 'Build modern cross-platform mobile applications using Flutter and Dart.',
  },
  {
    title: 'Python Programming',
    description: 'Learn Python fundamentals, automation, backend development, and practical programming concepts.',
  },
  {
    title: 'Java Programming',
    description: 'Understand object-oriented programming and modern Java application development.',
  },
  {
    title: 'UI/UX Design',
    description: 'Design modern user interfaces and engaging digital experiences using Figma and design systems.',
  },
  {
    title: 'Web Development',
    description: 'Frontend and backend web development using modern frameworks and technologies.',
  },
];

export default function CoursesPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Courses / Training ]"
        title="Learn Industry-Focused Digital Skills"
        description="Training tracks designed for practical implementation and career-focused growth."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.title}>
            <h3 className="font-display text-lg font-semibold">{course.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{course.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
