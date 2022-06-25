import { gql, useQuery } from "@apollo/client";
import { Lesson } from "./Lesson";

// Utilizando o GraphQL para buscar os dados da API
const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      availableAt
      title
      slug
    }
  }
`;

// criando um componente para renderizar os dados da API
interface GetLessonsQueryResponse {
  lessons: {
    id: string;
    title: string;
    slug: string;
    availableAt: string;
    lessonType: "live" | "class";
  }[];
}
interface SidebarProps {
  visible: string;
}

export function Sidebar(props: SidebarProps) {
  const { data, loading } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY); // buscando os dados da API

  return (
    <aside
      className={`lg:w-[348px] lg:block ${props.visible} lg:relative absolute top-0 z-50 bg-gray-700 p-6 border-l border-gray-600 w-full min-h-full`}
    >
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map((lesson) => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          );
        })}
      </div>
    </aside>
  );
}
