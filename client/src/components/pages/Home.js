import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import axios from 'axios';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [creating, setCreating] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const { user, logout } = useAuthStore();
  const { 
    rooms, 
    setRooms, 
    addRoom, 
    removeRoom,
    hasMoreRooms, 
    setHasMoreRooms, 
    nextCursor, 
    setNextCursor 
  } = useChatStore();
  
  const navigate = useNavigate();
  const observerRef = useRef();

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async (cursor = null) => {
    try {
      const response = await axios.get(`/api/rooms?cursor=${cursor || ''}`, {
        withCredentials: true
      });
      
      const { rooms: newRooms, nextCursor: newCursor, hasMore } = response.data;
      
      if (cursor) {
        setRooms([...rooms, ...newRooms]);
      } else {
        setRooms(newRooms);
      }
      
      setNextCursor(newCursor);
      setHasMoreRooms(hasMore);
    } catch (error) {
      console.error('Error loading rooms:', error);
    }
  };

  const loadMoreRooms = () => {
    if (loadingMore || !hasMoreRooms || !nextCursor) return;
    
    setLoadingMore(true);
    loadRooms(nextCursor).finally(() => setLoadingMore(false));
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    
    setCreating(true);
    try {
      const response = await axios.post('/api/rooms', 
        { name: roomName.trim() },
        { withCredentials: true }
      );
      
      addRoom(response.data);
      setRoomName('');
      navigate(`/room/${response.data._id}`);
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Error creating room');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    
    try {
      await axios.delete(`/api/rooms/${roomId}`, { withCredentials: true });
      removeRoom(roomId);
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Error deleting room');
    }
  };

  const handleLeaveRoom = async (roomId) => {
    try {
      await axios.post(`/api/rooms/${roomId}/leave`, {}, { withCredentials: true });
      removeRoom(roomId);
    } catch (error) {
      console.error('Error leaving room:', error);
      alert('Error leaving room');
    }
  };

  const lastRoomElementRef = (node) => {
    if (loadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreRooms) {
        loadMoreRooms();
      }
    });
    
    if (node) observerRef.current.observe(node);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="container">
          <div className="header-content">
            <h1>Chat Rooms</h1>
            <div className="user-actions">
              <span>Welcome, {user?.username}</span>
              <Link to="/settings" className="btn btn-secondary">Settings</Link>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="home-content">
          <form onSubmit={handleCreateRoom} className="create-room-form card">
            <h3>Create New Room</h3>
            <div className="form-group">
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="form-input"
                placeholder="Enter room name"
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={creating || !roomName.trim()}
            >
              {creating ? 'Creating...' : 'Create Room'}
            </button>
          </form>

          <div className="rooms-section">
            <h3>Available Rooms</h3>
            <div className="rooms-grid">
              {rooms.map((room, index) => (
                <div 
                  key={room._id} 
                  className="room-card card"
                  ref={index === rooms.length - 1 ? lastRoomElementRef : null}
                >
                  <div className="room-header">
                    <h4>{room.name}</h4>
                    <div className="room-actions">
                      <Link 
                        to={`/room/${room._id}`} 
                        className="btn btn-primary"
                      >
                        Join
                      </Link>
                      
                      {room.createdBy._id === user?.id ? (
                        <button 
                          onClick={() => handleDeleteRoom(room._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleLeaveRoom(room._id)}
                          className="btn btn-secondary"
                        >
                          Leave
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="room-info">
                    <p>Created by: {room.createdBy.username}</p>
                    <p>Members: {room.members.length}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {loadingMore && <div className="loading">Loading more rooms...</div>}
            {!hasMoreRooms && rooms.length > 0 && (
              <div className="no-more">No more rooms to load</div>
            )}
            {rooms.length === 0 && !loadingMore && (
              <div className="no-rooms">
                <p>No rooms available. Create the first one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
