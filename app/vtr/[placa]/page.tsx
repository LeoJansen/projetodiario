import Records from "@/components/Records";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const Page = async ({
  params,
}: {
  params: { placa: string } // Removida a Promise, pois o Next.js já resolve
}) => {
  const { placa } = params;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" passHref>
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">
          Diário de Bordo - Viatura <span className="text-blue-600">{placa}</span>
        </h1>
      </div>
      <Records placa={placa} />
    </div>
  );
};

export default Page;