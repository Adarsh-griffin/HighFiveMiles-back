import React, { useState } from 'react';
import { FaRunning, FaHome, FaSignOutAlt, FaMapMarkerAlt, FaMedal, 
         FaChartLine, FaCalendarAlt, FaChartPie, FaRoute, 
         FaFlagCheckered, FaTrophy, FaFire, FaMountain, 
         FaTree, FaRoad, FaTachometerAlt, FaStar, FaHeart, FaCrown,
         FaComment, FaThumbsUp, FaTrash, FaPlus, FaEllipsisH } from 'react-icons/fa';

const RunClubProfile = () => {
  // Mock data for the profile
  const profileData = {
    name: "Alex Johnson",
    location: "Seattle, WA",
    following: 128,
    followers: 245,
    weeklyStats: {
      distance: "32.6 km",
      time: "2h 45m",
      runs: 5,
      calories: 1850
    },
    monthlyGoal: 75,
    badges: [
      { id: 1, icon: <FaTrophy className="text-amber-400" />, name: "Marathon" },
      { id: 2, icon: <FaFire className="text-orange-400" />, name: "10K Streak" },
      { id: 3, icon: <FaMountain className="text-teal-400" />, name: "Hill Master" },
      { id: 4, icon: <FaStar className="text-yellow-400" />, name: "Speedster" },
      { id: 5, icon: <FaHeart className="text-rose-400" />, name: "Consistency" },
      { id: 6, icon: <FaCrown className="text-purple-400" />, name: "Leader" }
    ],
    weeklyActivity: [
      { day: "Mon", value: 70 },
      { day: "Tue", value: 40 },
      { day: "Wed", value: 60 },
      { day: "Thu", value: 90 },
      { day: "Fri", value: 50 },
      { day: "Sat", value: 80 },
      { day: "Sun", value: 30 }
    ],
    events: [
      { id: 1, day: 12, month: "JUL", name: "Summer Half Marathon", location: "Green Lake Park, Seattle", registered: true },
      { id: 2, day: 25, month: "JUL", name: "Trail Running Challenge", location: "Mount Rainier National Park", registered: false },
      { id: 3, day: 8, month: "AUG", name: "City 10K Run", location: "Downtown Seattle", registered: false }
    ],
    yearlyStats: {
      distance: "1,256 km",
      runs: 102,
      pace: "5:42 min/km",
      calories: "68,450",
      elevation: "12,450 m"
    },
    routes: [
      { id: 1, icon: <FaTree className="text-emerald-500" />, name: "Green Lake Loop", distance: "5.3 km", terrain: "Flat", difficulty: "Easy" },
      { id: 2, icon: <FaMountain className="text-amber-600" />, name: "Discovery Park Trail", distance: "8.2 km", terrain: "Hilly", difficulty: "Moderate" },
      { id: 3, icon: <FaRoad className="text-blue-500" />, name: "Waterfront Run", distance: "7.8 km", terrain: "Coastal", difficulty: "Easy" }
    ],
    challenges: [
      { id: 1, name: "June 100K Challenge", progress: 65, total: 100, unit: "km", start: "Jun 1", end: "Jun 30", color: "bg-gradient-to-r from-purple-500 to-indigo-500" },
      { id: 2, name: "Weekday Warrior", progress: 3, total: 5, unit: "runs", start: "Mon", end: "Sun", color: "bg-gradient-to-r from-fuchsia-500 to-pink-500" },
      { id: 3, name: "Elevation Master", progress: 4.2, total: 5, unit: "km", start: "Jun 15", end: "Jul 15", color: "bg-gradient-to-r from-blue-500 to-teal-500" }
    ]
  };

  const [posts, setPosts] = useState([
    {
      id: 1,
      avatar: "AJ",
      name: "Alex Johnson",
      time: "2 hours ago",
      content: "Just completed my longest run this year! 18.5km along the waterfront trail. Feeling amazing! #running #achievement",
      likes: 24,
      comments: 5,
      liked: false,
      commentsList: [
        { id: 1, name: "Sarah T.", content: "Great job Alex! That's an impressive distance!" },
        { id: 2, name: "Mike R.", content: "The waterfront is my favorite route too!" }
      ]
    },
    {
      id: 2,
      avatar: "AJ",
      name: "Alex Johnson",
      time: "Yesterday",
      content: "Beautiful morning run with the Seattle Runners group. The view of Mount Rainier was spectacular today!",
      image: true,
      likes: 42,
      comments: 8,
      liked: true,
      commentsList: [
        { id: 1, name: "Jenny L.", content: "Wish I could have joined!" },
        { id: 2, name: "David K.", content: "Perfect weather for a run!" }
      ]
    },
    {
      id: 3,
      avatar: "AJ",
      name: "Alex Johnson",
      time: "2 days ago",
      content: "New personal best on the Green Lake Loop! Shaved off 45 seconds from my previous time. Consistency pays off!",
      likes: 31,
      comments: 3,
      liked: false,
      commentsList: [
        { id: 1, name: "Tom P.", content: "That's awesome progress!" }
      ]
    }
  ]);
  
  const [newPost, setNewPost] = useState('');
  const [commentInput, setCommentInput] = useState({});
  const [showComments, setShowComments] = useState({});

  const handleAddPost = () => {
    if (newPost.trim() === '') return;
    
    const newPostObj = {
      id: posts.length + 1,
      avatar: "AJ",
      name: "Alex Johnson",
      time: "Just now",
      content: newPost,
      likes: 0,
      comments: 0,
      liked: false,
      commentsList: []
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId) => {
    if (!commentInput[postId] || commentInput[postId].trim() === '') return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: post.commentsList.length + 1,
          name: "You",
          content: commentInput[postId]
        };
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [...post.commentsList, newComment]
        };
      }
      return post;
    }));
    
    setCommentInput({...commentInput, [postId]: ''});
  };

  const toggleComments = (postId) => {
    setShowComments({
      ...showComments,
      [postId]: !showComments[postId]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 text-indigo-900 p-4 md:p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-br from-purple-200/30 to-violet-100/20 rounded-b-full -translate-y-1/3 -translate-x-1/3"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-300/20 rounded-full translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative">
              <FaRunning className="text-4xl text-purple-700 mr-3 z-10 relative" />
              <div className="absolute top-1 -left-1 w-10 h-10 bg-purple-300 rounded-full -z-10"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">RUN CLUB PROFILE</h1>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-5 py-2 rounded-full font-medium flex items-center transition-all duration-300 shadow-lg hover:shadow-xl">
              <FaHome className="mr-2" /> Home
            </button>
            <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white px-5 py-2 rounded-full font-medium flex items-center transition-all duration-300 shadow-lg hover:shadow-xl">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </header>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card + Posts */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/30 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              {/* Profile Header */}
              <div className="text-center relative z-10">
                <div className="relative mx-auto w-36 h-36">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 w-full h-full flex items-center justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24" />
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{profileData.name}</h2>
                <p className="text-purple-600 flex items-center justify-center mt-1">
                  <FaMapMarkerAlt className="mr-1" /> {profileData.location}
                </p>
                
                {/* Level indicator */}
                <div className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1 rounded-full mt-2 text-sm font-semibold shadow-md">
                  Level 7 Runner
                </div>
              </div>

              {/* Social Stats */}
              <div className="flex justify-around my-6 py-4 border-y border-purple-100 relative z-10">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-700">{profileData.following}</p>
                  <p className="text-purple-600 text-sm">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-700">{profileData.followers}</p>
                  <p className="text-purple-600 text-sm">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-700">24</p>
                  <p className="text-purple-600 text-sm">Badges</p>
                </div>
              </div>

              {/* Weekly Stats */}
              <div className="bg-purple-50/60 rounded-2xl p-4 mb-6 border border-purple-100 backdrop-blur-sm">
                <h3 className="text-center font-bold text-purple-800 mb-3 flex items-center justify-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  THIS WEEK
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(profileData.weeklyStats).map(([key, value], index) => (
                    <div key={index} className="bg-white/80 rounded-xl p-3 text-center shadow-sm backdrop-blur-sm">
                      <p className="text-lg font-bold text-indigo-700">{value}</p>
                      <p className="text-purple-600 text-sm capitalize">{key}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Goal */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-purple-800">Monthly Goal</span>
                  <span className="text-sm font-medium text-indigo-700">{profileData.monthlyGoal}%</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full shadow-md" 
                    style={{ width: `${profileData.monthlyGoal}%` }}
                  ></div>
                </div>
              </div>

              {/* Badges */}
              <div>
                <h3 className="flex items-center font-bold text-lg mb-3 text-purple-800">
                  <FaMedal className="text-amber-500 mr-2" /> Achievements
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {profileData.badges.map(badge => (
                    <div key={badge.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm border border-purple-100 transition-transform hover:scale-105">
                      <div className="text-2xl mx-auto mb-1">{badge.icon}</div>
                      <p className="text-sm font-medium text-purple-700">{badge.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* User Posts Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200/20 rounded-full"></div>
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="flex items-center font-bold text-lg text-purple-800">
                  <FaRunning className="text-indigo-500 mr-2" /> My Posts
                </h3>
                <div className="text-sm text-purple-600">{posts.length} posts</div>
              </div>
              
              {/* New Post Form */}
              <div className="mb-6 bg-purple-50/60 rounded-xl p-4 border border-purple-100">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your running update..."
                  className="w-full bg-transparent border-b border-purple-200 pb-2 mb-3 text-purple-800 placeholder-purple-400 focus:outline-none focus:border-purple-500"
                  rows="2"
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="text-purple-500 hover:text-purple-700">
                      <FaPlus />
                    </button>
                    <button className="text-purple-500 hover:text-purple-700">
                      <FaEllipsisH />
                    </button>
                  </div>
                  <button 
                    onClick={handleAddPost}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md"
                  >
                    Post
                  </button>
                </div>
              </div>
              
              {/* Posts List */}
              <div className="space-y-5 relative z-10">
                {posts.map(post => (
                  <div key={post.id} className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 transition-all hover:shadow-md">
                    {/* Post Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-purple-400 to-indigo-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {post.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-indigo-800">{post.name}</h4>
                          <p className="text-xs text-purple-500">{post.time}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeletePost(post.id)}
                        className="text-purple-400 hover:text-rose-500 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    
                    {/* Post Content */}
                    <div className="mb-4 text-purple-800">
                      <p>{post.content}</p>
                      {post.image && (
                        <div className="mt-3 bg-gradient-to-br from-purple-100 to-indigo-100 border-2 border-dashed border-purple-200 rounded-xl w-full h-48 flex items-center justify-center">
                          <div className="text-purple-400">Running Photo</div>
                        </div>
                      )}
                    </div>
                    
                    {/* Post Stats */}
                    <div className="flex text-sm text-purple-600 mb-3">
                      <span className="mr-3">{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                    
                    {/* Post Actions */}
                    <div className="flex border-t border-purple-100 pt-3">
                      <button 
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center mr-4 transition-colors ${post.liked ? 'text-indigo-600' : 'text-purple-500 hover:text-indigo-500'}`}
                      >
                        <FaThumbsUp className="mr-1" /> Like
                      </button>
                      <button 
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center text-purple-500 hover:text-indigo-500 transition-colors"
                      >
                        <FaComment className="mr-1" /> Comment
                      </button>
                    </div>
                    
                    {/* Comments Section */}
                    {showComments[post.id] && (
                      <div className="mt-4">
                        {/* Existing Comments */}
                        <div className="space-y-3 mb-4">
                          {post.commentsList.map(comment => (
                            <div key={comment.id} className="flex items-start">
                              <div className="bg-purple-200 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-purple-700 mr-2">
                                {comment.name.charAt(0)}
                              </div>
                              <div className="bg-white rounded-lg p-3 flex-1">
                                <div className="font-medium text-indigo-800">{comment.name}</div>
                                <p className="text-purple-700">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Add Comment */}
                        <div className="flex items-center">
                          <div className="bg-gradient-to-r from-purple-400 to-indigo-400 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                            AJ
                          </div>
                          <div className="flex-1 flex">
                            <input
                              type="text"
                              value={commentInput[post.id] || ''}
                              onChange={(e) => setCommentInput({...commentInput, [post.id]: e.target.value})}
                              placeholder="Write a comment..."
                              className="flex-1 bg-purple-100 rounded-l-full px-4 py-2 text-purple-800 focus:outline-none"
                            />
                            <button 
                              onClick={() => handleAddComment(post.id)}
                              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 rounded-r-full"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Activity Graph */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/20 rounded-full"></div>
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="flex items-center font-bold text-lg text-purple-800">
                  <FaChartLine className="text-indigo-500 mr-2" /> Weekly Activity
                </h3>
                <div className="text-sm text-purple-600">Last 7 Days</div>
              </div>
              
              <div className="flex items-end justify-between h-48 mt-6 border-b border-l border-purple-100 px-4">
                {profileData.weeklyActivity.map((day, index) => (
                  <div key={index} className="flex flex-col items-center w-10">
                    <div 
                      className="w-8 bg-gradient-to-t from-purple-400 to-indigo-500 rounded-t-lg shadow-md transition-all hover:opacity-80 cursor-pointer"
                      style={{ height: `${day.value}%` }}
                    ></div>
                    <span className="text-xs mt-2 text-purple-600 font-medium">{day.day}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-8 px-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-700">32.6 km</div>
                  <div className="text-xs text-purple-600">Total Distance</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-700">5</div>
                  <div className="text-xs text-purple-600">Activities</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-700">2h 45m</div>
                  <div className="text-xs text-purple-600">Total Time</div>
                </div>
              </div>
            </div>

            {/* Events and Stats Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upcoming Events */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white relative overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200/20 rounded-full"></div>
                
                <div className="flex justify-between items-center mb-4">
                  <h3 className="flex items-center font-bold text-lg text-purple-800">
                    <FaCalendarAlt className="text-rose-500 mr-2" /> Upcoming Events
                  </h3>
                  <div className="text-sm text-purple-600">3 events</div>
                </div>
                
                <div className="space-y-4 relative z-10">
                  {profileData.events.map(event => (
                    <div key={event.id} className="flex items-center bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 transition-all hover:shadow-md">
                      <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-center rounded-xl py-2 px-4 min-w-[70px]">
                        <div className="font-bold text-xl">{event.day}</div>
                        <div className="text-xs uppercase tracking-wider">{event.month}</div>
                      </div>
                      <div className="ml-4 flex-grow">
                        <h4 className="font-bold text-indigo-800">{event.name}</h4>
                        <p className="text-sm text-purple-600">{event.location}</p>
                      </div>
                      <button className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md
                        ${event.registered 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                          : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white'}`}>
                        {event.registered ? 'Registered' : 'Register'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yearly Statistics */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-200/20 rounded-full"></div>
                
                <div className="flex justify-between items-center mb-4">
                  <h3 className="flex items-center font-bold text-lg text-purple-800">
                    <FaChartPie className="text-amber-500 mr-2" /> Yearly Statistics
                  </h3>
                  <div className="text-sm text-purple-600">2025</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(profileData.yearlyStats).map(([key, value], index) => (
                    <div key={index} className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100 transition-transform hover:scale-[1.02]">
                      <p className="text-2xl font-bold text-indigo-700">{value}</p>
                      <p className="text-purple-600 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl p-4 text-center">
                  <div className="text-lg font-bold text-indigo-700">102 Activities</div>
                  <div className="text-sm text-purple-600">Completed this year</div>
                </div>
              </div>
            </div>

            {/* Routes */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-200/20 rounded-full"></div>
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="flex items-center font-bold text-lg text-purple-800">
                  <FaRoute className="text-emerald-500 mr-2" /> Favorite Routes
                </h3>
                <div className="text-sm text-purple-600">3 routes</div>
              </div>
              
              <div className="space-y-4 relative z-10">
                {profileData.routes.map(route => (
                  <div key={route.id} className="flex items-center bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 transition-all hover:shadow-md">
                    <div className="text-2xl mr-4">
                      {route.icon}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-indigo-800">{route.name}</h4>
                      <div className="flex flex-wrap text-sm text-purple-600 mt-1 gap-3">
                        <span className="flex items-center">
                          <FaRoad className="mr-1" /> {route.distance}
                        </span>
                        <span className="flex items-center">
                          <FaTachometerAlt className="mr-1" /> {route.terrain}
                        </span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">
                          {route.difficulty}
                        </span>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-200/20 rounded-full"></div>
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="flex items-center font-bold text-lg text-purple-800">
                  <FaFlagCheckered className="text-fuchsia-500 mr-2" /> Current Challenges
                </h3>
                <div className="text-sm text-purple-600">3 challenges</div>
              </div>
              
              <div className="space-y-4 relative z-10">
                {profileData.challenges.map(challenge => (
                  <div key={challenge.id} className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 transition-all hover:shadow-md">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-indigo-800">{challenge.name}</h4>
                      <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        {challenge.progress} {challenge.unit}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-purple-100 rounded-full h-3 shadow-inner">
                        <div 
                          className={`${challenge.color} h-3 rounded-full shadow-md`}
                          style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className="ml-3 text-sm text-purple-600 font-medium">
                        {Math.round((challenge.progress / challenge.total) * 100)}%
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-purple-600">
                      <span>Started: {challenge.start}</span>
                      <span>Ends: {challenge.end}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                  View All Challenges
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-purple-600 py-6 border-t border-purple-100">
          <p className="font-medium">Run Club Profile &copy; 2025 • Keep moving forward!</p>
          <div className="flex justify-center mt-2 space-x-4">
            <span className="text-xs bg-purple-100 px-3 py-1 rounded-full">Total Runs: 256</span>
            <span className="text-xs bg-purple-100 px-3 py-1 rounded-full">Longest Run: 21.3 km</span>
            <span className="text-xs bg-purple-100 px-3 py-1 rounded-full">Current Streak: 12 days</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RunClubProfile;