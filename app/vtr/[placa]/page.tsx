import Records from "@/components/Records";

const Page = async ({
  params,
}: {
  params: Promise<{ placa: string }>
}) => {
  const { placa } = await params

  return (
    <div>
      <Records placa={placa}/>
      {placa}

    </div>
  );
};

export default Page;