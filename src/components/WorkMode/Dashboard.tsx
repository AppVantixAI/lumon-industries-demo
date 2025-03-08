import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  BarChart, 
  FileText, 
  Bell, 
  Clock, 
  AlertTriangle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Filter,
  Calendar,
  User,
  Grid,
  RefreshCcw,
  X,
  Lock
} from 'lucide-react';
import Chatbot from '../Chatbot';
import { Task, Announcement, PerformanceMetric } from '../../types';
import { getRandomHiddenMessage } from '../../utils/easterEggs';

// Numbers and Boxes Game Component
const NumbersAndBoxesGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [gameBoard, setGameBoard] = useState<Array<{ value: number; revealed: boolean; matched: boolean }>>([]);
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Initialize game board
  useEffect(() => {
    initializeGame();
  }, []);
  
  // Timer effect
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);
  
  const initializeGame = () => {
    // Create pairs of numbers from 1 to 8
    const values = [...Array(8).keys()].map(i => i + 1);
    const pairs = [...values, ...values];
    
    // Shuffle the array
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    
    // Create game board
    const board = shuffled.map(value => ({
      value,
      revealed: false,
      matched: false
    }));
    
    setGameBoard(board);
    setSelectedBoxes([]);
    setScore(0);
    setTimer(60);
    setGameOver(false);
    setGameStarted(false);
  };
  
  const handleBoxClick = (index: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    if (gameOver || gameBoard[index].revealed || gameBoard[index].matched) {
      return;
    }
    
    // Reveal the clicked box
    const updatedBoard = [...gameBoard];
    updatedBoard[index] = { ...updatedBoard[index], revealed: true };
    setGameBoard(updatedBoard);
    
    // Add to selected boxes
    const updated = [...selectedBoxes, index];
    setSelectedBoxes(updated);
    
    // Check if we have 2 selected boxes
    if (updated.length === 2) {
      const [first, second] = updated;
      
      // Check if they match
      if (gameBoard[first].value === gameBoard[second].value) {
        // Match found
        setTimeout(() => {
          const matchedBoard = [...updatedBoard];
          matchedBoard[first] = { ...matchedBoard[first], matched: true };
          matchedBoard[second] = { ...matchedBoard[second], matched: true };
          setGameBoard(matchedBoard);
          setSelectedBoxes([]);
          setScore(prev => prev + 10);
          
          // Check if all matched
          if (matchedBoard.every(box => box.matched)) {
            setGameOver(true);
          }
        }, 500);
      } else {
        // No match, hide after delay
        setTimeout(() => {
          const resetBoard = [...updatedBoard];
          resetBoard[first] = { ...resetBoard[first], revealed: false };
          resetBoard[second] = { ...resetBoard[second], revealed: false };
          setGameBoard(resetBoard);
          setSelectedBoxes([]);
          setScore(prev => Math.max(0, prev - 2)); // Penalty for wrong match
        }, 1000);
      }
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Numbers and Boxes</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Score: <span className="font-bold text-blue-900">{score}</span>
          </div>
          <div className="text-sm text-gray-600">
            Time: <span className={`font-bold ${timer < 10 ? 'text-red-600' : 'text-blue-900'}`}>{timer}s</span>
          </div>
          <button 
            onClick={initializeGame}
            className="text-sm text-blue-900 hover:text-blue-700 flex items-center"
          >
            <RefreshCcw className="h-4 w-4 mr-1" />
            Restart
          </button>
        </div>
        
        {!gameStarted && !gameOver ? (
          <div className="text-center py-4">
            <p className="mb-4 text-gray-700">Click any box to start the game. Match pairs of numbers to score points.</p>
            <button 
              onClick={() => setGameStarted(true)}
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              Start Game
            </button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {score >= 70 ? 'Excellent Work!' : score >= 40 ? 'Good Job!' : 'Try Again!'}
            </h3>
            <p className="text-gray-700 mb-4">
              {score >= 70 
                ? 'Your performance has been noted for quarterly review.' 
                : score >= 40 
                  ? 'Acceptable performance. Continue refining your skills.' 
                  : 'Your performance requires improvement.'}
            </p>
            <p className="text-gray-600 mb-4">Final Score: {score}</p>
            <button 
              onClick={initializeGame}
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {gameBoard.map((box, index) => (
              <button
                key={index}
                onClick={() => handleBoxClick(index)}
                className={`aspect-square flex items-center justify-center text-lg font-bold rounded-md transition-all ${
                  box.matched 
                    ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                    : box.revealed 
                      ? 'bg-blue-100 text-blue-900 border-2 border-blue-300' 
                      : 'bg-gray-200 text-transparent hover:bg-gray-300 border-2 border-gray-300'
                }`}
                disabled={box.matched}
              >
                {box.revealed || box.matched ? box.value : '?'}
              </button>
            ))}
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500 text-center">
          <p>Authorized recreational activity - Lumon Industries</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showChatbot, setShowChatbot] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskFilter, setTaskFilter] = useState('all');
  const [showTaskDetails, setShowTaskDetails] = useState<number | null>(null);
  const [newTask, setNewTask] = useState('');
  const [showMetricsDetails, setShowMetricsDetails] = useState(false);
  const [hiddenMessage, setHiddenMessage] = useState('');
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  
  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load tasks based on user
      const userTasks: Task[] = [
        { 
          id: 1, 
          name: 'Complete daily data refinement', 
          status: 'in-progress', 
          deadline: 'Today',
          description: 'Process and refine the latest batch of macrodata numbers according to department protocols.',
          priority: 'high'
        },
        { 
          id: 2, 
          name: 'Review department metrics', 
          status: 'pending', 
          deadline: 'Tomorrow',
          description: 'Analyze team performance metrics and prepare summary for weekly management review.',
          priority: 'medium'
        },
        { 
          id: 3, 
          name: 'Update personal information', 
          status: 'completed', 
          deadline: 'Yesterday',
          description: 'Ensure all personal information in the employee database is current and accurate.',
          priority: 'low'
        },
        { 
          id: 4, 
          name: 'Attend wellness check', 
          status: 'pending', 
          deadline: 'Friday',
          description: 'Mandatory wellness assessment with Wellness counselor Ms. Casey.',
          priority: 'medium'
        }
      ];
      
      // Add user-specific tasks based on role
      if (user?.email === 'mark.scout@lumon.com') {
        userTasks.push({ 
          id: 5, 
          name: 'Department lead meeting', 
          status: 'pending', 
          deadline: 'Thursday',
          description: 'Weekly coordination meeting with other department leads.',
          priority: 'high'
        });
      } else if (user?.email === 'helly.riggs@lumon.com') {
        userTasks.push({ 
          id: 5, 
          name: 'Complete orientation materials', 
          status: 'pending', 
          deadline: 'Wednesday',
          description: 'Review and sign all remaining new employee documentation.',
          priority: 'high'
        });
      } else if (user?.email === 'irving@lumon.com') {
        userTasks.push({ 
          id: 5, 
          name: 'Compliance audit preparation', 
          status: 'in-progress', 
          deadline: 'Friday',
          description: 'Prepare department files for quarterly compliance review.',
          priority: 'high'
        });
      } else if (user?.email === 'dylan.george@lumon.com') {
        userTasks.push({ 
          id: 5, 
          name: 'Quarterly incentive selection', 
          status: 'pending', 
          deadline: 'Monday',
          description: 'Choose reward from the quarterly incentive catalog.',
          priority: 'medium'
        });
      } else if (user?.email === 'cobel.admin@lumon.com') {
        userTasks.push({ 
          id: 5, 
          name: 'Board presentation preparation', 
          status: 'in-progress', 
          deadline: 'Friday',
          description: 'Prepare quarterly department performance report for the board.',
          priority: 'high'
        });
        userTasks.push({ 
          id: 6, 
          name: 'Employee evaluation reviews', 
          status: 'pending', 
          deadline: 'Next week',
          description: 'Review and approve all employee performance evaluations.',
          priority: 'high'
        });
      }
      
      setTasks(userTasks);
      
      // Load announcements
      setAnnouncements([
        {
          id: 1,
          title: 'Quarterly Review',
          content: 'All employees must complete their quarterly performance reviews by the end of the week.',
          date: '2 hours ago',
          priority: 'high'
        },
        {
          id: 2,
          title: 'System Maintenance',
          content: 'The system will be undergoing maintenance tonight from 2:00 AM to 4:00 AM.',
          date: '1 day ago',
          priority: 'medium'
        },
        {
          id: 3,
          title: 'New Security Protocol',
          content: 'Please review the updated security protocols in section 7.3 of the employee handbook.',
          date: '3 days ago',
          priority: 'medium'
        },
        {
          id: 4,
          title: 'Reminder: Data Compliance',
          content: 'All employees are reminded to adhere strictly to data handling procedures. The work is mysterious and important.',
          date: '1 week ago',
          priority: 'low'
        }
      ]);
      
      // Load performance metrics
      const baseMetrics: PerformanceMetric[] = [
        {
          id: 1,
          name: 'Efficiency Rating',
          value: 94,
          target: 90,
          unit: '%',
          trend: 'up'
        },
        {
          id: 2,
          name: 'Data Processed',
          value: 1247,
          target: 1000,
          unit: 'units',
          trend: 'up'
        },
        {
          id: 3,
          name: 'Error Rate',
          value: 0.3,
          target: 1.0,
          unit: '%',
          trend: 'down'
        }
      ];
      
      // Customize metrics based on user
      if (user?.accessLevel === 5) {
        baseMetrics.push({
          id: 4,
          name: 'Department Compliance',
          value: 98,
          target: 95,
          unit: '%',
          trend: 'up'
        });
      }
      
      setMetrics(baseMetrics);
      
      // Set a hidden message
      setHiddenMessage(getRandomHiddenMessage());
      
      // Randomly show hidden message (10% chance)
      if (Math.random() < 0.1) {
        setTimeout(() => {
          setShowHiddenMessage(true);
          setTimeout(() => setShowHiddenMessage(false), 3000);
        }, 5000 + Math.random() * 10000);
      }
      
      setIsLoading(false);
    };
    
    loadData();
  }, [user]);
  
  const handleTaskStatusChange = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: task.status === 'completed' 
                ? 'pending' 
                : 'completed' 
            } 
          : task
      )
    );
  };
  
  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj: Task = {
        id: Date.now(),
        name: newTask,
        status: 'pending',
        deadline: 'Next week',
        priority: 'medium'
      };
      
      setTasks(prev => [...prev, newTaskObj]);
      setNewTask('');
    }
  };
  
  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'all') return true;
    if (taskFilter === 'completed') return task.status === 'completed';
    if (taskFilter === 'pending') return task.status === 'pending';
    if (taskFilter === 'in-progress') return task.status === 'in-progress';
    return true;
  });
  
  const completedTasksCount = tasks.filter(task => task.status === 'completed').length;
  const pendingHighPriorityCount = tasks.filter(task => 
    task.status !== 'completed' && task.priority === 'high'
  ).length;

  // Get the primary performance metric
  const primaryMetric = metrics.length > 0 ? metrics[0] : null;
  
  // Render main content based on active tab
  const renderContent = () => {
    if (activeTab === 'recreation') {
      return (
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Recreation Portal</h1>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Authorized Recreational Activities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all"
                onClick={() => setShowGame(true)}
              >
                <div className="flex items-center mb-3">
                  <Grid className="h-6 w-6 text-blue-900 mr-3" />
                  <h3 className="text-lg font-medium text-gray-900">Numbers and Boxes</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Match pairs of numbers to clear the board. Improve your pattern recognition skills while enjoying a brief mental break.
                </p>
                <button 
                  className="text-blue-900 text-sm font-medium hover:text-blue-700"
                  onClick={() => setShowGame(true)}
                >
                  Play Now
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center mb-3">
                  <Lock className="h-6 w-6 text-gray-400 mr-3" />
                  <h3 className="text-lg font-medium text-gray-400">Music Dance Experience</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  This recreational activity requires special authorization. Please contact your department head for access.
                </p>
                <button className="text-gray-400 text-sm font-medium cursor-not-allowed">
                  Locked
                </button>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Note: Recreational activities are limited to 15 minutes per work day. Usage is monitored and contributes to your quarterly wellness assessment.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    // Default to home tab
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.name}</h1>
          <p className="text-sm text-gray-600 mt-1">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        {showHiddenMessage && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-md z-50 animate-pulse">
            {hiddenMessage}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Performance</h2>
              <BarChart className="h-5 w-5 text-blue-900" />
            </div>
            {primaryMetric && (
              <>
                <div className="text-3xl font-bold text-gray-900">{primaryMetric.value}{primaryMetric.unit}</div>
                <div className="text-sm text-gray-600 mt-1">{primaryMetric.name}</div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-900 rounded-full" 
                    style={{ width: `${Math.min(100, (primaryMetric.value / primaryMetric.target) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Target: {primaryMetric.target}{primaryMetric.unit}</span>
                  <div className="flex items-center">
                    {primaryMetric.trend === 'up' ? (
                      <ChevronUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={primaryMetric.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {primaryMetric.trend === 'up' ? 'Improving' : 'Declining'}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMetricsDetails(!showMetricsDetails)}
                  className="mt-4 text-sm text-blue-900 hover:text-blue-700 flex items-center"
                >
                  {showMetricsDetails ? 'Hide details' : 'View all metrics'}
                  {showMetricsDetails ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                </button>
                
                {showMetricsDetails && (
                  <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
                    {metrics.slice(1).map(metric => (
                      <div key={metric.id} className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{metric.name}</div>
                          <div className="text-xs text-gray-500">Target: {metric.target}{metric.unit}</div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-gray-900 mr-2">
                            {metric.value}{metric.unit}
                          </span>
                          {metric.trend === 'up' ? (
                            <ChevronUp className={`h-4 w-4 ${metric.name === 'Error Rate' ? 'text-red-500' : 'text-green-500'}`} />
                          ) : (
                            <ChevronDown className={`h-4 w-4 ${metric.name === 'Error Rate' ? 'text-green-500' : 'text-red-500'}`} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Tasks</h2>
              <FileText className="h-5 w-5 text-blue-900" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{tasks.length - completedTasksCount}</div>
            <div className="text-sm text-gray-600 mt-1">Pending Tasks</div>
            <div className="mt-4 flex space-x-2">
              <div className="flex-1 h-2 bg-green-200 rounded-full">
                <div 
                  className="h-2 bg-green-500 rounded-full" 
                  style={{ width: `${(completedTasksCount / tasks.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex-1 h-2 bg-amber-200 rounded-full">
                <div 
                  className="h-2 bg-amber-500 rounded-full" 
                  style={{ width: `${(tasks.filter(t => t.status === 'in-progress').length / tasks.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex-1 h-2 bg-red-200 rounded-full">
                <div 
                  className="h-2 bg-red-500 rounded-full" 
                  style={{ width: `${(tasks.filter(t => t.status === 'pending' && t.priority === 'high').length / tasks.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Completed: {completedTasksCount}</span>
              <span>In Progress: {tasks.filter(t => t.status === 'in-progress').length}</span>
              <span>High Priority: {pendingHighPriorityCount}</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
              <Bell className="h-5 w-5 text-blue-900" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{announcements.length}</div>
            <div className="text-sm text-gray-600 mt-1">Unread Messages</div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                <span>Urgent ({announcements.filter(a => a.priority === 'high').length})</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
                <span>Important ({announcements.filter(a => a.priority === 'medium').length})</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                <span>Regular ({announcements.filter(a => a.priority === 'low').length})</span>
              </div>
            </div>
            
            {user?.accessLevel >= 4 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Admin Notice:</span> {announcements.filter(a => a.priority === 'high').length} urgent items require attention.
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Announcements</h2>
              {user?.accessLevel >= 4 && (
                <button className="text-sm text-blue-900 hover:text-blue-700">
                  Manage
                </button>
              )}
            </div>
            <div className="p-4 space-y-4">
              {announcements.map(announcement => (
                <div key={announcement.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <div className={`mt-1 h-2 w-2 rounded-full mr-3 ${
                      announcement.priority === 'high' ? 'bg-red-500' : 
                      announcement.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{announcement.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{announcement.content}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{announcement.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Tasks</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <button 
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                    onClick={() => setTaskFilter(taskFilter === 'all' ? 'pending' : 'all')}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    {taskFilter === 'all' ? 'All' : 
                     taskFilter === 'completed' ? 'Completed' : 
                     taskFilter === 'pending' ? 'Pending' : 'In Progress'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex mb-4">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                />
                <button 
                  onClick={handleAddTask}
                  className="bg-blue-900 text-white p-2 rounded-r-md hover:bg-blue-800"
                >
                  Add
                </button>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {filteredTasks.map(task => (
                  <div key={task.id} className="border border-gray-100 rounded-md">
                    <div 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => setShowTaskDetails(showTaskDetails === task.id ? null : task.id)}
                    >
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={task.status === 'completed'} 
                          onChange={() => handleTaskStatusChange(task.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 text-blue-900 rounded border-gray-300 focus:ring-blue-900"
                        />
                        <span className={`ml-3 text-sm ${
                          task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-700'
                        }`}>
                          {task.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {task.status === 'in-progress' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            In Progress
                          </span>
                        )}
                        {task.status === 'pending' && task.priority === 'high' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 mr-2">
                            High
                          </span>
                        )}
                        <span className="ml-2 text-xs text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {task.deadline}
                        </span>
                        {showTaskDetails === task.id ? (
                          <ChevronUp className="h-4 w-4 ml-2 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                        )}
                      </div>
                    </div>
                    
                    {showTaskDetails === task.id && task.description && (
                      <div className="p-3 bg-gray-50 text-sm text-gray-600 border-t border-gray-100">
                        <p>{task.description}</p>
                        {task.assignedTo && (
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <User className="h-3 w-3 mr-1" />
                            <span>Assigned to: {task.assignedTo}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div>{completedTasksCount} of {tasks.length} tasks completed</div>
                  <div className="flex items-center">
                    <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                    <span>{pendingHighPriorityCount} high priority tasks pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {user?.accessLevel >= 4 && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Department Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-md p-3">
                <h3 className="text-sm font-medium text-gray-700">Team Performance</h3>
                <div className="mt-2 text-2xl font-bold text-gray-900">92%</div>
                <div className="text-xs text-gray-500">Average efficiency rating</div>
              </div>
              <div className="border border-gray-200 rounded-md p-3">
                <h3 className="text-sm font-medium text-gray-700">Compliance Status</h3>
                <div className="mt-2 text-2xl font-bold text-green-600">Compliant</div>
                <div className="text-xs text-gray-500">Last audit: 2 weeks ago</div>
              </div>
              <div className="border border-gray-200 rounded-md p-3">
                <h3 className="text-sm font-medium text-gray-700">Resource Allocation</h3>
                <div className="mt-2 text-2xl font-bold text-gray-900">87%</div>
                <div className="text-xs text-gray-500">Utilization rate</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <RefreshCcw className="h-8 w-8 text-blue-900 animate-spin mx-auto" />
            <p className="mt-2 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Main content */}
          {renderContent()}
          
          {/* Game modal */}
          {showGame && <NumbersAndBoxesGame onClose={() => setShowGame(false)} />}
          
          {/* Chatbot button */}
          <button 
            onClick={() => setShowChatbot(!showChatbot)}
            className="fixed bottom-6 right-6 bg-blue-900 text-white rounded-full p-3 shadow-lg hover:bg-blue-800 transition-colors"
          >
            <MessageSquare className="h-6 w-6" />
          </button>
          
          {/* Chatbot component */}
          {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
        </>
      )}
    </div>
  );
};

export default Dashboard;
