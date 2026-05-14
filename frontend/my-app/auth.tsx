import { useState } from 'react';
import { useEffect } from 'react';

export function Auth({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isSignUp ? '/auth/signup' : '/auth/login';
    
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      onLogin(data.token);
    } else {
      alert(data.error || "Authentication failed");
    }
  };
  Leaderboard() 
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>{isSignUp ? 'Create Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
      </button>
    </div>
    
  );
  
}


const Leaderboard = () => {

  interface Puzzle {
    id: string;
    username: string;
    total_score: number;
  }


  const [users, setUsers] = useState<Puzzle[]>([]); 

  users.map(u => console.log(u.id));

  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchUsers = async () => {
      
        const response = await fetch('http://localhost:3000/api/leaderboard');
        const data = await response.json();
        setUsers(data); 
      } 

    fetchUsers();
  }, []); 

  if (loading) return <div>Loading leaderboard..</div>;


  return (
    <div style={{ padding: '20px' }}>
      <h2>Leaderboard</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table  cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>

              <th>Name</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
 
                    


