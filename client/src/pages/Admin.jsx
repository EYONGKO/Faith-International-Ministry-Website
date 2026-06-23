import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getSermons, createSermon, updateSermon, deleteSermon,
  getEvents, createEvent, updateEvent, deleteEvent,
  getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
  getTeam, createTeamMember, updateTeamMember, deleteTeamMember,
  getContacts, markContactRead,
  getPrayerRequests, markPrayerRead, deletePrayerRequest,
} from '../api';

const TABS = [
  { id: 'sermons', label: '🎙️ Sermons' },
  { id: 'events', label: '📅 Events' },
  { id: 'announcements', label: '📢 Announcements' },
  { id: 'team', label: '👥 Team' },
  { id: 'messages', label: '✉️ Messages' },
  { id: 'prayer', label: '🙏 Prayer Requests' },
];

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function toInputDate(d) {
  if (!d) return '';
  return new Date(d).toISOString().split('T')[0];
}

// ─── Sermons Section ──────────────────────────────────────────────────────────
function SermonsAdmin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', speaker: '', date: '', description: '', videoUrl: '', thumbnail: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await getSermons();
    setItems(data);
  }

  function startCreate() {
    setEditing('new');
    setForm({ title: '', speaker: '', date: '', description: '', videoUrl: '', thumbnail: '' });
    setMsg('');
  }

  function startEdit(item) {
    setEditing(item._id);
    setForm({ ...item, date: toInputDate(item.date) });
    setMsg('');
  }

  function cancel() { setEditing(null); setMsg(''); }

  async function save(e) {
    e.preventDefault();
    try {
      if (editing === 'new') await createSermon(form);
      else await updateSermon(editing, form);
      setMsg('Saved successfully.');
      setEditing(null);
      load();
    } catch { setMsg('Error saving.'); }
  }

  async function remove(id) {
    if (!window.confirm('Delete this sermon?')) return;
    await deleteSermon(id);
    load();
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Sermons</h2>
        <button className="btn btn-primary" onClick={startCreate}>+ Add Sermon</button>
      </div>

      {editing && (
        <form className="admin-form" onSubmit={save}>
          <h3>{editing === 'new' ? 'New Sermon' : 'Edit Sermon'}</h3>
          <div className="admin-form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Speaker *</label>
              <input value={form.speaker} onChange={e => setForm({ ...form, speaker: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Video URL</label>
              <input value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtube.com/..." />
            </div>
            <div className="form-group full-width">
              <label>Thumbnail URL</label>
              <input value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} placeholder="https://..." />
            </div>
            <div className="form-group full-width">
              <label>Description *</label>
              <textarea rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            </div>
          </div>
          {msg && <p className={msg.includes('Error') ? 'error' : 'success'}>{msg}</p>}
          <div className="admin-form-actions">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-outline" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {items.map(item => (
          <div key={item._id} className="admin-list-item">
            {item.thumbnail && <img src={item.thumbnail} alt="" className="admin-thumbnail" />}
            <div className="admin-item-info">
              <strong>{item.title}</strong>
              <span>{item.speaker} · {formatDate(item.date)}</span>
            </div>
            <div className="admin-item-actions">
              <button className="btn-icon" onClick={() => startEdit(item)}>✏️</button>
              <button className="btn-icon btn-icon-danger" onClick={() => remove(item._id)}>🗑️</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="admin-empty">No sermons yet. Add your first sermon above.</p>}
      </div>
    </div>
  );
}

// ─── Events Section ───────────────────────────────────────────────────────────
function EventsAdmin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', date: '', time: '', location: '', description: '', image: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await getEvents();
    setItems(data);
  }

  function startCreate() {
    setEditing('new');
    setForm({ title: '', date: '', time: '', location: '', description: '', image: '' });
    setMsg('');
  }

  function startEdit(item) {
    setEditing(item._id);
    setForm({ ...item, date: toInputDate(item.date) });
    setMsg('');
  }

  function cancel() { setEditing(null); setMsg(''); }

  async function save(e) {
    e.preventDefault();
    try {
      if (editing === 'new') await createEvent(form);
      else await updateEvent(editing, form);
      setMsg('Saved successfully.');
      setEditing(null);
      load();
    } catch { setMsg('Error saving.'); }
  }

  async function remove(id) {
    if (!window.confirm('Delete this event?')) return;
    await deleteEvent(id);
    load();
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Events</h2>
        <button className="btn btn-primary" onClick={startCreate}>+ Add Event</button>
      </div>

      {editing && (
        <form className="admin-form" onSubmit={save}>
          <h3>{editing === 'new' ? 'New Event' : 'Edit Event'}</h3>
          <div className="admin-form-grid">
            <div className="form-group full-width">
              <label>Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Time *</label>
              <input value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} placeholder="9:00 AM" required />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
            </div>
            <div className="form-group full-width">
              <label>Description *</label>
              <textarea rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            </div>
          </div>
          {msg && <p className={msg.includes('Error') ? 'error' : 'success'}>{msg}</p>}
          <div className="admin-form-actions">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-outline" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {items.map(item => (
          <div key={item._id} className="admin-list-item">
            <div className="admin-item-info">
              <strong>{item.title}</strong>
              <span>📅 {formatDate(item.date)} · ⏰ {item.time} · 📍 {item.location}</span>
            </div>
            <div className="admin-item-actions">
              <button className="btn-icon" onClick={() => startEdit(item)}>✏️</button>
              <button className="btn-icon btn-icon-danger" onClick={() => remove(item._id)}>🗑️</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="admin-empty">No events yet. Add your first event above.</p>}
      </div>
    </div>
  );
}

