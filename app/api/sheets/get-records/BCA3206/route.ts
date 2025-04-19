import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

// Quantos dos últimos registros buscar
const NUM_RECORDS_TO_FETCH = 10; // Ajuste conforme necessário

// Defina os cabeçalhos EXATAMENTE como estão na sua planilha (e na ordem correta)
const headers = [
    'carimbo',
    'login',
    'tipoDeRegistro',
    'vtrChegada',
    'dataChegada',
    'kmChegada',
    'vtrSaída',
    'dataSaída',
    'horaSaída',
    'kmSaída',
    'finalidade',
    'procedimento'
];

export async function GET() {
    try {
        const auth = new GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'], // Apenas leitura é necessária
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const sheetName = process.env.GOOGLE_SHEET_NAME || 'Página1';
        const range = `${sheetName}!A2:M`; // Assume que os dados vão da coluna A até I

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const allValues = response.data.values || [];

        // Pegar os últimos N registros
        const lastRecordsRaw = allValues

        // Transformar os arrays em objetos usando os cabeçalhos
        const lastRecords = lastRecordsRaw.map((row, rowIndex) => {
            const record: Record<string, string> = {};
            headers.forEach((header, index) => {
                record[header] = row[index] !== undefined ? row[index] : ''; // Garante que existe valor, senão string vazia
            });
            // Adiciona um id simples baseado no índice (útil para keys no React)
            record.id = `record-${allValues.length - lastRecordsRaw.length + rowIndex}`;
            return record;
        }).reverse(); // Inverte para mostrar o mais recente primeiro
        console.log('Últimos registros:', lastRecords); // Log para verificar os dados
        return new Response(JSON.stringify(lastRecords), { status: 200 });
    } catch (error: any) {
        console.error('Erro ao buscar dados do Google Sheets:', error.response?.data || error.message);
        const googleApiErrorMessage = error.response?.data?.error?.message;
        return new Response(JSON.stringify({ message: googleApiErrorMessage || 'Erro interno ao buscar os dados.' }), { status: 500 });
    }
}