"use client";

import { useState, useEffect } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { smallColumns, RegisterColumn } from './table/smallColumns'; // Importamos o tipo também

export default function Records({ placa }: { placa: string }) {
    const [registros, setRegistros] = useState<RegisterColumn[]>([]); // Tipamos o estado
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Tipamos o erro

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Usamos a rota da API específica para a placa
                const response = await fetch(`/api/sheets/get-records/${placa}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Erro ${response.status}`);
                }
                const data = await response.json();
                setRegistros(data);
            } catch (err: any) {
                console.error("Falha ao buscar registros:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (placa) {
          fetchData();
        }
    // Adicionamos 'placa' como dependência para buscar novos dados se a placa mudar
    }, [placa]);

    // A definição da tabela agora fica dentro do componente
    const table = useReactTable({
      data: registros,
      columns: smallColumns, // Usamos as colunas definidas em smallColumns.tsx
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    // Renderização condicional para carregamento e erros
    if (isLoading) {
        return <p className="text-center text-gray-500">Carregando últimos registros...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Erro ao carregar registros: {error}</p>;
    }

    if (registros.length === 0) {
        return <p className="text-center text-gray-500">Nenhum registro encontrado para esta viatura.</p>;
    }

    // Renderiza a tabela com os registros
    return (
        <div className="w-full">
            {/* Usamos as classes que sugeri anteriormente para um visual mais limpo */}
            <div className="rounded-md border bg-card shadow-sm">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        style={{ width: header.getSize() ? header.getSize() : undefined }}
                                        className="text-center font-bold"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() ? "selected" : undefined}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="p-2 text-center">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* Controles de Paginação */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Próximo
                </Button>
            </div>
        </div>
    );
}