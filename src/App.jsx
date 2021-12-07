import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTasks } from './actions/tasksActions';
import ResponsiveDrawer from './components/ResponsiveDrawer';

const App = ({ loadTasks }) => {
  useEffect(() => {
    loadTasks();
  }, []);

  return <ResponsiveDrawer />;
};

export default connect(null, { loadTasks })(App);
