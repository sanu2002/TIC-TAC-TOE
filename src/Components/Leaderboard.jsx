import React from 'react'
import { useSelector } from 'react-redux';


import './Leaderboard.css'

export const Leaderboard = () => {
  const client = useSelector((state) => state.winner.client);
  const schemaId = useSelector((state) => state.winner.schemaId);
  const attestation = useSelector((state) => state.winner.attestation);
  const winner = useSelector((state) => state.winner.winner);
  console.log(schemaId)
  console.log("Here is the leaderbard data ",client,schemaId,attestation,winner, )




  return (
    <div className='leaderboard'>
        <h1>Attestation </h1>
        <hr></hr>

        <div className='row'>

        
             <div className="leaderboard-header">
              <span>Attestation ID{schemaId}</span>
              <span>Age</span>
              <span>Recipient(s)</span>
               <span>Games Played</span>
             </div>



        </div>

        


    </div>
  )
}
