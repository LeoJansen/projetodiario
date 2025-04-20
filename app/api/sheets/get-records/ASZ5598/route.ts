import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';


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
        const vtrChegadas = lastRecords.filter((record) => {
            if (record.vtrChegada == "LOGAN ASZ5598") {
                return record;
            }
            return

        })
        const vtrSaidas = lastRecords.filter((record) => {
            if (record.vtrSaida == "LOGAN ASZ5598") {
                return record;
            }
            return
        })
        console.log("vtrChegadas ", vtrChegadas)
        console.log("vtrSaidas ", vtrSaidas)


        // Combinar registros de saída e chegada em índices pares e ímpares
        const combinedRecords: Record<string, string>[] = [];
        let chegadaIndex = 0;
        let saidaIndex = 0;

        while (chegadaIndex < vtrChegadas.length || saidaIndex < vtrSaidas.length) {
            if (saidaIndex < vtrSaidas.length) {
                combinedRecords.push(vtrSaidas[saidaIndex]);
                saidaIndex++;
            }
            if (chegadaIndex < vtrChegadas.length) {
                combinedRecords.push(vtrChegadas[chegadaIndex]);
                chegadaIndex++;
            }
        }

        console.log("Registros combinados:", combinedRecords);

        // Remover quaisquer índices vazios (caso existam)
        const finalRecords = combinedRecords.filter((record) => record !== undefined);

        //console.log("Registros combinados:", finalRecords);







        return new Response(JSON.stringify(combinedRecords), { status: 200 });
    } catch (error: any) {
        console.error('Erro ao buscar dados do Google Sheets:', error.response?.data || error.message);
        const googleApiErrorMessage = error.response?.data?.error?.message;
        return new Response(JSON.stringify({ message: googleApiErrorMessage || 'Erro interno ao buscar os dados.' }), { status: 500 });
    }
}