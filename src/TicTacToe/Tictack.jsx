    import React, { useEffect, useState,createContext } from "react";
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import "./TicTac.css";
    import circle_icon from "../assets/circle.png";
    import cross_icon from "../assets/cross.png";
    import { SignProtocolClient, SpMode, EvmChains, OffChainSignType,IndexService  } from "@ethsign/sp-sdk";
    import { privateKeyToAccount } from "viem/accounts";
    import { useSelector, useDispatch } from 'react-redux';

    import { setschemId,setattestation } from "../features/Slicedata";

    import { useNavigate } from "react-router";


    // Load private key from environment variable
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;

    // Ensure private key is available
    if (!privateKey) {
        console.error("Private key is missing! Check your .env file.");
    }


    const SignContext = createContext();


    export const Tictack = () => {

        
        const [data, setData] = useState(Array(9).fill(""));
        const [count, setCount] = useState(0);
        const [lock, setLock] = useState(false);

        const [localSchemaId, setLocalSchemaId] = useState("");
        const [localAttestationId, setLocalAttestationId] = useState("");
        const [winner, setwinner] = useState("");


        const dispatch = useDispatch();
          const navigate = useNavigate();



          
            
        
          
      
        
    



        ///////////////////////////////////////////////////
           //useselector only for accessing value from store 

        /////////////////////////////////////////////////////
   

        // const schemaId = useSelector((state) => state.winner.schemaId);
        // const attesstaion = useSelector((state) => state.winner.attestation);
        // const winner = useSelector((state) => state.winner.winner);

        
        ///////////////////////////////////////////////////
           //update the state of the store 

        /////////////////////////////////////////////////////







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
            // dispatch(setwinner(winner));
            toast.success(`🎉 Player ${winner.toUpperCase()} won the game!`, {
                position: "top-center",
                autoClose: 2000
            });

            try {
                // Initialize Sign Protocol Client
                const client = new SignProtocolClient(SpMode.OffChain, {
                    signType:OffChainSignType.EvmEip712,
                    account: privateKeyToAccount(privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`),
                    apiKey: import.meta.env.VITE_SIGN_DEVELOPER_KEY, // Optional for on-chain mode
                });
                console.log(import.meta.env.VITE_SIGN_DEVELOPER_KEY,'successfully fertched ket ')
                console.log(privateKeyToAccount(privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`),'successfully fertched ket ')

                // setclient(client);
                console.log(typeof client,"type of client ")


                
                // Create schema for the game winner
                const res = await client.createSchema({
                        name: "Game Winner",
                        description: "Winner of the Tic Tac Toe game",
                        data: [
                            {
                            name: "winner",
                            type: "string",
                            },
                            {
                            name: "txhash",
                            type: "string",
                            },
                        ],
                });

                // if (!res || !res.schemaId || !res.txHash) {
                //     throw new Error(`Schema creation failed. Response: ${JSON.stringify(res)}`);
                // }

                setLocalSchemaId(res.schemaId);
                console.log(res)


              

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

                // console.log("Available client methods:", Object.keys(client));



                try{
                    const attes = await client.createAttestation({
                        schemaId: res.schemaId,
                        data: {
                        winner: winnerValue,
                        txhash: txhashValue,
                        },
            
                        indexingValue: winnerValue.toLowerCase(),
                    });
                    
                    ;

                    





        
                    console.log("Attestation created:", attes);
                }

                catch (error) {
                    console.error("Error creating schema:", error);
                }
            

    

            
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
                    <div className="result">🎉 Player  won the game!</div>
                ) : null}

                <button className="reset" onClick={resetGame}>Reset</button>

                {/* Toast Notification Container */}
                <ToastContainer />
            </div>



        );
    };



    