"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Search, DollarSign, Users, CreditCard, ArrowDownToLine } from "lucide-react"

// Types
type PendingRegistration = {
  id: string;
  nomEntreprise: string;
  email: string;
  dateInscription: string;
  status: 'en attente' | 'approuvé' | 'rejeté';
};

type Marchand = {
  id: string;
  nomEntreprise: string;
  email: string;
  dateInscription: string;
  solde: number;
};

type Transaction = {
  id: string;
  marchand: string;
  montant: number;
  date: string;
  statut: 'complété' | 'en attente' | 'échoué';
};

type WithdrawalRequest = {
  id: string;
  marchand: string;
  montant: number;
  datedemande: string;
  statut: 'en attente' | 'traité';
  compteBancaire: string;
};

export default function AdminDashboard() {
  // États
  const [pendingRegistrations, setPendingRegistrations] = useState<PendingRegistration[]>([
    { id: '1', nomEntreprise: 'Hotel Luxe', email: 'contact@hotelluxe.com', dateInscription: '2023-05-01', status: 'en attente' },
    { id: '2', nomEntreprise: 'Restaurant Gourmet', email: 'info@restaurantgourmet.com', dateInscription: '2023-05-02', status: 'en attente' },
    { id: '3', nomEntreprise: 'Boutique Mode', email: 'service@boutiquemode.com', dateInscription: '2023-05-03', status: 'en attente' },
  ]);

  const [marchands, setMarchands] = useState<Marchand[]>([
    { id: '4', nomEntreprise: 'Café Central', email: 'info@cafecentral.com', dateInscription: '2023-04-15', solde: 1500 },
    { id: '5', nomEntreprise: 'Librairie Page', email: 'contact@librairiepage.com', dateInscription: '2023-04-20', solde: 2300 },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 't1', marchand: 'Café Central', montant: 150, date: '2023-05-04', statut: 'complété' },
    { id: 't2', marchand: 'Librairie Page', montant: 75.50, date: '2023-05-04', statut: 'en attente' },
    { id: 't3', marchand: 'Hotel Luxe', montant: 500, date: '2023-05-03', statut: 'complété' },
  ]);

  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([
    { id: 'w1', marchand: 'Café Central', montant: 1000, datedemande: '2023-05-05', statut: 'en attente', compteBancaire: 'FR76 1234 5678 9012 3456 7890 123' },
    { id: 'w2', marchand: 'Librairie Page', montant: 1500, datedemande: '2023-05-06', statut: 'en attente', compteBancaire: 'FR76 9876 5432 1098 7654 3210 987' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Fonctions
  const handleApprove = (id: string) => {
    setPendingRegistrations(prevState =>
      prevState.map(reg =>
        reg.id === id ? { ...reg, status: 'approuvé' } : reg
      )
    );
    console.log(`Inscription ${id} approuvée`);
  };

  const handleReject = (id: string) => {
    setPendingRegistrations(prevState =>
      prevState.map(reg =>
        reg.id === id ? { ...reg, status: 'rejeté' } : reg
      )
    );
    console.log(`Inscription ${id} rejetée`);
  };

  const handleWithdrawalProcess = (id: string) => {
    setWithdrawalRequests(prevState =>
      prevState.map(req =>
        req.id === id ? { ...req, statut: 'traité' } : req
      )
    );
    console.log(`Demande de retrait ${id} traitée`);
  };

  const filteredMarchands = marchands.filter(marchand =>
    marchand.nomEntreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
    marchand.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Composants
  const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de Bord Administrateur</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Marchands" value={marchands.length.toString()} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Inscriptions en attente" value={pendingRegistrations.filter(r => r.status === 'en attente').length.toString()} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Transactions du jour" value={transactions.filter(t => t.date === '2023-05-04').length.toString()} icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Demandes de retrait" value={withdrawalRequests.filter(w => w.statut === 'en attente').length.toString()} icon={<ArrowDownToLine className="h-4 w-4 text-muted-foreground" />} />
      </div>

      <Tabs defaultValue="inscriptions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inscriptions">Inscriptions en attente</TabsTrigger>
          <TabsTrigger value="marchands">Marchands</TabsTrigger>
          <TabsTrigger value="transactions">Transactions récentes</TabsTrigger>
          <TabsTrigger value="retraits">Demandes de retrait</TabsTrigger>
        </TabsList>

        <TabsContent value="inscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Inscriptions en attente de validation</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date d&apos;inscription</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell>{registration.nomEntreprise}</TableCell>
                      <TableCell>{registration.email}</TableCell>
                      <TableCell>{registration.dateInscription}</TableCell>
                      <TableCell>
                        <Badge variant={registration.status === 'en attente' ? 'outline' : registration.status === 'approuvé' ? 'default' : 'destructive'}>
                          {registration.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(registration.id)}
                            disabled={registration.status !== 'en attente'}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" /> Approuver
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(registration.id)}
                            disabled={registration.status !== 'en attente'}
                          >
                            <XCircle className="mr-2 h-4 w-4" /> Rejeter
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marchands">
          <Card>
            <CardHeader>
              <CardTitle>Marchands approuvés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Rechercher un marchand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search className="mr-2 h-4 w-4" />}
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date d&apos;inscription</TableHead>
                    <TableHead>Solde</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMarchands.map((marchand) => (
                    <TableRow key={marchand.id}>
                      <TableCell>{marchand.nomEntreprise}</TableCell>
                      <TableCell>{marchand.email}</TableCell>
                      <TableCell>{marchand.dateInscription}</TableCell>
                      <TableCell>{marchand.solde.toFixed(2)} €</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marchand</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.marchand}</TableCell>
                      <TableCell>{transaction.montant.toFixed(2)} €</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.statut === 'complété' ? 'default' : transaction.statut === 'en attente' ? 'outline' : 'destructive'}>
                          {transaction.statut}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retraits">
          <Card>
            <CardHeader>
              <CardTitle>Demandes de retrait</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marchand</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Date de demande</TableHead>
                    <TableHead>Compte bancaire</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawalRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.marchand}</TableCell>
                      <TableCell>{request.montant.toFixed(2)} €</TableCell>
                      <TableCell>{request.datedemande}</TableCell>
                      <TableCell>{request.compteBancaire}</TableCell>
                      <TableCell>
                        <Badge variant={request.statut === 'en attente' ? 'outline' : 'default'}>
                          {request.statut}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => handleWithdrawalProcess(request.id)}
                          disabled={request.statut === 'traité'}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" /> Marquer comme traité
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}