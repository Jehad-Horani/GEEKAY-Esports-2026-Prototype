
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Calendar, Filter, Search, ExternalLink } from 'lucide-react';
import ArenaButton from '../../components/ui/ArenaButton';

const AdminSchedule = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [filterGame, setFilterGame] = useState('ALL');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/events', { credentials: 'include' });
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingItem.id ? 'PUT' : 'POST';
    const url = editingItem.id ? `/api/events/${editingItem.id}` : '/api/events';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(editingItem),
    });
    
    setEditingItem(null);
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`/api/events/${id}`, { method: 'DELETE', credentials: 'include' });
    fetchItems();
  };

  const games = ['ALL', 'RL', 'HOK', 'PUBG', 'VALORANT', 'LOL'];
  const filteredItems = filterGame === 'ALL' ? items : items.filter(i => i.game === filterGame);

  if (loading) return <div>Loading schedule...</div>;

  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
        <div>
          <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.6em] font-bold mb-4 block uppercase">OPERATIONAL_CALENDAR</span>
          <h1 className="font-syncopate text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">SCHEDULE</h1>
        </div>
        <ArenaButton onClick={() => setEditingItem({ title: '', game: 'RL', type: 'match', start_date: '', end_date: '', time: '', region: '', status: 'upcoming', link: '', featured: 0, description: '', published: 0 })}>
          <Plus size={18} className="mr-2" /> ADD_EVENT
        </ArenaButton>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative min-w-[250px]">
          <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <select 
            value={filterGame}
            onChange={e => setFilterGame(e.target.value)}
            className="w-full bg-[#081B3A] border border-white/5 py-6 pl-16 pr-6 text-white font-syncopate text-[10px] tracking-widest focus:outline-none focus:border-[#FFC400] appearance-none"
          >
            {games.map(g => <option key={g} value={g}>{g.toUpperCase()}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-[#081B3A] border border-white/5 overflow-hidden">
        <table className="w-full text-left font-syncopate text-[10px] tracking-widest uppercase">
          <thead className="text-slate-500 border-b border-white/5">
            <tr>
              <th className="p-8 font-bold">EVENT</th>
              <th className="p-8 font-bold">DATE</th>
              <th className="p-8 font-bold">STATUS</th>
              <th className="p-8 font-bold text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredItems.map((item) => (
              <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="p-8">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="bg-[#FFC400] text-black px-2 py-0.5 font-syncopate text-[6px] font-black tracking-widest uppercase skew-x-[-10deg]">{item.game}</span>
                    <span className="text-slate-600 font-syncopate text-[6px] font-bold tracking-widest uppercase">{item.type}</span>
                  </div>
                  <p className="font-bold text-white text-sm">{item.title}</p>
                </td>
                <td className="p-8 text-slate-400">
                  {item.start_date} {item.time && `| ${item.time}`}
                </td>
                <td className="p-8">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black ${item.status === 'live' ? 'bg-red-500/10 text-red-500 animate-pulse' : item.status === 'finished' ? 'bg-slate-500/10 text-slate-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-8 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {item.link && <a href={item.link} target="_blank" className="p-3 bg-white/5 text-slate-400 hover:text-[#FFC400] transition-colors"><ExternalLink size={18} /></a>}
                    <button onClick={() => setEditingItem(item)} className="p-3 bg-white/5 text-slate-400 hover:text-blue-500 transition-colors"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-3 bg-white/5 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingItem(null)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#081B3A] border border-white/10 w-full max-w-2xl relative z-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FFC400]" />
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-syncopate text-xl font-black text-white uppercase tracking-tighter">
                {editingItem.id ? 'EDIT_EVENT' : 'ADD_EVENT'}
              </h2>
              <button onClick={() => setEditingItem(null)} className="text-slate-500 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="font-syncopate text-[8px] text-slate-500 font-bold uppercase tracking-widest">Event Title</label>
                <input 
                  type="text" 
                  value={editingItem.title}
                  onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                  className="w-full bg-[#040E1E] border border-slate-800 p-4 text-white font-syncopate text-xs focus:outline-none focus:border-[#FFC400]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-syncopate text-[8px] text-slate-500 font-bold uppercase tracking-widest">Game</label>
                  <select 
                    value={editingItem.game}
                    onChange={e => setEditingItem({...editingItem, game: e.target.value})}
                    className="w-full bg-[#040E1E] border border-slate-800 p-4 text-white font-syncopate text-xs focus:outline-none focus:border-[#FFC400] appearance-none"
                  >
                    {games.filter(g => g !== 'ALL').map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-syncopate text-[8px] text-slate-500 font-bold uppercase tracking-widest">Type</label>
                  <select 
                    value={editingItem.type}
                    onChange={e => setEditingItem({...editingItem, type: e.target.value})}
                    className="w-full bg-[#040E1E] border border-slate-800 p-4 text-white font-syncopate text-xs focus:outline-none focus:border-[#FFC400] appearance-none"
                  >
                    <option value="match">MATCH</option>
                    <option value="tournament">TOURNAMENT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-syncopate text-[8px] text-slate-500 font-bold uppercase tracking-widest">Start Date</label>
                  <input 
                    type="date" 
                    value={editingItem.start_date}
                    onChange={e => setEditingItem({...editingItem, start_date: e.target.value})}
                    className="w-full bg-[#040E1E] border border-slate-800 p-4 text-white font-syncopate text-xs focus:outline-none focus:border-[#FFC400]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-syncopate text-[8px] text-slate-500 font-bold uppercase tracking-widest">Time</label>
                  <input 
                    type="text" 
                    value={editingItem.time}
                    onChange={e => setEditingItem({...editingItem, time: e.target.value})}
                    className="w-full bg-[#040E1E] border border-slate-800 p-4 text-white font-syncopate text-xs focus:outline-none focus:border-[#FFC400]"
                    placeholder="e.g. 18:00 GMT"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-syncopate text-[8px] text-slate-500 font-bold uppercase tracking-widest">Status</label>
                  <select 
                    value={editingItem.status}
                    onChange={e => setEditingItem({...editingItem, status: e.target.value})}
                    className="w-full bg-[#040E1E] border border-slate-800 p-4 text-white font-syncopate text-xs focus:outline-none focus:border-[#FFC400] appearance-none"
                  >
                    <option value="upcoming">UPCOMING</option>
                    <option value="live">LIVE</option>
                    <option value="finished">FINISHED</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-syncopate text-[8px] text-slate-500 font-bold uppercase tracking-widest">External Link</label>
                  <input 
                    type="text" 
                    value={editingItem.link}
                    onChange={e => setEditingItem({...editingItem, link: e.target.value})}
                    className="w-full bg-[#040E1E] border border-slate-800 p-4 text-white font-syncopate text-xs focus:outline-none focus:border-[#FFC400]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={editingItem.published === 1}
                    onChange={e => setEditingItem({...editingItem, published: e.target.checked ? 1 : 0})}
                    className="w-5 h-5 bg-[#040E1E] border-slate-800 rounded-none checked:bg-[#FFC400] transition-colors"
                  />
                  <span className="font-syncopate text-[10px] font-bold text-white uppercase tracking-widest group-hover:text-[#FFC400]">Published</span>
                </label>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-end gap-4">
                <button type="button" onClick={() => setEditingItem(null)} className="px-8 py-4 font-syncopate text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Cancel</button>
                <ArenaButton type="submit">SAVE_EVENT</ArenaButton>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminSchedule;
