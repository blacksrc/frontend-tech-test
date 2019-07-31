import TaskList from './components/TaskList';
import TaskAdd from './components/TaskAdd';
import TaskView from './components/TaskView';

// Default routes
const routes = {
  tasks: {
    path: '/',
    component: TaskList,
    exact: true,
    description: 'Task List'
  },
  newTask: {
    path: '/tasks/add',
    component: TaskAdd,
    exact: true,
    description: 'Add New Task'
  },
  viewTask: {
    path: '/tasks/:id',
    component: TaskView,
    exact: false,
    description: 'View Task'
  },
  editTask: {
    path: '/tasks/:id/edit',
    component: TaskList,
    exact: false,
    description: 'Edit Task'
  },
  deleteTask: {
    path: '/tasks/:id/delete',
    component: TaskList,
    exact: false,
    description: 'Delete Task'
  },
  NotFound: {
    path: null,
    component: TaskList,
    exact: false,
    description: 'Route not found'
  }
};

export default routes;