// ─── Announcements Section ────────────────────────────────────────────────────
function AnnouncementsAdmin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', isActive: true });
  const [msg, setMsg] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await getAllAnnouncements();
    setItems(data);
  }

  function startCreate() {
    setEditing('new');
    setForm({ title: '', content: '', isActive: true });
    setMsg('');
  }

  function startEdit(item) {
    setEditing(item._id);
    setForm({ title: item.title, content: item.content, isActive: item.isActive });
    setMsg('');
  }

  function cancel() { setEditing(null); setMsg(''); }

  async function save(e) {
    e.preventDefault();
    try {
      if (editing === 'new') await createAnnouncement(form);
      else await updateAnnouncement(editing, form);
      setMsg('Saved.');
      setEditing(null);
      load();
    } catch { setMsg('Error saving.'); }
  }

  async function remove(id) {
    if (!window.confirm('Delete this announcement?')) return;
    await deleteAnnouncement(id);
    load();
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Announcements</h2>
        <button className="btn btn-primary" onClick={startCreate}>+ Add Announcement</button>
      </div>

      {editing && (
        <form className="admin-form" onSubmit={save}>
          <h3>{editing === 'new' ? 'New Announcement' : 'Edit Announcement'}</h3>
          <div className="admin-form-grid">
            <div className="form-group full-width">
              <label>Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="form-group full-width">
              <label>Content *</label>
              <textarea rows="4" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                <span>Active (visible on site)</span>
              </label>
            </div>
          </div>
          {msg && <p className={msg.includes('Error') ? 'error' : 'success'}>{msg}</p>}
          <div className="admin-form-actions">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-outline" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {items.map(item => (
          <div key={item._id} className="admin-list-item">
            <div className="admin-item-info">
              <strong>{item.title}</strong>
              <span className={`badge ${item.isActive ? 'badge-active' : 'badge-inactive'}`}>
                {item.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="admin-item-actions">
              <button className="btn-icon" onClick={() => startEdit(item)}>✏️</button>
              <button className="btn-icon btn-icon-danger" onClick={() => remove(item._id)}>🗑️</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="admin-empty">No announcements yet.</p>}
      </div>
    </div>
  );
}

// ─── Team Section ─────────────────────────────────────────────────────────────
function TeamAdmin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', bio: '', photo: '', order: 0 });
  const [msg, setMsg] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await getTeam();
    setItems(data);
  }

  function startCreate() {
    setEditing('new');
    setForm({ name: '', role: '', bio: '', photo: '', order: items.length + 1 });
    setMsg('');
  }

  function startEdit(item) {
    setEditing(item._id);
    setForm({ name: item.name, role: item.role, bio: item.bio, photo: item.photo || '', order: item.order || 0 });
    setMsg('');
  }

  function cancel() { setEditing(null); setMsg(''); }

  async function save(e) {
    e.preventDefault();
    try {
      if (editing === 'new') await createTeamMember(form);
      else await updateTeamMember(editing, form);
      setMsg('Saved.');
      setEditing(null);
      load();
    } catch { setMsg('Error saving.'); }
  }

  async function remove(id) {
    if (!window.confirm('Delete this team member?')) return;
    await deleteTeamMember(id);
    load();
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Leadership Team</h2>
        <button className="btn btn-primary" onClick={startCreate}>+ Add Member</button>
      </div>

      {editing && (
        <form className="admin-form" onSubmit={save}>
          <h3>{editing === 'new' ? 'New Team Member' : 'Edit Team Member'}</h3>
          <div className="admin-form-grid">
            <div className="form-group">
              <label>Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Role *</label>
              <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Senior Pastor" required />
            </div>
            <div className="form-group">
              <label>Photo URL</label>
              <input value={form.photo} onChange={e => setForm({ ...form, photo: e.target.value })} placeholder="https://..." />
            </div>
            <div className="form-group">
              <label>Display Order</label>
              <input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} min="0" />
            </div>
            <div className="form-group full-width">
              <label>Bio *</label>
              <textarea rows="3" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} required />
            </div>
          </div>
          {msg && <p className={msg.includes('Error') ? 'error' : 'success'}>{msg}</p>}
          <div className="admin-form-actions">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-outline" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {items.map(item => (
          <div key={item._id} className="admin-list-item">
            {item.photo && <img src={item.photo} alt="" className="admin-avatar" />}
            <div className="admin-item-info">
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </div>
            <div className="admin-item-actions">
              <button className="btn-icon" onClick={() => startEdit(item)}>✏️</button>
              <button className="btn-icon btn-icon-danger" onClick={() => remove(item._id)}>🗑️</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="admin-empty">No team members yet.</p>}
      </div>
    </div>
  );
}

