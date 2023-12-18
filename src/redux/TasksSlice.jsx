import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const getTasks = createAsyncThunk('tasks/fetchTasks', async (id) => {
    const tasks = await axios.get(`http://localhost:5000/api/boards/${id}/tasks`)
    return tasks.data
})

export const addTask = createAsyncThunk('tasks/addTask', async ({boardId,newTaskData}, { dispatch }) => {
    try {
      console.log('new: ',newTaskData)
      const response = await axios.post(`http://localhost:5000/api/boards/${boardId}/tasks`, newTaskData);
  
      // Assuming your server returns the newly added task data, including its ID
      const newTask = response.data;
      console.log('after: ',newTask)
      
      // Dispatch another action to update the Redux state with the newly added task
      dispatch(addTToState(newTaskData));
  
      return newTask;
  
    } catch (error) {
      throw error;
    }
  })

  export const addTToState = (newTask) => ({
    type: 'tasks/addTaskToState',
    payload: newTask,
  });

export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async ({ boardId, taskId, status, name, description, due_date }) => {
    try {
        const payload = {};
        if (status) payload.status = status;
        if (name) payload.task_name = name;
        if (description) payload.description = description;
        if (due_date) payload.due_date = due_date;

        await axios.patch(`http://localhost:5000/api/boards/${boardId}/tasks/${taskId}`, { payload });
        return { taskId, updatedData: payload };
    } catch (error) {
        throw error;
    }
});

export const deleteTask = createAsyncThunk('dbtask/deleteTask', async ({ boardId, taskId }) => {
    try {
        await axios.delete(`http://localhost:5000/api/boards/${boardId}/tasks/${taskId}`);
        return taskId;
    } catch (error) {
        throw error;
    }
})


const TasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        selectedTask: null
    },
    reducers: {
        addTaskToState: (state, action) => {
            // Handle updating the state with the newly added board
            state.tasks.push(action.payload);
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.tasks = action.payload;
            console.log(state.tasks)
            state.loading = false;
        })
        builder.addCase(addTask.rejected, (state, action) => {
            console.log('error')
        })
        builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
            const { taskId, updatedData } = action.payload;
            const updatedTasks = state.tasks.map((task) =>
                task.task_id === taskId ? { ...task, ...updatedData } : task
            );
            state.tasks = updatedTasks;
            state.loading = false;
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task) => task.task_id !== action.payload)
            state.loading = false;
        })
    }

});

export const { addTaskToState,setSelectedTask } = TasksSlice.actions;
export default TasksSlice.reducer;