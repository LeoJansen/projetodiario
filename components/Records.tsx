"use client";
// components/UltimosRegistros.js
import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
            <div>
                <Table>
                    <TableCaption>Registros da VTR</TableCaption>
                    <TableHeader>
                        <TableRow >
                            <TableHead className="w-[100px]">Data Saída</TableHead>
                            <TableHead className="text-center">Hora Saída</TableHead>
                            <TableHead className="text-center">Km Saída</TableHead>
                            <TableHead className="text-center" >Motorista Saída</TableHead>
                            <TableHead className="text-center">Data Chegada</TableHead>
                            <TableHead className="text-center">Hora Chegada</TableHead>
                            <TableHead className="text-center">Km Chegada</TableHead>
                            <TableHead className="text-center">Motorista Chegada</TableHead>
                            <TableHead className="text-center">Finalidade</TableHead>
                            <TableHead className="text-center">Observações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {registros.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.dataSaida}</TableCell>
                                <TableCell className="text-center">{reg.horaSaida}</TableCell>
                                <TableCell className="text-center">{reg.kmSaida}</TableCell>
                                <TableCell className="text-center">{reg.motoristaSaida}</TableCell>
                                <TableCell className="text-center">{reg.dataChegada}</TableCell>
                                <TableCell className="text-center">{reg.horaChegada}</TableCell>
                                <TableCell className="text-center">{reg.kmChegada}</TableCell>
                                <TableCell className="text-center">{reg.motoristaChegada}</TableCell>
                                <TableCell>{reg.finalidade}</TableCell>
                                <TableCell className="text-right">{reg.observacoes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
}