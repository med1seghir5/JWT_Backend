import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  interface Medicament {
    id: string; // Ajout de l'ID du médicament
    type: string;
    name: string;
    AriDate: string;
    ExpDate: string;
    Quant: number;
    OnePrice: number;
  }

  const [type, settype] = useState<string>('');
  const [name, setname] = useState<string>(''); 
  const [AriDate, setAriDate] = useState<Date | null>(null);
  const [ExpDate, setExpDate] = useState<Date | null>(null);
  const [Quant, setQuant] = useState<number>();
  const [OnePrice, setOnePrice] = useState<number>();
  const [medicaments, setMedicaments] = useState<Medicament[]>([]);
  const [solde, setSolde] = useState<number>(500000);
  const [status, setStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const PostMed = async () => { 
    try {
      await axios.post('http://localhost:3000/api/Add', 
        {
          type,
          name, 
          AriDate,
          ExpDate,
          Quant,
          OnePrice
        },
        {
          withCredentials: true,
        }
      );
    } catch (err: any) {
      console.log(err.message);  
    }
  };

  const UpdateMed = async (id: string) => {
    try {
      await axios.put(`http://localhost:3000/api/Update/${id}`,
        {
          type,
          name, 
          AriDate,
          ExpDate,
          Quant,
          OnePrice
        },
        {
          withCredentials: true,
        }
      );
    } catch (err: any) {
      console.log(err.message);
    }
  };
  
  const DeleteMed = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/Delete/${id}`, {
        withCredentials: true,
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

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
  
  return (
    <div className="flex flex-col items-center space-y-5">
      {/* Sidebar */}
      <div className="fixed flex flex-col p-5 left-0 justify-between text-center hover:w-52 md:w-52 bg-gradient-to-r h-screen from-[#283342] to-[#009099] text-gray-600 transition-all duration-300 z-10 sidebar">
        {/* Logo */}
        <div className="text-white font-poppins font-bold mb-4">
          <img src="/Pictures/Logo.svg" alt="Logo" />
        </div>

        {/* Menu */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-white text-center">Menu</h2>
          <ul className="flex flex-col justify-center py-4 space-y-1">
            <li>
              <Link to="/Dashboard" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">
                <p className="ml-2 text-sm">General Dashboard</p>
              </Link>
            </li>
            <li>
              <Link to="/AdminDashboard" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">
                <p className="ml-2 text-sm">Admin Dashboard</p>
              </Link>
            </li>
            <li>
              <Link to="/AboutUs" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gradient-to-r from-[#283342] to-[#009099] text-white hover:text-gray-800 border-l-4 border-transparent px-2">
                <p className="ml-2 text-sm">About Us</p>
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout button & User information */}
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-lg font-semibold text-white">Username</h1>
          <button className="rounded-lg w-20 bg-transparent border-2 border-white text-white font-poppins font-semibold hover:border-[#283342] hover:text-[#283342] transition">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center space-y-7">
        <div className="text-center mb-5">
          <span className="font-poppins font-bold text-5xl">Admin Dashboard</span>
        </div>

        <form onSubmit={PostMed}>
        <div className="flex flex-row justify-evenly space-x-8">
          <div className='flex flex-col justify-center text-center space-y-1'>
            <span className='font-semibold text-xl'>Type de medicament</span>
            <input type='text' placeholder='Type' value={type} onChange={(e) => settype(e.target.value)} className="rounded-lg shadow-lg shadow-slate-400 border border-gray-500 text-center font-medium h-8"/>
          </div>

          <div className='flex flex-col justify-center text-center space-y-1'>
            <span className='font-semibold text-xl'>Nom de medicament</span>
            <input type='text' placeholder='Medicament' value={name} onChange={(e) => setname(e.target.value)} className="rounded-lg shadow-lg shadow-slate-400 border border-gray-500 text-center font-medium h-8"/>
          </div>

          <div className='flex flex-col justify-center text-center space-y-1'>
            <span className='font-semibold text-xl'>Date arrivage</span>
            <input type='date' value={AriDate ? AriDate.toISOString().split('T')[0] : ''} onChange={(e) => setAriDate(e.target.value ? new Date(e.target.value) : null)} className="rounded-lg shadow-lg shadow-slate-400 border border-gray-500 text-center font-medium h-8"/>
          </div>

          <div className='flex flex-col justify-center text-center space-y-1'>
            <span className='font-semibold text-xl'>Date Exp</span>
            <input type='date' value={ExpDate ? ExpDate.toISOString().split('T')[0] : ''} onChange={(e) => setExpDate(e.target.value ? new Date(e.target.value) : null)} className="rounded-lg shadow-lg shadow-slate-400 border border-gray-500 text-center font-medium h-8"/>
          </div>

          <div className='flex flex-col justify-center text-center space-y-1'>
            <span className='font-semibold text-xl'>Quantites</span>
            <input type="text" value={Quant ?? ''} onChange={(e) => setQuant(e.target.value ? parseInt(e.target.value, 10) : undefined)} placeholder="Quantites" className="rounded-lg shadow-lg shadow-slate-400 border border-gray-500 text-center font-medium h-8" />
          </div>

          <div className='flex flex-col justify-center text-center space-y-1'>
            <span className='font-semibold text-xl'>Prix</span>
            <input type="text" value={OnePrice ?? ''} onChange={(e) => setOnePrice(e.target.value ? parseInt(e.target.value, 10) : undefined)} placeholder="Prix" className="rounded-lg shadow-lg shadow-slate-400 border border-gray-500 text-center font-medium h-8" />
          </div>
        </div>

        <div  className="flex flex-row justify-center space-x-5">
              <button type="submit" className="rounded-lg w-32 h-8 bg-green-500 text-white font-semibold">Ajouter</button>
        </div>
          
        </form>

        <div className='flex flex-row justify-center'>
          <div>
            {medicaments.length === 0 && (
              <span className='font-semibold text-2xl text-red-500'>Le stock est vide</span>
            )}
            {medicaments.map((item, index) => (
              <div key={index} className='TasksButt'>
                <h3 className='text-lg font-bold'>{item.type}</h3>
                <p>{item.name}</p>
                <p>Arrivée: {item.AriDate}</p>
                <p>Expiration: {item.ExpDate}</p>
                <p>Quantité: {item.Quant}</p>
                <p>Prix Unitaire: {item.OnePrice}</p>
                <button className="rounded-lg w-32 h-8 bg-orange-500 text-white font-semibold" onClick={() => UpdateMed(item.id)}>Update</button>
                <button className="rounded-lg w-32 h-8 bg-red-500 text-white font-semibold" onClick={() => DeleteMed(item.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
