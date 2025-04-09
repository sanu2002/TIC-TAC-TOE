import React from 'react'
import { useSelector } from 'react-redux';



import './Leaderboard.css'

export const Leaderboard = () => {

          const schemaId = useSelector((state) => state.winner.schemaId);
          const attesstaion = useSelector((state) => state.winner.attestation);
          const winner = useSelector((state) => state.winner.winner);

          console.log(schemaId)
          console.log(attesstaion)
          console.log(winner)
  



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
