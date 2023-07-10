import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

interface LoanData {
    // purpose: string,
    // interest_rate: number,
    // installment: number,
    // income: number,
    // fico_score: number,
    // revol_bal: number,
    // inquiries: number,
    // pub_rec: number, 
    prediction: string
}

function App() {
    const [prediction, setPrediction] = useState<string>();

    function getPrediction() {
        const options = {
            method: 'POST',
            url: 'http://localhost:8081/predict',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            data:
            {
                "credit.policy": 1,
                "purpose": "debt_consolidation",
                "int.rate": 0.1083,
                "installment": 231.3,
                "log.annual.inc": 11.813,
                "fico": 710,
                "revol.bal": 15000,
                "inq.last.6mths": 2,
                "pub.rec": 0
            },
        };
        // console.log(options);
    
        axios.request(options)
            .then(function ({ data }: { data: Response }) {
                console.log('Success');
                console.log(JSON.stringify(data));
                setPrediction(JSON.stringify(data))
                console.log(prediction);
            })
            .catch(function (error: any) {
                console.log('Error');
                console.error(error);
        });
    }

    const predictionHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        getPrediction();
    }

    return (
    <div className="App">
        <div className='grid grid-cols-1 content-center border space-x-30 min-h-screen'>
            <div className='px-4 py-1'>
                <p className='text-slate-800 text-3xl p-6'>Loan Predicter</p>
                <p className='text-indigo-950 text-md p-2'>See whether a person is likely to pay back their loan in full</p>
            </div>
            <div className='flex items-center content-center'>
                <div className='w-6/12 mx-auto p-6 bg-indigo-50 rounded-xl'>
                    <div className='grid grid-cols-2'>
                        <div className='flex flex-row-reverse'>
                            <div className='flex flex-col justify-center items-center px-2'>
                                <label className='block text-slate-800 p-2.5 pb-1'>Loan Purpose</label>
                                <select id='purpose' placeholder='Debt Consolidation' className='bg-slate-200 border border-slate-300 rounded-md text-slate-600 focus:border-indigo-900 p-2 m-5 min-w-full'>
                                    <option selected>Choose a loan purpose</option>
                                    <option value="consolidation">Debt Consolidation</option>
                                    <option value="credit_card">Credit Card</option>
                                    <option value="other">Other</option>
                                    <option value="home">Home Improvement</option>
                                    <option value="business">Small Business</option>
                                    <option value="purchase">Major Purchase</option>
                                    <option value="education">Educational Purposes</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col justify-center items-center'>
                                <label className='block text-slate-800 p-2.5 pb-1'>Interest Rate</label>
                                <input type='text' id='interest_rate' placeholder='11.127%' className='bg-slate-200 border border-slate-300 rounded-md text-slate-600 focus:border-blue-500 p-2 m-3'></input>
                            </div>
                        </div>
                        <div className='flex flex-row-reverse'>
                            <div className='flex flex-col justify-center items-center'>
                                <label className='block text-slate-800 p-2.5 pb-1'>Monthly Installment</label>
                                <input type='text' id='installment' placeholder='830.10' className='bg-slate-200 border border-slate-300 rounded-md text-slate-600 focus:border-blue-500 p-2 m-3'></input>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col justify-center items-center'>
                                <label className='block text-slate-800 p-2.5 pb-1'>Annual Income</label>
                                <input type='text' id='income' placeholder='120000' className='bg-slate-200 border border-slate-300 rounded-md text-slate-600 focus:border-blue-500 p-2 m-3'></input>
                            </div>
                        </div>
                        <div className='flex flex-row-reverse'>
                            <div className='flex flex-col justify-center items-center'>
                                <label className='block text-slate-800 p-2.5 pb-1'>Credit Score</label>
                                <input type='text' id='fico_score' placeholder='675' className='bg-slate-200 border border-slate-300 rounded-md text-slate-600 focus:border-blue-500 p-2 m-3'></input>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col justify-center items-center'>
                                <label className='block text-slate-800 p-2.5 pb-1'>Unpaid Balance</label>
                                <input type='text' id='revol_bal' placeholder='27500' className='bg-slate-200 border border-slate-300 rounded-md text-slate-600 focus:border-blue-500 p-2 m-3'></input>
                            </div>
                        </div>
                        <div className='flex flex-row-reverse'>
                            <div className='flex flex-col justify-center items-center'>
                                <label className='block text-slate-800 p-2.5 pb-1'>Inquiries within last 6 months</label>
                                <input type='text' id='inquiries' placeholder='3' className='bg-slate-200 border border-slate-300 rounded-md text-slate-600 focus:border-blue-500 p-2 m-3'></input>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col justify-center items-center'>
                                <label className='block text-slate-800 p-2.5 pb-1'>Public Records</label>
                                <input type='text' id='pub_rec' placeholder='0' className='bg-slate-200 border border-slate-300 rounded-md text-slate-600 focus:border-blue-500 p-2 m-3'></input>
                            </div>
                        </div>
                    </div>
                    <button className='bg-indigo-500 hover:bg-indigo-600 text-white rounded-md m-4 p-2.5 px-6' onClick={predictionHandler}>
                        Predict
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default App;
