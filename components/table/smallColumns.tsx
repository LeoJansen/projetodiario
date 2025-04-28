"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

// Define the shape of the data for the "Diário de Bordo"
export type RegisterColumn = {
  id:string
  data: string;
  hora: string;
  km: number;
  motorista: string;
};

const columnHelper = createColumnHelper<RegisterColumn>()

export const smallColumns: ColumnDef<RegisterColumn>[] = [
  
  columnHelper.group({
    id: 'saida',
    header: 'Saída',
    columns: [
      {
        id: "saida",
        header: "",
        size: 50,   
        cell: ({ row }) => {
         
 
          return <div className="text-center">
            <Image src='/assets/saida.svg' 
            alt="Saída"
            width={35}
            height={15}
            />
            </div>
        }
      },
      columnHelper.accessor('dataSaida', {
        header: 'Data',
        size: 50,     
      }),
      columnHelper.accessor('horaSaida', {
        header: 'Hora',
        size: 50,
      }),
      columnHelper.accessor('kmSaida', {
        header: 'Km',
        size: 50,
      }),
      columnHelper.accessor('motoristaSaida', {
        header: 'Motorista',
        size: 50,
        cell: ({ row }) => {
          const value = row.getValue("motoristaSaida") as string;
          const index = value.indexOf("@");
 
          return <div className="text-center">{value.slice(0,index)}</div>
        },
      }),
    ],
  }),
  columnHelper.group({
    id: 'chegada',
    header: 'Chegada',
    columns: [
      {
        id: "chegada",
        header: "",
        size: 50,   
        cell: ({ row }) => {
         
 
          return <div className="text-center">
            <Image src='/assets/chegada.svg' 
            alt="Saída"
            width={35}
            height={15}
            />
            </div>
        }
      },
      columnHelper.accessor('dataChegada', {
        header: 'Data',
      
        size: 50,
      }),
      columnHelper.accessor('horaChegada', {
        header: 'Hora',
        size: 50,
      }),
      columnHelper.accessor('kmChegada', {
        header: 'Km',
        size: 50,
      }),
      columnHelper.accessor('motoristaChegada', {
        header: 'Motorista',
        size: 50,
        cell: ({ row }) => {
          const value = row.getValue("motoristaSaida") as string;
          const index = value.indexOf("@");
 
          return <div className="text-center">{value.slice(0,index)}</div>
        },
      }),
    ],
  }),
 

];