// ─── Messages Section ─────────────────────────────────────────────────────────
function MessagesAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await getContacts();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function markRead(id) {
    await markContactRead(id);
    setItems(items.map(i => i._id === id ? { ...i, read: true } : i));
  }

  const unread = items.filter(i => !i.read).length;

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Contact Messages {unread > 0 && <span className="unread-badge">{unread} new</span>}</h2>
      </div>
      {loading ? <p className="loading">Loading...</p> : (
        <div className="admin-messages">
          {items.map(item => (
            <div key={item._id} className={`admin-message ${item.read ? '' : 'unread'}`}>
              <div className="message-header">
                <div>
                  <strong>{item.name}</strong>
                  <a href={`mailto:${item.email}`} className="message-email">{item.email}</a>
                </div>
                <div className="message-meta">
                  <span>{formatDate(item.createdAt)}</span>
                  {!item.read && (
                    <button className="btn btn-outline btn-sm" onClick={() => markRead(item._id)}>
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
              <p className="message-body">{item.message}</p>
            </div>
          ))}
          {items.length === 0 && <p className="admin-empty">No contact messages yet.</p>}
        </div>
      )}
    </div>
  );
}

// ─── Prayer Requests Section ──────────────────────────────────────────────────
function PrayerAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await getPrayerRequests();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function markRead(id) {
    await markPrayerRead(id);
    setItems(items.map(i => i._id === id ? { ...i, isRead: true } : i));
  }

  async function remove(id) {
    if (!window.confirm('Delete this prayer request?')) return;
    await deletePrayerRequest(id);
    setItems(items.filter(i => i._id !== id));
  }

  const unread = items.filter(i => !i.isRead).length;

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Prayer Requests {unread > 0 && <span className="unread-badge">{unread} new</span>}</h2>
      </div>
      {loading ? <p className="loading">Loading...</p> : (
        <div className="admin-messages">
          {items.map(item => (
            <div key={item._id} className={`admin-message ${item.isRead ? '' : 'unread'}`}>
              <div className="message-header">
                <div>
                  <strong>{item.isAnonymous ? '🔒 Anonymous' : item.name}</strong>
                  {!item.isAnonymous && item.email && (
                    <a href={`mailto:${item.email}`} className="message-email">{item.email}</a>
                  )}
                </div>
                <div className="message-meta">
                  <span>{formatDate(item.createdAt)}</span>
                  <div className="message-actions">
                    {!item.isRead && (
                      <button className="btn btn-outline btn-sm" onClick={() => markRead(item._id)}>
                        Mark Prayed
                      </button>
                    )}
                    <button className="btn-icon btn-icon-danger" onClick={() => remove(item._id)}>🗑️</button>
                  </div>
                </div>
              </div>
              <p className="message-body">{item.request}</p>
            </div>
          ))}
          {items.length === 0 && <p className="admin-empty">No prayer requests yet.</p>}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function Admin() {
  const [activeTab, setActiveTab] = useState('sermons');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  function logout() {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>✝</span>
          <span>Admin Panel</span>
        </div>
        <nav className="admin-nav">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" className="admin-nav-item">🌐 View Site</a>
          <button className="admin-nav-item admin-logout" onClick={logout}>🚪 Logout</button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <h1>
            {TABS.find(t => t.id === activeTab)?.label}
          </h1>
          <span className="admin-topbar-note">Faith International Ministry · Admin</span>
        </div>

        <div className="admin-content">
          {activeTab === 'sermons' && <SermonsAdmin />}
          {activeTab === 'events' && <EventsAdmin />}
          {activeTab === 'announcements' && <AnnouncementsAdmin />}
          {activeTab === 'team' && <TeamAdmin />}
          {activeTab === 'messages' && <MessagesAdmin />}
          {activeTab === 'prayer' && <PrayerAdmin />}
        </div>
      </main>
    </div>
  );
}
