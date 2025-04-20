"use client";
// components/UltimosRegistros.js
import { useState, useEffect } from 'react';

export default function Records({placa} : {placa: string}) {
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
            <div style={{ overflowX: 'auto' }}> {/* Para rolagem horizontal em telas pequenas */}
                <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Data Saída</th>
                            <th>Hora Saída</th>
                            <th>Km Saída</th>
                            <th>Motorista Saída</th>
                            <th>Data Chegada</th>
                            <th>Hora Chegada</th>
                            <th>Km Chegada</th>
                            <th>Motorista Chegada</th>
                            <th>Finalidade</th>
                            <th>Observações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map((reg) => (
                            <tr key={reg.id}> {/* Usa o id gerado na API */}
                                <td>{reg.dataSaida}</td>
                                <td>{reg.horaSaida}</td>
                                <td>{reg.kmSaida}</td>
                                <td>{reg.motoristaSaida}</td>
                                <td>{reg.dataChegada}</td>
                                <td>{reg.horaChegada}</td>
                                <td>{reg.kmChegada}</td>
                                <td>{reg.motoristaChegada}</td>
                                <td>{reg.finalidade}</td>
                                <td>{reg.observacoes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
     
        </div>
    );
}