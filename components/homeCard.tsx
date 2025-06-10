"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HomeCard = () => {
    // Lista de viaturas para facilitar a manutenção
    const viaturas = [
        { nome: "Duster AWD6931", placa: "AWD6931" },
        { nome: "Duster BCQ1683", placa: "BCQ1683" },
        { nome: "Logan ASZ5598", placa: "ASZ5598" },
        { nome: "Sandero BCA3205", placa: "BCA3205" },
        { nome: "Sandero BCA3206", placa: "BCA3206" },
        { nome: "Voyage AZL9943", placa: "AZL9943" },
        { nome: "Voyage BDT3D98", placa: "BDT3D98" },
    ];

    return (
        <Card className="w-full max-w-md shadow-lg bg-gray-900">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Selecione a Viatura</CardTitle>
                <CardDescription className="text-center text-gray-500">
                    Clique em uma viatura para ver seu diário de bordo.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {viaturas.map((vtr) => (
                    <Link key={vtr.placa} href={`/vtr/${vtr.placa}`} passHref>
                        <Button variant="outline" className="w-full justify-start gap-2">
                            {/* Pode-se adicionar um ícone de carro aqui no futuro */}
                            <span className="truncate">{vtr.nome}</span>
                        </Button>
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
};