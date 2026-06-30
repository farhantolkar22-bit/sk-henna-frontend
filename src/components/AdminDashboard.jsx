import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ShoppingBag, DollarSign, Package, Check, X, Search, RefreshCw, LogOut, ChevronRight, Lock } from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Save auth token in sessionStorage if already logged in
  useEffect(() => {
    const savedToken = sessionStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchData(savedToken);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setToken('');
    setIsAuthenticated(false);
    setBookings([]);
    setOrders([]);
    setStats(null);
    navigate('/admin-login');
  };

  const fetchData = async (authToken = token) => {
    if (!authToken) return;
    setLoading(true);
    try {
      const headers = { 'Authorization': `Bearer ${authToken}` };
      
      const [bookingsRes, ordersRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/bookings', { headers }),
        fetch('http://localhost:5000/api/admin/orders', { headers }),
        fetch('http://localhost:5000/api/admin/stats', { headers })
      ]);

      if (bookingsRes.status === 401 || bookingsRes.status === 403) {
        handleLogout();
        return;
      }

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      } else {
        setBookings([]);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } else {
        setOrders([]);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      } else {
        setStats(null);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const filteredBookings = Array.isArray(bookings) ? bookings.filter(b => 
    b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.phone.includes(searchQuery)
  ) : [];

  const filteredOrders = Array.isArray(orders) ? orders.filter(o => 
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.phone.includes(searchQuery)
  ) : [];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 font-semibold text-sm">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 text-left">
      {/* Header bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold font-serif text-slate-900">SK_Henna Admin</h2>
            <span className="bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Control Panel
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => fetchData()}
              disabled={loading}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              title="Refresh data"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="text-xs font-semibold text-slate-500 hover:text-pink-600 transition-colors"
            >
              View Site
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors flex items-center space-x-1 text-xs font-bold"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Stats Metrics Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Revenue card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Sales</span>
                <span className="text-2xl font-black text-slate-900">₹{stats.totals.sales}/-</span>
              </div>
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
                <DollarSign size={24} />
              </div>
            </div>

            {/* Total bookings card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Bookings</span>
                <span className="text-2xl font-black text-slate-900">{stats.totals.bookingsCount}</span>
                <span className="text-[10px] text-amber-600 font-semibold block">{stats.totals.pendingBookings} pending approval</span>
              </div>
              <div className="bg-pink-50 text-pink-600 p-3 rounded-xl">
                <Calendar size={24} />
              </div>
            </div>

            {/* Total orders card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Bulk Orders</span>
                <span className="text-2xl font-black text-slate-900">{stats.totals.ordersCount}</span>
                <span className="text-[10px] text-amber-600 font-semibold block">{stats.totals.pendingOrders} pending shipment</span>
              </div>
              <div className="bg-amber-50 text-amber-600 p-3 rounded-xl">
                <ShoppingBag size={24} />
              </div>
            </div>

            {/* Cones sold card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Cones Sold</span>
                <span className="text-2xl font-black text-slate-900">
                  {stats.conesSold.nailCones + stats.conesSold.normalCones + stats.conesSold.bridalCones}
                </span>
                <span className="text-[9px] text-slate-400 font-semibold block">
                  Nail: {stats.conesSold.nailCones} | Normal: {stats.conesSold.normalCones} | Bridal: {stats.conesSold.bridalCones}
                </span>
              </div>
              <div className="bg-violet-50 text-violet-600 p-3 rounded-xl">
                <Package size={24} />
              </div>
            </div>

          </div>
        )}

        {/* Tab Controls & Search */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            
            {/* Tabs */}
            <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-xl w-full sm:w-auto">
              <button
                onClick={() => { setActiveTab('bookings'); setSearchQuery(''); }}
                className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                  activeTab === 'bookings' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => { setActiveTab('orders'); setSearchQuery(''); }}
                className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                  activeTab === 'orders' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Cones Orders
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search by name or phone...`}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-500 text-sm font-medium"
              />
            </div>

          </div>

          {/* Table content list */}
          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            {activeTab === 'bookings' ? (
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Schedule</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Venue</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 text-slate-700 text-sm">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-slate-400 font-medium">No bookings found.</td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id}>
                        <td className="px-6 py-4 font-bold text-slate-400">#{b.id}</td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{b.clientName}</div>
                          <a href={`https://wa.me/${b.phone}`} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 font-semibold hover:underline">
                            {b.phone}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800">{b.date}</div>
                          <div className="text-xs text-slate-400">{b.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs"><span className="font-bold">Occasion:</span> {b.occasion}</div>
                          <div className="text-xs mt-0.5"><span className="font-bold">Area:</span> {b.handDetails}</div>
                          {b.notes && <div className="text-xs mt-1 text-slate-400 italic">"{b.notes}"</div>}
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate" title={b.address}>
                          {b.address}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={b.status}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                              b.status === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                              b.status === 'confirmed' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                              b.status === 'completed' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                              'bg-rose-50 border-rose-200 text-rose-700'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Cones Summary</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 text-slate-700 text-sm">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-slate-400 font-medium">No orders found.</td>
                    </tr>
                  ) : (
                    filteredOrders.map((o) => (
                      <tr key={o.id}>
                        <td className="px-6 py-4 font-bold text-slate-400">#{o.id}</td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{o.customerName}</div>
                          <a href={`https://wa.me/${o.phone}`} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 font-semibold hover:underline">
                            {o.phone}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {o.nailConesQty > 0 && (
                              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                                Nail: {o.nailConesQty}
                              </span>
                            )}
                            {o.normalConesQty > 0 && (
                              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                                Normal: {o.normalConesQty}
                              </span>
                            )}
                            {o.bridalConesQty > 0 && (
                              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                                Bridal: {o.bridalConesQty}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-pink-600">₹{o.totalPrice}/-</td>
                        <td className="px-6 py-4 max-w-xs truncate" title={o.address}>
                          {o.address}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                              o.status === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                              o.status === 'shipped' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                              o.status === 'completed' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                              'bg-rose-50 border-rose-200 text-rose-700'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
