"use client";
// components/UltimosRegistros.js
import { useState, useEffect } from 'react';

import {  columns} from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";

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
           
                <DataTable columns={columns} data={registros}/>
           
            </div>

        </div>
    );
}