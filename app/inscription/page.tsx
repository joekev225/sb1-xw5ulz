"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
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
});

export default function InscriptionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomEntreprise: "",
      email: "",
      telephone: "",
      siteWeb: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Ici, vous implémenteriez la logique pour envoyer les données d'inscription
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      // Rediriger ou afficher un message de succès
    }, 2000);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Inscription Marchand</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nomEntreprise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l&apos;entreprise</FormLabel>
                <FormControl>
                  <Input placeholder="Votre entreprise" {...field} />
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
                  <Input type="email" placeholder="email@example.com" {...field} />
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
                  <Input type="tel" placeholder="+33 1 23 45 67 89" {...field} />
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
                <FormLabel>Site Web (optionnel)</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://www.votresite.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Inscription en cours...' : 'S&apos;inscrire'}
          </Button>
        </form>
      </Form>
    </div>
  );
}