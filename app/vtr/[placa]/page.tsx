
const Page = async ({
  params,
}: {
  params: Promise<{ placa: string }>
}) => {
  const { placa } = await params

  return (
    <div>
      {placa}

    </div>
  );
};

export default Page;