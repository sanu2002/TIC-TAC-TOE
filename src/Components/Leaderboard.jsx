import React, { useState, useEffect } from 'react';
import { privateKeyToAccount } from 'viem/accounts';
import { IndexService } from '@ethsign/sp-sdk';
import './Leaderboard.css';

const privateKey = import.meta.env.VITE_PRIVATE_KEY;

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utility: Convert timestamp to "time ago" string
  const getTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - Number(timestamp);

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const attester = privateKeyToAccount(
          privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`
        );

        const indexService = new IndexService('mainnet');

        const result = await indexService.queryAttestationList({
          attester: attester.address,
          page: 1,
          pageSize: 100,
          mode: 'offchain', // Use offchain mode (Arweave)
        });

        console.log('Fetched Attestations:', result);
        setLeaderboard(result.rows);
      } catch (error) {
        console.error('Failed to fetch leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="title">🎮 Off-chain Attestation Leaderboard (Arweave)</h1>

      {loading ? (
        <p>Loading leaderboard data...</p>
      ) : (
        <div className="table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Attestation ID</th>
                <th>Age</th>
                <th>Winner</th>
                <th>Data Location</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((data, index) => {
                let parsedData = {};
                try {
                  parsedData =
                    typeof data.data === 'string'
                      ? JSON.parse(data.data)
                      : data.data;
                } catch (e) {
                  console.error('Error parsing data:', e);
                }

                return (
                  <tr key={index}>
                     {/* https://scan.sign.global/attestation/data.attestationId */}
                    <td className="attester">
                    <a href={`https://scan.sign.global/attestation/${data.attestationId}`} target="_blank" rel="noopener noreferrer">
                          {data.attestationId}
                        </a>
                    
                    
                    
                    </td>
                    <td className="schema-id">{getTimeAgo(data.attestTimestamp)}</td>
                    <td>{parsedData.winner || 'Unknown'}</td>
                    <td>{data?.schema?.dataLocation || 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
