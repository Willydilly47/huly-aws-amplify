import React from 'react';
import { PlusIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Task, Project } from '../types';

interface TaskBoardProps {
  tasks: Task[];
  project: Project;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  project
}) => {
  const columns: Array<{ id: Task['status']; title: string; color: string }> = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' },
  ];

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUserById = (userId: string) => {
    const mockUsers = [
      { id: '1', email: 'user@huly.com', name: 'John Doe', role: 'admin' as const },
      { id: '2', email: 'jane@huly.com', name: 'Jane Smith', role: 'member' as const },
      { id: '3', email: 'bob@huly.com', name: 'Bob Johnson', role: 'member' as const }
    ];
    return mockUsers.find(u => u.id === userId);
  };

  const getTasksByStatus = (status: Task['status']) => 
    tasks.filter(task => task.status === status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {project.name} - Tasks
          </h1>
          <p className="text-gray-600">
            Track and manage tasks for your project
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Task
        </button>
      </div>

      {/* Task Board */}
      <div className="flex space-x-6 overflow-x-auto">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          
          return (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className={`rounded-lg ${column.color} p-4`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    {column.title}
                  </h3>
                  <span className="bg-white text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {columnTasks.map((task) => {
                    const assignee = task.assigneeId ? getUserById(task.assigneeId) : null;
                    
                    return (
                      <div
                        key={task.id}
                        className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {task.title}
                          </h4>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <EllipsisVerticalIcon className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {task.description && (
                          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          
                          {assignee && (
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">
                                  {assignee.name.charAt(0)}
                                </span>
                              </div>
                              <span className="text-xs text-gray-600">
                                {assignee.name}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {task.labels.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {task.labels.slice(0, 3).map((label) => (
                              <span
                                key={label}
                                className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                              >
                                {label}
                              </span>
                            ))}
                            {task.labels.length > 3 && (
                              <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                +{task.labels.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>
                            {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                          {task.dueDate && (
                            <span>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Add Task Card */}
                  <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                    <div className="flex items-center justify-center text-gray-500">
                      <PlusIcon className="h-5 w-5 mr-2" />
                      <span className="text-sm">Add a task</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;