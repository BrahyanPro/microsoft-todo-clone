import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FaRegCircle, FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

import { addStep, addTask } from '../actions/tasksActions';

const AddItemContainer = ({
  addItem,
  lists,
  placeholder,
  selectedListId,
  selectedTaskId,
  onAddStep = (f) => f,
  onAddTask = (f) => f,
}) => {
  const [item, setItem] = useState('');
  const selectedList = lists.filter((list) => list.id === selectedListId);
  const name = selectedList[0].name;
  const todaysDate = moment(new Date()).format('YYYY-MM-DD');
  const getSize = addItem === 'task' ? 19 : 16;

  const handleChange = () => {
    setItem(_newItem.value);
  };

  let _newItem;

  const itemStyle = () => {
    return addItem === 'task'
      ? {
          margin: '0 auto',
          height: 60,
          padding: '10px 14px',
          borderBottom: '1px solid gainsboro',
        }
      : {
          margin: '3px 0 10px 0',
          height: 30,
          padding: '10px 12px',
          borderBottom: 'none',
        };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!item) return;

    const newStep = {
      completedStatus: false,
      id: v4(),
      step: item,
      task_id: selectedTaskId,
    };

    if (addItem === 'step') {
      onAddStep(newStep);
    } else {
      if (name === 'My Day') {
        onAddTask({
          task_id: v4(),
          item,
          date_completed: '',
          date_created: todaysDate,
          date_due: '',
          completedStatus: false,
          importantStatus: false,
          my_day: true,
          planned: false,
          important: false,
          tasks: true,
          list_id: '3',
          note: '',
          steps: [],
          temp: '',
        });
      } else if (name === 'Important') {
        onAddTask({
          task_id: v4(),
          item,
          date_completed: '',
          date_created: todaysDate,
          date_due: '',
          completedStatus: false,
          importantStatus: true,
          my_day: false,
          planned: false,
          important: true,
          tasks: true,
          list_id: '3',
          note: '',
          steps: [],
          temp: '',
        });
      } else if (name === 'Planned') {
        onAddTask({
          task_id: v4(),
          item,
          date_completed: '',
          date_created: todaysDate,
          date_due: todaysDate,
          completedStatus: false,
          importantStatus: false,
          my_day: false,
          planned: true,
          important: false,
          tasks: true,
          list_id: '3',
          note: '',
          steps: [],
          temp: '',
        });
      } else if (name === 'Tasks') {
        onAddTask({
          task_id: v4(),
          item,
          date_completed: '',
          date_created: todaysDate,
          date_due: '',
          completedStatus: false,
          importantStatus: false,
          my_day: false,
          planned: false,
          important: false,
          tasks: true,
          list_id: '3',
          note: '',
          steps: [],
          temp: '',
        });
      } else {
        onAddTask({
          task_id: v4(),
          item,
          date_completed: '',
          date_created: todaysDate,
          date_due: '',
          completedStatus: false,
          importantStatus: false,
          my_day: false,
          planned: false,
          important: false,
          tasks: false,
          list_id: selectedList[0].id,
          note: '',
          steps: [],
          temp: '',
        });
      }
    }

    setItem('');
  };

  return (
    <form
      className="additem-form align-center"
      style={itemStyle()}
      onSubmit={onSubmit}
    >
      <button className="additem-btn" type="submit">
        {!item ? (
          <FaPlus style={{ fontSize: getSize }} className="blue" />
        ) : (
          <FaRegCircle style={{ fontSize: getSize }} className="gray" />
        )}
      </button>

      <input
        name="item"
        placeholder={placeholder}
        ref={(input) => (_newItem = input)}
        style={{ flex: '10', padding: 5, border: 'none' }}
        type="text"
        value={item}
        onChange={(e) => handleChange(e.target.value)}
      />
    </form>
  );
};

AddItemContainer.propTypes = {
  addItem: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
  placeholder: PropTypes.any,
  selectedListId: PropTypes.string.isRequired,
  selectedTaskId: PropTypes.string.isRequired,
  onAddStep: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lists: state.lists,
  selectedListId: state.current.list['id'],
  selectedTaskId: state.current.task['id'],
});

const mapDispatchToProps = (dispatch) => ({
  onAddTask({
    task_id,
    item,
    date_completed,
    date_created,
    date_due,
    temp,
    completedStatus,
    importantStatus,
    my_day,
    planned,
    important,
    tasks,
    list_id,
    note,
    steps,
  }) {
    dispatch(
      addTask(
        task_id,
        item,
        date_completed,
        date_created,
        date_due,
        temp,
        completedStatus,
        importantStatus,
        my_day,
        planned,
        important,
        tasks,
        list_id,
        note,
        steps
      )
    );
  },

  onAddStep({ completedStatus, id, step, task_id }) {
    dispatch(addStep(completedStatus, id, step, task_id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItemContainer);
