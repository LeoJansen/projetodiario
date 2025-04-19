import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export async function POST(req: Request) {
    try {
        // Parse the request body
        const body = await req.json();
        const {
            dataSaida,
            horaSaida,
            kmSaida,
            dataChegada,
            horaChegada,
            kmChegada,
            motorista,
            finalidade,
            observacoes, // Can be empty/null
        } = body;

        // Basic validation
        if (!dataSaida || !horaSaida || !kmSaida || !dataChegada || !horaChegada || !kmChegada || !motorista || !finalidade) {
            return new Response(JSON.stringify({ message: 'Campos obrigatórios faltando.' }), { status: 400 });
        }

        if (Number(kmChegada) < Number(kmSaida)) {
            return new Response(JSON.stringify({ message: 'Km de Chegada não pode ser menor que Km de Saída.' }), { status: 400 });
        }

        // Authenticate with Google Sheets API
        const auth = new GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const range = process.env.GOOGLE_SHEET_NAME || 'Página1';
        const valueInputOption = 'USER_ENTERED';

        // Prepare the data to append
        const values = [
            [
                dataSaida,
                horaSaida,
                kmSaida,
                dataChegada,
                horaChegada,
                kmChegada,
                motorista,
                finalidade,
                observacoes || '', // Send empty string if null/undefined
            ],
        ];

        const resource = { values };

        // Append the data to Google Sheets
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption,
            resource,
        });

        console.log('Dados adicionados:', response.data.updates.updatedRange);
        return new Response(JSON.stringify({ message: 'Registro salvo com sucesso!', range: response.data.updates.updatedRange }), { status: 200 });
    } catch (error: any) {
        console.error('Erro ao enviar para Google Sheets:', error.response?.data || error.message);
        const googleApiErrorMessage = error.response?.data?.error?.message;
        return new Response(JSON.stringify({ message: googleApiErrorMessage || 'Erro interno ao salvar os dados.' }), { status: 500 });
    }
}