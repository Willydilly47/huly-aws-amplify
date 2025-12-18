// Core types for Huly-like application
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'member' | 'viewer';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  members: User[];
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  labels: string[];
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  projects: Project[];
  members: User[];
  createdAt: string;
}