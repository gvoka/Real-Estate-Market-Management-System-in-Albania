import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const [pronat, setPronat] = useState([]);
  const [selectedProna, setSelectedProna] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [perdoruesit, setPerdoruesit] = useState([]);
  const [auditData, setAuditData] = useState([]);

  const [adminStats, setAdminStats] = useState({
    totalPronat: 0,
    totalPerdorues: 0,
    totalTransaksione: 0,
    totalRevenue: 0
  });

  const [formData, setFormData] = useState({
    Emer: '',
    Mbiemer: '',
    Email: '',
    Fjalekalimi: '',
    idRolet: ''
  });

  const [propertyData, setPropertyData] = useState({
    Tipi: '',
    Siperfaqja: '',
    Cmimi: '',
    idZona: ''
  });

  useEffect(() => {
    if (user && (user.idRolet === 2 || user.idRolet === 4)) {
      axios
        .get('http://localhost:5000/pronat')
        .then((response) => setPronat(response.data))
        .catch(() => setMessage('Nuk u moren pronat nga databaza.'));
    }

    if (user && user.idRolet === 1) {
      axios
        .get('http://localhost:5000/admin-stats')
        .then((response) => setAdminStats(response.data))
        .catch(() => setMessage('Nuk u moren statistikat.'));

      axios
        .get('http://localhost:5000/perdoruesit')
        .then((response) => setPerdoruesit(response.data))
        .catch(() => setMessage('Nuk u moren perdoruesit.'));
    }

    if (user && user.idRolet === 3) {
      axios
        .get('http://localhost:5000/audit-data')
        .then((response) => setAuditData(response.data))
        .catch(() => setMessage('Nuk u moren te dhenat e auditimit.'));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePropertyChange = (e) => {
    setPropertyData({
      ...propertyData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    if (
      !formData.Emer ||
      !formData.Mbiemer ||
      !formData.Email ||
      !formData.Fjalekalimi ||
      !formData.idRolet
    ) {
      setMessage('Ploteso te gjitha fushat.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/signup',
        formData
      );

      setUser(response.data.user);
    } catch {
      setMessage('Regjistrimi deshtoi.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.Email || !formData.Fjalekalimi) {
      setMessage('Vendos email dhe fjalekalim.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        {
          Email: formData.Email,
          Fjalekalimi: formData.Fjalekalimi
        }
      );

      setUser(response.data.user);
    } catch {
      setMessage('Email ose fjalekalim i gabuar.');
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    setMessage('');

    if (
      !propertyData.Tipi ||
      !propertyData.Siperfaqja ||
      !propertyData.Cmimi ||
      !propertyData.idZona
    ) {
      setMessage('Ploteso te gjitha fushat e prones.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/shto-prone', propertyData);

      const response = await axios.get('http://localhost:5000/pronat');
      setPronat(response.data);

      setShowAddForm(false);
      setPropertyData({
        Tipi: '',
        Siperfaqja: '',
        Cmimi: '',
        idZona: ''
      });

      setMessage('Prona u shtua me sukses.');
    } catch {
      setMessage('Gabim gjate shtimit te prones.');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/perdoruesit/${id}`);

      setPerdoruesit(
        perdoruesit.filter(
          (perdorues) => perdorues.idPerdoruesit !== id
        )
      );

      setMessage('Perdoruesi u fshi me sukses.');
    } catch {
      setMessage('Gabim gjate fshirjes se perdoruesit.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLogin(true);
    setMessage('');
    setPronat([]);
    setSelectedProna(null);
    setShowAddForm(false);
    setPerdoruesit([]);
    setAuditData([]);

    setFormData({
      Emer: '',
      Mbiemer: '',
      Email: '',
      Fjalekalimi: '',
      idRolet: ''
    });

    setPropertyData({
      Tipi: '',
      Siperfaqja: '',
      Cmimi: '',
      idZona: ''
    });
  };

  if (user && user.idRolet === 1) {
    return (
      <div style={dashboardPage}>
        <nav style={navbarStyle}>
          <h2 style={logoStyle}>RealEstate AL</h2>

          <div style={navLinksStyle}>
            <button style={navBtnStyle}>Home</button>
            <button style={navBtnStyle}>Properties</button>
            <button style={navBtnStyle}>Users</button>
            <button style={navBtnStyle} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        <div style={contentStyle}>
          <h1 style={{ fontSize: '48px' }}>Admin Dashboard</h1>

          <p style={{ color: '#cbd5e1' }}>
            System overview and user management
          </p>

          <div style={statsGridStyle}>
            <div style={statCardStyle}>
              <h2>{adminStats.totalPronat}</h2>
              <p>Total Properties</p>
            </div>

            <div style={statCardStyle}>
              <h2>{adminStats.totalPerdorues}</h2>
              <p>Total Users</p>
            </div>

            <div style={statCardStyle}>
              <h2>{adminStats.totalTransaksione}</h2>
              <p>Transactions</p>
            </div>

            <div style={statCardStyle}>
              <h2>{adminStats.totalRevenue || 0} €</h2>
              <p>Total Revenue</p>
            </div>
          </div>

          {message && <p style={messageStyle}>{message}</p>}

          <div style={detailBoxStyle}>
            <h2>Users Management</h2>

            {perdoruesit.length === 0 ? (
              <p style={{ color: '#94a3b8' }}>
                Nuk ka perdorues per t'u shfaqur.
              </p>
            ) : (
              perdoruesit.map((perdorues) => (
                <div key={perdorues.idPerdoruesit} style={userRowStyle}>
                  <div>
                    <p>
                      <b>
                        {perdorues.Emer} {perdorues.Mbiemer}
                      </b>
                    </p>

                    <p style={{ color: '#cbd5e1' }}>
                      {perdorues.Email}
                    </p>

                    <p style={{ color: '#94a3b8' }}>
                      Roli: {perdorues.EmriRolit}
                    </p>
                  </div>

                  <button
                    style={deleteButtonStyle}
                    onClick={() =>
                      handleDeleteUser(perdorues.idPerdoruesit)
                    }
                  >
                    Delete User
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  if (user && user.idRolet === 2) {
    return (
      <div style={dashboardPage}>
        <nav style={navbarStyle}>
          <h2 style={logoStyle}>RealEstate AL</h2>

          <div style={navLinksStyle}>
            <button style={navBtnStyle}>Home</button>
            <button style={navBtnStyle}>Contact</button>
            <button style={navBtnStyle} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        <div style={contentStyle}>
          <h1 style={{ fontSize: '48px' }}>Agent Dashboard</h1>

          <p style={{ color: '#cbd5e1' }}>
            Manage your properties and add new listings
          </p>

          <div style={statsGridStyle}>
            <div style={statCardStyle}>
              <h2>{pronat.length}</h2>
              <p>Properties Listed</p>
            </div>

            <div style={statCardStyle}>
              <h2>{pronat.length > 0 ? `${pronat[0].Cmimi} €` : '0 €'}</h2>
              <p>Latest Property Price</p>
            </div>

            <div style={statCardStyle}>
              <h2>{pronat.length}</h2>
              <p>Total Records</p>
            </div>
          </div>

          {message && <p style={messageStyle}>{message}</p>}

          <button
            style={{ ...buttonStyle, width: '260px', marginBottom: '30px' }}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            + Add New Property
          </button>

          {showAddForm && (
            <form onSubmit={handleAddProperty} style={detailBoxStyle}>
              <h2>Shto Prone te Re</h2>

              <input
                type="text"
                name="Tipi"
                placeholder="Tipi i prones"
                value={propertyData.Tipi}
                onChange={handlePropertyChange}
                style={searchInputStyle}
              />

              <input
                type="number"
                name="Siperfaqja"
                placeholder="Siperfaqja"
                value={propertyData.Siperfaqja}
                onChange={handlePropertyChange}
                style={searchInputStyle}
              />

              <input
                type="number"
                name="Cmimi"
                placeholder="Cmimi"
                value={propertyData.Cmimi}
                onChange={handlePropertyChange}
                style={searchInputStyle}
              />

              <select
                name="idZona"
                value={propertyData.idZona}
                onChange={handlePropertyChange}
                style={searchInputStyle}
              >
                <option value="">Zgjidh zonen</option>
                <option value="1">Qendra</option>
                <option value="2">Liqeni</option>
                <option value="3">Vasil Shanto</option>
                <option value="4">Blloku</option>
              </select>

              <button type="submit" style={buttonStyle}>
                Save Property
              </button>
            </form>
          )}

          <div style={sectionCardStyle}>
            <h2>Your Properties</h2>

            <div style={propertyGridStyle}>
              {pronat.map((prona) => (
                <div style={propertyCardStyle} key={prona.idPronat}>
                  <div style={propertyImagePlaceholder}>🏠</div>

                  <div style={propertyContentStyle}>
                    <h2>{prona.Tipi}</h2>

                    <p style={{ color: '#94a3b8' }}>
                      {prona.Zona}, {prona.Qyteti}
                    </p>

                    <h2 style={{ color: '#4ade80' }}>
                      {prona.Cmimi} €
                    </h2>

                    <button
                      style={buttonStyle}
                      onClick={() => setSelectedProna(prona)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedProna && (
            <div style={detailBoxStyle}>
              <h2>Detajet e Prones</h2>
              <p><b>Tipi:</b> {selectedProna.Tipi}</p>
              <p><b>Zona:</b> {selectedProna.Zona}</p>
              <p><b>Qyteti:</b> {selectedProna.Qyteti}</p>
              <p><b>Siperfaqja:</b> {selectedProna.Siperfaqja} m²</p>
              <p><b>Cmimi:</b> {selectedProna.Cmimi} €</p>

              <button
                style={buttonStyle}
                onClick={() => setSelectedProna(null)}
              >
                Mbyll
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (user && user.idRolet === 3) {
    return (
      <div style={dashboardPage}>
        <nav style={navbarStyle}>
          <h2 style={logoStyle}>RealEstate AL</h2>

          <div style={navLinksStyle}>
            <button style={navBtnStyle}>Home</button>
            <button style={navBtnStyle}>Reports</button>
            <button style={navBtnStyle} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        <div style={contentStyle}>
          <h1 style={{ fontSize: '48px' }}>Audit Dashboard</h1>

          <p style={{ color: '#cbd5e1' }}>
            Monitor price history and property changes.
          </p>

          <div style={statsGridStyle}>
            <div style={statCardStyle}>
              <h2>{auditData.length}</h2>
              <p>Price History Records</p>
            </div>

            <div style={statCardStyle}>
              <h2>
                {auditData.length > 0
                  ? Math.max(...auditData.map((item) => Number(item.Cmimet)))
                  : 0} €
              </h2>
              <p>Highest Recorded Price</p>
            </div>

            <div style={statCardStyle}>
              <h2>
                {auditData.length > 0
                  ? Math.min(...auditData.map((item) => Number(item.Cmimet)))
                  : 0} €
              </h2>
              <p>Lowest Recorded Price</p>
            </div>
          </div>

          {message && <p style={messageStyle}>{message}</p>}

          <div style={detailBoxStyle}>
            <h2>Historiku i Çmimeve</h2>

            {auditData.length === 0 ? (
              <p style={{ color: '#94a3b8' }}>
                Nuk ka te dhena per auditim.
              </p>
            ) : (
              auditData.map((item) => (
                <div key={item.idHistorikCmimi} style={userRowStyle}>
                  <div>
                    <p><b>{item.Tipi}</b></p>

                    <p style={{ color: '#cbd5e1' }}>
                      Zona: {item.Zona}, {item.Qyteti}
                    </p>

                    <p style={{ color: '#94a3b8' }}>
                      Siperfaqja: {item.Siperfaqja} m²
                    </p>

                    <p style={{ color: '#4ade80' }}>
                      Çmimi: {item.Cmimet} €
                    </p>

                    <p style={{ color: '#94a3b8' }}>
                      Data: {item.Datat}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  if (user && user.idRolet === 4) {
    return (
      <div style={dashboardPage}>
        <nav style={navbarStyle}>
          <h2 style={logoStyle}>RealEstate AL</h2>

          <div style={navLinksStyle}>
            <button style={navBtnStyle}>Home</button>
            <button style={navBtnStyle}>Contact</button>
            <button style={navBtnStyle} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        <div style={contentStyle}>
          <h1 style={{ fontSize: '48px' }}>Properties</h1>

          <p style={{ color: '#cbd5e1' }}>
            Discover your perfect home from our extensive collection
          </p>

          <div style={searchBoxStyle}>
            <input style={searchInputStyle} placeholder="Search properties..." />

            <select style={searchInputStyle}>
              <option>All Zones</option>
              <option>Blloku</option>
              <option>Qendra</option>
              <option>Liqeni</option>
              <option>Vasil Shanto</option>
            </select>

            <select style={searchInputStyle}>
              <option>All Prices</option>
              <option>100k - 300k €</option>
              <option>300k - 700k €</option>
              <option>700k+ €</option>
            </select>

            <select style={searchInputStyle}>
              <option>All Types</option>
              <option>Apartament</option>
              <option>Vile</option>
              <option>Dyqan</option>
            </select>
          </div>

          {message && <p style={messageStyle}>{message}</p>}

          <div style={propertyGridStyle}>
            {pronat.map((prona) => (
              <div style={propertyCardStyle} key={prona.idPronat}>
                <div style={propertyImagePlaceholder}>🏠</div>

                <div style={propertyContentStyle}>
                  <h2>{prona.Tipi}</h2>

                  <p style={{ color: '#94a3b8' }}>
                    {prona.Zona}, {prona.Qyteti}
                  </p>

                  <h2 style={{ color: '#4ade80' }}>
                    {prona.Cmimi} €
                  </h2>

                  <button
                    style={buttonStyle}
                    onClick={() => setSelectedProna(prona)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedProna && (
            <div style={detailBoxStyle}>
              <h2>Detajet e Prones</h2>
              <p><b>Tipi:</b> {selectedProna.Tipi}</p>
              <p><b>Zona:</b> {selectedProna.Zona}</p>
              <p><b>Qyteti:</b> {selectedProna.Qyteti}</p>
              <p><b>Siperfaqja:</b> {selectedProna.Siperfaqja} m²</p>
              <p><b>Cmimi:</b> {selectedProna.Cmimi} €</p>

              <button
                style={buttonStyle}
                onClick={() => setSelectedProna(null)}
              >
                Mbyll
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={avatarStyle}>👤</div>

        <h1 style={titleStyle}>
          {isLogin ? 'Login' : 'Signup'}
        </h1>

        {message && <p style={messageStyle}>{message}</p>}

        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="Emer"
                placeholder="Emer"
                value={formData.Emer}
                onChange={handleChange}
                style={inputStyle}
              />

              <input
                type="text"
                name="Mbiemer"
                placeholder="Mbiemer"
                value={formData.Mbiemer}
                onChange={handleChange}
                style={inputStyle}
              />

              <select
                name="idRolet"
                value={formData.idRolet}
                onChange={handleChange}
                style={{ ...inputStyle, backgroundColor: '#2b5876' }}
              >
                <option value="">Zgjidh rolin</option>
                <option value="4">Qytetar</option>
                <option value="2">Agjent</option>
                <option value="3">Auditues</option>
              </select>
            </>
          )}

          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="Fjalekalimi"
            placeholder="Fjalekalimi"
            value={formData.Fjalekalimi}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>

        <p style={switchTextStyle}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}
            style={linkStyle}
          >
            {isLogin ? ' Sign up' : ' Log in'}
          </span>
        </p>
      </div>
    </div>
  );
}

const pageStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #07111f, #102a43, #12343b)',
  overflow: 'hidden',
  fontFamily: 'Arial'
};

const cardStyle = {
  width: '360px',
  padding: '35px',
  borderRadius: '20px',
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 0 30px rgba(0,0,0,0.3)',
  textAlign: 'center',
  color: 'white'
};

const avatarStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  margin: '0 auto 20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg,#8e2de2,#4facfe,#00f2fe)',
  fontSize: '35px'
};

const titleStyle = {
  marginBottom: '25px'
};

const inputStyle = {
  width: '100%',
  padding: '13px',
  marginBottom: '15px',
  borderRadius: '10px',
  border: 'none',
  outline: 'none',
  background: 'rgba(255,255,255,0.12)',
  color: 'white',
  boxSizing: 'border-box'
};

const buttonStyle = {
  width: '100%',
  padding: '13px',
  border: 'none',
  borderRadius: '10px',
  background: 'linear-gradient(to right,#c471ed,#12c2e9)',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '10px'
};

const switchTextStyle = {
  marginTop: '20px',
  color: '#d6d6d6'
};

const linkStyle = {
  color: '#12c2e9',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const messageStyle = {
  color: '#ff8080',
  marginBottom: '15px'
};

const dashboardPage = {
  minHeight: '100vh',
  background: 'linear-gradient(to right, #020617, #081028)',
  color: 'white',
  fontFamily: 'Arial'
};

const navbarStyle = {
  height: '80px',
  background: '#1e293b',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 50px'
};

const logoStyle = {
  color: '#60a5fa',
  fontSize: '35px'
};

const navLinksStyle = {
  display: 'flex',
  gap: '25px'
};

const navBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#e2e8f0',
  fontSize: '18px',
  cursor: 'pointer'
};

const contentStyle = {
  padding: '45px'
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '25px',
  margin: '35px 0'
};

const statCardStyle = {
  background: '#1e293b',
  padding: '25px',
  borderRadius: '12px'
};

const searchBoxStyle = {
  background: '#1e293b',
  padding: '30px',
  borderRadius: '15px',
  marginTop: '30px',
  marginBottom: '40px'
};

const searchInputStyle = {
  width: '100%',
  padding: '18px',
  marginBottom: '15px',
  borderRadius: '10px',
  border: '1px solid #475569',
  background: '#374151',
  color: 'white',
  fontSize: '16px',
  boxSizing: 'border-box'
};

const sectionCardStyle = {
  background: '#1e293b',
  padding: '30px',
  borderRadius: '15px',
  marginTop: '20px'
};

const propertyGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '35px'
};

const propertyCardStyle = {
  background: '#1e293b',
  borderRadius: '15px',
  overflow: 'hidden'
};

const propertyImagePlaceholder = {
  height: '180px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '60px',
  background: 'linear-gradient(135deg, #0f4c75, #3282b8)'
};

const propertyContentStyle = {
  padding: '25px'
};

const detailBoxStyle = {
  marginTop: '40px',
  background: '#1e293b',
  padding: '30px',
  borderRadius: '15px',
  color: 'white'
};

const userRowStyle = {
  background: '#374151',
  padding: '18px',
  borderRadius: '12px',
  marginBottom: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const deleteButtonStyle = {
  padding: '10px 14px',
  border: 'none',
  borderRadius: '8px',
  background: '#ef4444',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default App;