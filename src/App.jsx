import Header from "./components/Header";
import QuestBox from "./components/QuestBox";

export default function App() {
  return (
    <div className="text-body min-h-screen">
      <Header />
      <Main>
        <QuestBox
          bgColor="bg-[#5f7b7b]"
          headingText="Planning"
          headingColor="text-[#d1d9d9]"
        />
        <QuestBox
          bgColor="bg-[#fcc419]"
          headingText="In Progress"
          headingColor="text-dark"
        />
        <QuestBox
          bgColor="bg-primary"
          headingText="Completed"
          headingColor="text-body"
        />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return (
    <main className="mx-auto grid max-w-[71.25rem] grid-cols-3 items-start gap-4">
      {children}
    </main>
  );
}
