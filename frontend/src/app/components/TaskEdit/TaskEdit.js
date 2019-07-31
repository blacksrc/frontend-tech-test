import React, { useState, useEffect } from 'react';
import Task from '../../api/Task';
import Section from '../Section';
import { Input, Button } from '../Form';

const TaskEdit = ({ match, history }) => {
  const taskId = match.params.id || null;

  const [title, setTitle] = useState({ value: '', error: '' });
  const [description, setDescription] = useState({ value: '', error: '' });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await new Task().getTask(taskId);

      if (response.status === 200) {
        setTitle({ value: response.data.task.title, error: '' });
        setDescription({ value: response.data.task.description, error: '' });
      }
    };
    fetchTask();
  }, [taskId]);

  useEffect(() => {
    setIsDisabled(title.value === '' || description.value === '');
  }, [title, description]);

  const submitTask = async () => {
    setIsSubmiting(true);

    const response = await new Task().updateTask(taskId, title.value, description.value);
    if (response.status === 204) {
      setIsSubmiting(false);
      history.push(`/tasks/${taskId}`);
    }

    return true;
  };

  return (
    <Section>
      <Input
        defaultValue={title.value}
        onChange={value => setTitle({ value, error: value !== '' ? '' : 'Title cannot be empty.' })}
        error={title.error}
        id="task-title"
        label="Title"
        placeholder="Write task title here"
      />
      <Input
        defaultValue={description.value}
        type="textarea"
        onChange={value => setDescription({ value, error: value !== '' ? '' : 'Description cannot be empty.' })}
        error={description.error}
        id="task-description"
        label="Description"
        placeholder="Write task description here"
      />
      <Button
        type="primary"
        id="task-save"
        onClick={() => submitTask()}
        isSubmiting={isSubmiting}
        disabled={isDisabled}
      >
        Edit Task
      </Button>
    </Section>
  );
};

export default TaskEdit;
