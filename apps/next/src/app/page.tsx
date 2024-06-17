import { Background } from "../components/bg";
import { Card } from "../components/card";
import { Credit } from "../components/credit";
import { InfoBar } from "../components/info";
import { Logo } from "../components/logo";

export default function Home() {
  return (
    <Background>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <InfoBar />
          <Credit />
        </div>
        <Logo />
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          {cardDetails.map(({ link, title, description }, key) => (
            <Card
              key={key}
              link={link}
              title={title}
              description={description}
            />
          ))}
        </div>
      </main>
    </Background>
  );
}

const cardDetails: Record<"link" | "title" | "description", string>[] = [
  {
    link: "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app",
    title: "Docs",
    description: "Find in-depth information about Next.js features and API.",
  },
  {
    link: "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
    title: "Learn",
    description:
      "Learn about Next.js in an interactive course with&nbsp;quizzes!",
  },
  {
    link: "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app",
    title: "Templates",
    description: "Explore starter templates for Next.js.",
  },
  {
    link: "https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app",
    title: "Deploy",
    description:
      "Instantly deploy your Next.js site to a shareable URL with Vercel.",
  },
];
