"use client"

import { useState } from 'react';

export const Form = () => {
    // Estados para cada campo do formulário
    const [dataSaida, setDataSaida] = useState('');
    const [horaSaida, setHoraSaida] = useState('');
    const [kmSaida, setKmSaida] = useState('');
    const [dataChegada, setDataChegada] = useState('');
    const [horaChegada, setHoraChegada] = useState('');
    const [kmChegada, setKmChegada] = useState('');
    const [motorista, setMotorista] = useState('');
    const [finalidade, setFinalidade] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const [status, setStatus] = useState({ submitting: false, message: '', error: false });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus({ submitting: true, message: '', error: false });

        // Validar Km (simples exemplo)
        if (isNaN(Number(kmSaida)) || isNaN(Number(kmChegada))) {
             setStatus({ submitting: false, message: 'Erro: Km de Saída e Chegada devem ser números.', error: true });
             return;
        }
         if (Number(kmChegada) < Number(kmSaida)) {
             setStatus({ submitting: false, message: 'Erro: Km de Chegada não pode ser menor que Km de Saída.', error: true });
             return;
        }


        try {
            const response = await fetch('/api/sheets', { // Mantém o mesmo endpoint da API route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Envia todos os campos no corpo da requisição
                body: JSON.stringify({
                    dataSaida,
                    horaSaida,
                    kmSaida,
                    dataChegada,
                    horaChegada,
                    kmChegada,
                    motorista,
                    finalidade,
                    observacoes,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Algo deu errado ao salvar os dados.');
            }

            // Sucesso! Limpar formulário e mostrar mensagem
            setStatus({ submitting: false, message: data.message, error: false });
            setDataSaida('');
            setHoraSaida('');
            setKmSaida('');
            setDataChegada('');
            setHoraChegada('');
            setKmChegada('');
            setMotorista('');
            setFinalidade('');
            setObservacoes('');

        } catch (error) {
            setStatus({ submitting: false, message: `Erro: ${error.message}`, error: true });
        }
    };

    // Função auxiliar para limpar o formulário
    const handleClearForm = () => {
        setDataSaida('');
        setHoraSaida('');
        setKmSaida('');
        setDataChegada('');
        setHoraChegada('');
        setKmChegada('');
        setMotorista('');
        setFinalidade('');
        setObservacoes('');
        setStatus({ submitting: false, message: '', error: false });
    }

    return (
        <div>
            <h1>Registro de Uso de Veículo</h1>
            <form onSubmit={handleSubmit}>
                {/* Campos de Saída */}
                <fieldset>
                    <legend>Saída</legend>
                    <div>
                        <label htmlFor="dataSaida">Data:</label>
                        <input type="date" id="dataSaida" value={dataSaida} onChange={(e) => setDataSaida(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="horaSaida">Hora:</label>
                        <input type="number" id="horaSaida" value={horaSaida} onChange={(e) => setHoraSaida(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="kmSaida">Km:</label>
                        <input type="number" id="kmSaida" value={kmSaida} onChange={(e) => setKmSaida(e.target.value)} required min="0" step="any"/>
                    </div>
                </fieldset>

                {/* Campos de Chegada */}
                <fieldset>
                    <legend>Chegada</legend>
                    <div>
                        <label htmlFor="dataChegada">Data:</label>
                        <input type="date" id="dataChegada" value={dataChegada} onChange={(e) => setDataChegada(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="horaChegada">Hora:</label>
                        <input type="number" id="horaChegada" value={horaChegada} onChange={(e) => setHoraChegada(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="kmChegada">Km:</label>
                        <input type="number" id="kmChegada" value={kmChegada} onChange={(e) => setKmChegada(e.target.value)} required min="0" step="any"/>
                    </div>
                </fieldset>

                {/* Outros Campos */}
                <fieldset>
                     <legend>Detalhes</legend>
                    <div>
                        <label htmlFor="motorista">Motorista (Login/Email):</label>
                        <input type="email" id="motorista" value={motorista} onChange={(e) => setMotorista(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="finalidade">Finalidade:</label>
                        <textarea id="finalidade" value={finalidade} onChange={(e) => setFinalidade(e.target.value)} required rows={3} />
                    </div>
                    <div>
                        <label htmlFor="observacoes">Observações:</label>
                        <textarea id="observacoes" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} rows={3} />
                    </div>
                </fieldset>

                {/* Botões e Status */}
                <div>
                    <button type="submit" disabled={status.submitting}>
                        {status.submitting ? 'Salvando...' : 'Salvar Registro'}
                    </button>
                    <button type="button" onClick={handleClearForm} style={{ marginLeft: '10px' }}>
                        Limpar Formulário
                    </button>
                </div>
            </form>

            {status.message && (
                <p style={{ color: status.error ? 'red' : 'green', marginTop: '15px' }}>
                    {status.message}
                </p>
            )}

            {/* Adicionar um pouco de CSS básico para melhor layout (opcional) */}
            <style jsx>{`
                form div { margin-bottom: 10px; }
                label { display: inline-block; width: 150px; margin-right: 10px; vertical-align: top; }
                input[type="text"], input[type="email"], input[type="number"], input[type="date"], input[type="time"], textarea {
                    width: 250px;
                    padding: 5px;
                }
                textarea { vertical-align: top; }
                fieldset { border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; }
                legend { font-weight: bold; padding: 0 5px; }
                button { padding: 10px 15px; cursor: pointer; }
            `}</style>
        </div>
    );
}