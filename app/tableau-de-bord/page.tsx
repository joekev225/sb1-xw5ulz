"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function TableauDeBord() {
  const [solde, setSolde] = useState(1000); // Exemple de solde
  const [transactions, setTransactions] = useState([
    { id: 1, montant: 100, date: '2023-04-01', statut: 'Complété' },
    { id: 2, montant: 250, date: '2023-04-02', statut: 'En attente' },
    // Ajoutez d'autres transactions d'exemple ici
  ]);
  const [montantRetrait, setMontantRetrait] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDemandeRetrait = () => {
    const montant = parseFloat(montantRetrait);
    if (isNaN(montant) || montant <= 0 || montant > solde) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un montant valide inférieur ou égal à votre solde.",
        variant: "destructive",
      });
      return;
    }

    // Ici, vous implémenteriez la logique pour envoyer la demande de retrait
    console.log(`Demande de retrait de ${montant} € envoyée`);
    toast({
      title: "Demande envoyée",
      description: `Votre demande de retrait de ${montant} € a été envoyée avec succès.`,
    });
    setIsDialogOpen(false);
    setMontantRetrait('');
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tableau de Bord Marchand</h1>
        <Button asChild variant="outline">
          <Link href="/profil">Gérer le profil</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Solde du Porte-monnaie</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{solde.toFixed(2)} €</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4">Demander un retrait</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Demande de retrait</DialogTitle>
                  <DialogDescription>
                    Entrez le montant que vous souhaitez retirer. Le montant maximum est de {solde.toFixed(2)} €.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="montant" className="text-right">
                      Montant
                    </Label>
                    <Input
                      id="montant"
                      type="number"
                      value={montantRetrait}
                      onChange={(e) => setMontantRetrait(e.target.value)}
                      className="col-span-3"
                      placeholder="0.00"
                      min="0"
                      max={solde}
                      step="0.01"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleDemandeRetrait}>Confirmer la demande</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Terminal de Paiement Virtuel</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/terminal-paiement">Accéder au Terminal</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Dernières Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Date</th>
                <th className="text-left">Montant</th>
                <th className="text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.montant.toFixed(2)} €</td>
                  <td>{transaction.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}