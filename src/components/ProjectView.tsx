import React from 'react';
import { PlusIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Workspace, Project } from '../types';

interface ProjectViewProps {
  workspace: Workspace;
  onProjectSelect: (project: Project) => void;
  selectedProject: Project | null;
}

const ProjectView: React.FC<ProjectViewProps> = ({
  workspace,
  onProjectSelect,
  selectedProject
}) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">
            Manage your team projects and track progress
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{workspace.projects.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {workspace.projects.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">
                {workspace.projects.filter(p => p.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-purple-600">{workspace.members.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspace.projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onProjectSelect(project)}
            className={`bg-white rounded-lg shadow border hover:shadow-md transition-shadow cursor-pointer ${
              selectedProject?.id === project.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.name}
                  </h3>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <div className="flex -space-x-2">
                  {workspace.members.slice(0, 3).map((member) => (
                    <div
                      key={member.id}
                      className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center"
                      title={member.name}
                    >
                      <span className="text-xs font-medium text-gray-600">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  ))}
                  {workspace.members.length > 3 && (
                    <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        +{workspace.members.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectView;