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
    size: 50,
   
  },
  {
    accessorKey: "horaSaida",
    header: "Hora de Saída",
    size: 50,
  },
  {
    accessorKey: "kmSaida",
    header: "Km de Saída",
    size: 50,
  },
  {
    accessorKey: "motoristaSaida",
    header: "Motorista",
    size: 50,
    cell: ({ row }) => {
      const value = row.getValue("motoristaSaida") as string;
      const index = value.indexOf("@");
 
      return <div className="text-right font-medium">{value.slice(0,index)}</div>
    },
  },
  {
    accessorKey: "dataChegada",
    header: "Data de Chegada",
    size: 50,
  },
  {
    accessorKey: "horaChegada",
    header: "Hora de Chegada",
    size: 50,
  },
  {
    accessorKey: "kmChegada",
    header: "Km de Chegada",
    size: 50,
  },
  {
    accessorKey: "motoristaChegada",
    header: "Motorista",
    size: 50,
    cell: ({ row }) => {
      const value = row.getValue("motoristaSaida") as string;
      const index = value.indexOf("@");
 
      return <div className="text-right font-medium">{value.slice(0,index)}</div>
    },
  },
  {
    accessorKey: "finalidade",
    header: "Finalidade",
    size: 50,
  },
  {
    accessorKey: "observacoes",
    header: "Observações",
    size: 50,
  },
];