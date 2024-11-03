import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  interface Medicament {
    type: string;
    name: string;
    AriDate: string;
    ExpDate: string;
    Quant: number;
    OnePrice: number;
  }

  const [medicaments, setMedicaments] = useState<Medicament[]>([]);
  const [solde, setSolde] = useState<number>(500000);
  const [status, setStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Medicament[]>('http://localhost:3000/api/dashboard')
      .then((res) => {
        setMedicaments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors de la récupération des données');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const totalParType = medicaments.reduce((acc, medicament) => {
    const total = medicament.Quant * medicament.OnePrice;
    if (!acc[medicament.type]) {
      acc[medicament.type] = {
        quantite: 0,
        prixTotal: 0,
      };
    }
    acc[medicament.type].quantite += medicament.Quant;
    acc[medicament.type].prixTotal += total;

    return acc;
  }, {} as Record<string, { quantite: number; prixTotal: number }>);

  const totalQuantiteEtPrix = Object.values(totalParType).reduce(
    (acc, { quantite, prixTotal }) => ({
      quantite: acc.quantite + quantite,
      prixTotal: acc.prixTotal + prixTotal,
    }),
    { quantite: 0, prixTotal: 0 }
  );

  useEffect(() => {
    if(totalQuantiteEtPrix.prixTotal < solde){
      setStatus(true)
    }else{
      setStatus(false)
    }
  }, [totalQuantiteEtPrix.prixTotal, solde]);

  const Etat = () => {
    if(!status){
      return  <div className='flex flex-col justify-center space-y-3'>
                <img src='/Pictures/Vector.svg' alt='Danger'/>
                <span className="text-lg text-red-500 font-semibold">Bad</span>
              </div> 
    }else{
      return  <div className='flex flex-col justify-center space-y-5'>
                <img src='/Pictures/Vector (1).svg' alt='Good'/>
                <span className="text-lg text-green-500 font-semibold">Good</span>
              </div> 
    }
  };

  if (loading) return <div>Chargement des données...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center space-y-5">
      {/* Sidebar */}
      <div className="fixed flex flex-col p-5 left-0 justify-between text-center hover:w-52 md:w-52 bg-gradient-to-r h-screen from-[#283342] to-[#009099] text-gray-600 transition-all duration-300 z-10 sidebar">
        <div className="text-white font-poppins font-bold mb-4">
          <img src="/Pictures/Logo.svg" alt="Logo" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-white text-center">Menu</h2>
          <ul className="flex flex-col justify-center py-4 space-y-1">
            <li><Link to="/Dashboard" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">General Dashboard</Link></li>
            <li><Link to="/AdminDashboard" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">Admin Dashboard</Link></li>
            <li><Link to="/AboutUs" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">About Us</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-lg font-semibold text-white">Username</h1>
          <button className="rounded-lg w-20 bg-transparent border-2 border-white text-white font-poppins font-semibold hover:border-[#283342] hover:text-[#283342] transition">
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex flex-col items-center space-y-5">
  {/* Sidebar */}
  <div className="fixed flex flex-col p-5 left-0 justify-between text-center hover:w-52 md:w-52 bg-gradient-to-r h-screen from-[#283342] to-[#009099] text-gray-600 transition-all duration-300 z-10 sidebar">
    <div className="text-white font-poppins font-bold mb-4">
      <img src="/Pictures/Logo.svg" alt="Logo" />
    </div>

    <div className="flex flex-col">
      <h2 className="text-xl font-bold text-white text-center">Menu</h2>
      <ul className="flex flex-col justify-center py-4 space-y-1">
        <li>
          <Link to="/Dashboard" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">General Dashboard</Link>
        </li>
        <li>
          <Link to="/AdminDashboard" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">Admin Dashboard</Link>
        </li>
        <li>
          <Link to="/AboutUs" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">About Us</Link>
        </li>
      </ul>
    </div>

    <div className="flex flex-col items-center space-y-3">
      <h1 className="text-lg font-semibold text-white">Username</h1>
      <button className="rounded-lg w-20 bg-transparent border-2 border-white text-white font-poppins font-semibold hover:border-[#283342] hover:text-[#283342] transition">
        Logout
      </button>
    </div>
  </div>

  {/* Dashboard Content */}
  <div className="flex flex-col justify-center items-center space-y-16 ml-28 pb-6">
    <div className="text-center mb-5">
      <span className="font-bold text-4xl text-[#1D242E]">Dashboard</span>
    </div>

    <div className="flex flex-wrap w-full gap-5">
      {/* Ligne des trois premières cartes */}
      <div className="flex flex-col lg:flex-row justify-center gap-5 w-full">
        <div className="flex flex-col items-center lg:w-1/4">
          <div className='bg-gray-200 h-40 rounded-lg shadow-md flex flex-col items-center justify-center text-center p-16'>
            <Etat />
          </div>
        </div>

        <div className="flex flex-col items-center space-y-5 w-full lg:w-1/4">
          <div className='bg-gray-200 h-40 rounded-lg shadow-md flex flex-col items-center justify-center text-center p-12'>
            <img src='/Pictures/Vector (2).svg' alt='Sold logo'/>
            <span className='text-lg font-semibold text-[#1D242E]'>Achats <br/>{totalQuantiteEtPrix.prixTotal} DA</span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-5 w-full lg:w-1/4">
          <div className='bg-gray-200 h-40 rounded-lg shadow-md flex flex-col items-center justify-center text-center p-12'>
            <img src='/Pictures/Vector (2).svg' alt='Sold logo'/>
            <span className='text-lg font-semibold text-[#1D242E]'>Sold <br/>{solde} DA</span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-5 w-full lg:w-1/4">
          <div className='bg-gray-200 h-40 rounded-lg shadow-md flex flex-col items-center justify-center text-center p-12'>
            <img src='/Pictures/Group.svg' alt='Sold logo'/>
            <span className='text-lg font-semibold text-[#1D242E]'>Médicament <br/>{totalQuantiteEtPrix.quantite}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
  {Object.entries(totalParType).map(([type, { quantite, prixTotal }], index) => (
    <div 
      key={type} 
      className={`flex flex-col items-center space-y-5 ${
        index < 4.6 ? 'lg:col-span-0' : 'lg:col-span-5'
      }`}
    >
      <div className="bg-gray-200 h-40 rounded-lg shadow-md flex flex-col items-center justify-center text-center p-4">
        <img src='/Pictures/Group.svg' alt='Sold logo'/>

        <p className="text-xl font-semibold text-[#1D242E]">{type}</p>
        <p className='text-lg font-medium text-[#374252]'>Quantité: {quantite}</p>
        <p className='text-lg font-medium text-[#374252]'>Coût total: {prixTotal} DA</p>
      </div>
    </div>
  ))}
    </div>

  </div>
  </div>
  </div>
  );
}

export default Dashboard;
