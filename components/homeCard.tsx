"use client";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { Button } from "@/components/ui/button";


export const HomeCard = () => {

    return (
        <div>
            <Card className="w-96 bg-linear-to-b from-[#4b5ec5] to-[#586bd8] text-white">
                <CardHeader>
                    <CardTitle>Selecione a Viatura</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <Link href="/vtr/AWD6931">
                        <Button variant="ghost">Duster AWD6931</Button>
                    </Link>
                    <Link href="/vtr/BCQ1683">
                        <Button variant="ghost">Duster BCQ1683</Button>
                    </Link>
                    <Link href="/vtr/ASZ5598">
                        <Button variant="ghost">Logan ASZ5598</Button>
                    </Link>
                    <Link href="/vtr/BCA3205">
                        <Button variant="ghost">Sandero BCA3205</Button>
                    </Link>
                    <Link href="/vtr/BCA3206">
                        <Button variant="ghost">Sandero BCA3206</Button>
                    </Link>
                    <Link href="/vtr/AZL9943">
                        <Button variant="ghost">Voyage AZL9943</Button>
                    </Link>
                    <Link href="/vtr/BDT3D98">
                        <Button variant="ghost">Voyage BDT3D98</Button>
                    </Link>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    );
};