import { HomeCard } from "@/components/homeCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <main className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tighter text-gray-800 sm:text-5xl md:text-6xl">
            Diário de Bordo Digital
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-2">
            Selecione uma viatura abaixo para visualizar os registros de saídas e chegadas.
          </p>
        </div>
        <HomeCard />
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-gray-500">Seu Rodapé - 2024</p>
      </footer>
    </div>
  );
}