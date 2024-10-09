"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

const formSchema = z.object({
  montant: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Le montant doit être un nombre positif.",
  }),
  numeroCarte: z.string().regex(/^\d{16}$/, {
    message: "Le numéro de carte doit contenir 16 chiffres.",
  }),
  dateExpiration: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "La date d'expiration doit être au format MM/YY.",
  }),
  cvv: z.string().regex(/^\d{3,4}$/, {
    message: "Le CVV doit contenir 3 ou 4 chiffres.",
  }),
});

export default function TerminalPaiement() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      montant: "",
      numeroCarte: "",
      dateExpiration: "",
      cvv: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);
    // Simuler le traitement du paiement
    setTimeout(() => {
      setIsProcessing(false);
      // Simuler un résultat aléatoire (succès ou échec)
      setPaymentStatus(Math.random() > 0.3 ? 'success' : 'error');
    }, 2000);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Terminal de Paiement Virtuel</h1>
      <Card>
        <CardHeader>
          <CardTitle>Traiter un paiement</CardTitle>
          <CardDescription>Entrez les détails de la carte pour effectuer un paiement.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="montant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant (€)</FormLabel>
                    <FormControl>
                      <Input placeholder="100.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numeroCarte"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de carte</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012 3456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dateExpiration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date d&apos;expiration</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? 'Traitement en cours...' : 'Traiter le paiement'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          {paymentStatus === 'success' && (
            <Alert className="w-full">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Paiement réussi</AlertTitle>
              <AlertDescription>
                Le paiement a été traité avec succès.
              </AlertDescription>
            </Alert>
          )}
          {paymentStatus === 'error' && (
            <Alert className="w-full" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur de paiement</AlertTitle>
              <AlertDescription>
                Le paiement n&apos;a pas pu être traité. Veuillez réessayer.
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}