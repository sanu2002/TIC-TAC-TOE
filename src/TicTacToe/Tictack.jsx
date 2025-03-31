import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TicTac.css";
import circle_icon from "../assets/circle.png";
import cross_icon from "../assets/cross.png";
import { ethers } from "ethers";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

// Load private key from environment variable
const privateKey = import.meta.env.VITE_PRIVATE_KEY;

// Ensure private key is available
if (!privateKey) {
    console.error("Private key is missing! Check your .env file.");
}

export const Tictack = () => {
    const [data, setData] = useState(Array(9).fill(""));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState(null);
    const [schemaId, setSchemaId] = useState(null);
    const [attestation, setAttestation] = useState(null);

    // Handle cell click
    const toggle = (num) => {
        if (lock || data[num] !== "") return;

        const newData = [...data];
        newData[num] = count % 2 === 0 ? "x" : "o";
        setData(newData);
        setCount(prev => prev + 1);

        checkWin(newData);
    };

    // Check for a winning combination
    const checkWin = (currentData) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];

        for (let [a, b, c] of winningCombinations) {
            if (currentData[a] && currentData[a] === currentData[b] && currentData[a] === currentData[c]) {
                won(currentData[a]);
                return;
            }
        }

        if (!currentData.includes("") && !lock) {
            draw();
        }
    };

    // Handle game won
    const won = async (winner) => {
        setLock(true);
        setWinner(winner);
        toast.success(`🎉 Player ${winner.toUpperCase()} won the game!`, {
            position: "top-center",
            autoClose: 2000
        });

        try {
            // Initialize Sign Protocol Client
            const client = new SignProtocolClient(SpMode.OnChain, {
                chain: EvmChains.baseSepolia,
                account: privateKeyToAccount(privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`),
                apiKey: "xxx", // Optional for on-chain mode
            });

            // Create schema for the game winner
            const res = await client.createSchema({
                name: "Game Winner",
                description: "Winner of the Tic Tac Toe game",
                properties: [
                    {
                      "name": "winner",
                      "type": "string"
                    },
                    {
                      "name": "txhash",
                      "type": "string"
                    }
                  ]
            });

            if (!res || !res.schemaId || !res.txHash) {
                throw new Error("Schema creation failed. Response:", res);
            }

            console.log("Schema created:", res);
            setSchemaId(res.schemaId);

            // Save schema details to localStorage
            // const transactionData = {
            //     schemaId: res.schemaId,
            //     txHash: res.txHash
            // };
            // localStorage.setItem("transaction", JSON.stringify(transactionData));

            // console.log("Transaction data stored:", transactionData);

            // // Retrieve transaction data from localStorage
            // const storedData = localStorage.getItem("transaction");
            // const parsedData = storedData ? JSON.parse(storedData) : null;
            const winnerValue = String(winner);
            const txhashValue = String(res.txHash);
            // console.log('Creating attestation with values:', {
            //     schemaId: res.schemaId,
            //     data: { winner: winnerValue, txhash: txhashValue }
            // });

            console.log("Available client methods:", Object.keys(client));



            try{
                const attes=await client.createAttestation({
                    schemaId: res.schemaId,
                    data: {
                        winnerValue ,
                        txhashValue
                    },

                    indexingValue:winnerValue.toLowerCase(),
                 
                  
                })
    
                console.log("Attestation created:", attes);
            }

            catch (error) {
                console.error("Error creating schema:", error);
            }
           

            console
            


            

          

           
        } 

        catch (error) {
            console.error("Error creating schema:", error);
            toast.error("Error creating schema: " + error.message, {
                position: "top-center",
                autoClose: 2000
            });
        }

       
    };

    // Handle draw case
    const draw = () => {
        setLock(true);
        toast.info("🤝 It's a draw!", {
            position: "top-center",
            autoClose: 2000
        });
    };

    // Reset game state
    const resetGame = () => {
        setData(Array(9).fill(""));
        setCount(0);
        setLock(false);
        setWinner(null);
    };

    return (
        <div className="Container">
            <h1 className="title">
                Tic Tac Toe Game with <span>$Sign</span>
            </h1>

            <div className="board">
                {[...Array(9)].map((_, index) => (
                    <div className="boxes" key={index} onClick={() => toggle(index)}>
                        {data[index] && <img src={data[index] === "x" ? cross_icon : circle_icon} alt={data[index]} />}
                    </div>
                ))}
            </div>

            {winner ? (
                <div className="result">🎉 Player {winner.toUpperCase()} won the game!</div>
            ) : null}

            <button className="reset" onClick={resetGame}>Reset</button>

            {/* Toast Notification Container */}
            <ToastContainer />
        </div>
    );
};
