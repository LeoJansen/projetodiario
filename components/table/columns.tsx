"use client";

import { ColumnDef } from "@tanstack/react-table";

// Define the shape of the data for the "Diário de Bordo"
export type RegisterColumns = {
  id: string;
  dataSaida: string;
  horaSaida: string;
  kmSaida: number;
  dataChegada: string;
  horaChegada: string;
  kmChegada: number;
  motorista: string;
  finalidade: string;
  observacoes: string;
};



export const columns: ColumnDef<RegisterColumns>[] = [
  {
    accessorKey: "dataSaida",
    header: "Data de Saída",
  },
  {
    accessorKey: "horaSaida",
    header: "Hora de Saída",
  },
  {
    accessorKey: "kmSaida",
    header: "Km de Saída",
  },
  {
    accessorKey: "motoristaSaida",
    header: "Motorista",
  },
  {
    accessorKey: "dataChegada",
    header: "Data de Chegada",
  },
  {
    accessorKey: "horaChegada",
    header: "Hora de Chegada",
  },
  {
    accessorKey: "kmChegada",
    header: "Km de Chegada",
  },
  {
    accessorKey: "motoristaChegada",
    header: "Motorista",
  },
  {
    accessorKey: "finalidade",
    header: "Finalidade",
  },
  {
    accessorKey: "observacoes",
    header: "Observações",
  },
];