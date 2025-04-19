"use client";
// components/UltimosRegistros.js
import { useState, useEffect } from 'react';

export default function Records() {
    const [registros, setRegistros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função async para buscar os dados
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/sheets/get-records'); // Chama nossa nova API route
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
            }
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
                            <th>Data Chegada</th>
                            <th>Hora Chegada</th>
                            <th>Km Chegada</th>
                            <th>Motorista</th>
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
                                <td>{reg.dataChegada}</td>
                                <td>{reg.horaChegada}</td>
                                <td>{reg.kmChegada}</td>
                                <td>{reg.motorista}</td>
                                <td>{reg.finalidade}</td>
                                <td>{reg.observacoes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <style jsx>{`
                table {
                    margin-top: 15px;
                    font-size: 0.9em;
                }
                th, td {
                    text-align: left;
                    padding: 8px;
                    border: 1px solid #ddd;
                }
                th {
                    background-color: #f2f2f2;
                }
                tr:nth-child(even) {
                   background-color: #f9f9f9;
                }
            `}</style>
        </div>
    );
}