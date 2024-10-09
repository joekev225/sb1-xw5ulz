"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const profilSchema = z.object({
  nomEntreprise: z.string().min(2, {
    message: "Le nom de l'entreprise doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  telephone: z.string().min(10, {
    message: "Veuillez entrer un numéro de téléphone valide.",
  }),
  siteWeb: z.string().url({
    message: "Veuillez entrer une URL valide.",
  }).optional().or(z.literal('')),
  adresse: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères.",
  }),
});

export default function ProfilMarchand() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof profilSchema>>({
    resolver: zodResolver(profilSchema),
    defaultValues: {
      nomEntreprise: "Ma Super Entreprise",
      email: "contact@masuperentreprise.com",
      telephone: "+33123456789",
      siteWeb: "https://www.masuperentreprise.com",
      adresse: "123 Rue du Commerce, 75001 Paris",
    },
  });

  function onSubmit(values: z.infer<typeof profilSchema>) {
    setIsSubmitting(true);
    // Ici, vous implémenteriez la logique pour mettre à jour les informations du profil
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      // Afficher un message de succès
    }, 2000);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Profil Marchand</h1>
      <Tabs defaultValue="informations">
        <TabsList className="mb-4">
          <TabsTrigger value="informations">Informations</TabsTrigger>
          <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
        </TabsList>
        <TabsContent value="informations">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l&apos;entreprise</CardTitle>
              <CardDescription>Mettez à jour les informations de votre entreprise ici.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="nomEntreprise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de l&apos;entreprise</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="siteWeb"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Web</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="adresse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="statistiques">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques du compte</CardTitle>
              <CardDescription>Aperçu de l&apos;activité de votre compte.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Total des transactions</h3>
                  <p className="text-2xl">1,234</p>
                </div>
                <div>
                  <h3 className="font-semibold">Montant total traité</h3>
                  <p className="text-2xl">56,789.00 €</p>
                </div>
                <div>
                  <h3 className="font-semibold">Taux de réussite des paiements</h3>
                  <p className="text-2xl">98.5%</p>
                </div>
                <div>
                  <h3 className="font-semibold">Date d&apos;inscription</h3>
                  <p className="text-2xl">01/01/2023</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}