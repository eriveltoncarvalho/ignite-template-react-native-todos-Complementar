import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export type EditTaskArgs ={
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) { 
    const taskExistes = tasks.find(item => item.title === newTaskTitle);
   
    if (taskExistes) {
      return Alert.alert('Task já cadastrada','Você não pode cadastrar uma task com o mesmo nome')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    
    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({ ...task }));

    const fountItem = updateTasks.find(task => task.id === id);

    if (!fountItem) {
     return;
    }

    fountItem.done = !fountItem.done;
    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'em certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updateTask = tasks.filter(task => task.id !==id);
  
          setTasks(updateTask);
        }
      } 
    ])   
  }

  function handleEditTask({ taskId, taskNewTitle} : EditTaskArgs){
    const updateTasks = tasks.map(task => ({ ...task })); 

    const taskUpdated = updateTasks.find(task => task.id === taskId);

    if (!taskUpdated) 
     return;
    
     taskUpdated.title = taskNewTitle;
     setTasks(updateTasks); 
  } 

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})