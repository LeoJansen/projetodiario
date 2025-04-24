"use client";
// components/UltimosRegistros.js
import { useState, useEffect } from 'react';


import { SeparatorHorizontal } from 'lucide-react';
import {
    Card,
    CardDescription,
    CardFooter,
  } from "@/components/ui/card"
  

export default function Records({ placa }: { placa: string }) {
    const [registros, setRegistros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função async para buscar os dados
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/sheets/get-records/${placa}`); // Chama nossa nova API route
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Erro ${response.status}`);
                }
                const data = await response.json();
                setRegistros(data);
            } catch (err) {
                console.error("Falha ao buscar registros:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
                // Log para verificar os dados
            }
            console.log("Registros carregados:", registros);
        };

        fetchData(); // Chama a função ao montar o componente
    }, []); // Array de dependências vazio para rodar apenas uma vez

    // Renderização condicional baseada no estado
    if (isLoading) {
        return <p>Carregando últimos registros...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Erro ao carregar registros: {error}</p>;
    }

    if (registros.length === 0) {
        return <p>Nenhum registro encontrado.</p>;
    }

    // Renderiza a tabela com os registros
    return (
        <div>
            <h2>Últimos Registros de Viagem</h2>
            <div className='flex flex-col items-center justify-center w-full'>

                {registros.map((registro: any, index: number) => (
                    <div key={index} className='flex flex-col w-[500px] gap-2'>
                        <div className='flex w-full gap-2 justify-center items-center'>
                            <div className='flex flex-row w-40 justify-center  p-0 rounded-[6px] border-none bg-[#2d333a] cursor-pointer '>
                                <div className='flex flex-col p-2'>
                                <CardDescription className='text-center '>Saída</CardDescription>
                                    <div> {registro.kmSaida} </div>
                                </div >
                                <div className='flex flex-col p-2 text-sm gap-[2px]'>
                               <p>{registro.dataSaida}</p>
                               <p>{registro.horaSaida}</p>
                                </div>      
                            </div>  
                            <Card className='flex gap-2 rounded-[6px] border-none cursor-pointer'>
                                <div>
                                <CardDescription className='text-center'>Chegada</CardDescription>
                                    <div>{registro.kmChegada} </div>
                                </div>
                                <div>
                                
                                {registro.dataChegada}
                                </div>
                                <CardFooter>
                               {registro.horaChegada}
                                </CardFooter>
                            </Card>
                        </div>

                        <SeparatorHorizontal className="w-full h-[1px] bg-gray-200 my-4" />

                    </div>
                ))}





            </div>
        </div>
    );
}