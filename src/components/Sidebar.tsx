import React from 'react';
import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  PlusIcon,
  RectangleStackIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Workspace, Project } from '../types';
import clsx from 'clsx';

interface SidebarProps {
  workspace: Workspace;
  selectedProject: Project | null;
  onProjectSelect: (project: Project) => void;
  view: 'projects' | 'tasks' | 'team';
  onViewChange: (view: 'projects' | 'tasks' | 'team') => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  workspace,
  selectedProject,
  onProjectSelect,
  view,
  onViewChange
}) => {
  const navigation = [
    { name: 'Home', icon: HomeIcon, view: 'projects' as const },
    { name: 'Projects', icon: RectangleStackIcon, view: 'projects' as const },
    { name: 'Tasks', icon: CalendarIcon, view: 'tasks' as const },
    { name: 'Team', icon: UsersIcon, view: 'team' as const },
    { name: 'Settings', icon: Cog6ToothIcon, view: 'projects' as const },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Workspace Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{workspace.name}</h2>
            <p className="text-xs text-gray-500">{workspace.members.length} members</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = view === item.view && 
            (item.name !== 'Tasks' || selectedProject);
          
          return (
            <button
              key={item.name}
              onClick={() => onViewChange(item.view)}
              className={clsx(
                'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Projects List */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Projects
          </h3>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-1">
          {workspace.projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onProjectSelect(project)}
              className={clsx(
                'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors',
                selectedProject?.id === project.id
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <span className="truncate">{project.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <div className="px-4 pb-6 border-t border-gray-200 pt-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Team Members
        </h3>
        <div className="space-y-2">
          {workspace.members.slice(0, 3).map((member) => (
            <div key={member.id} className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {member.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-gray-600 truncate">{member.name}</span>
            </div>
          ))}
          {workspace.members.length > 3 && (
            <p className="text-xs text-gray-500">
              +{workspace.members.length - 3} more
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;