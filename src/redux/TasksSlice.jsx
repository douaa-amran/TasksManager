import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const getTasks = createAsyncThunk('boards/fetchBoards', async (id) => {
    console.log(id)
    const boards = await axios.get(`http://localhost:5000/api/boards/${id}/tasks`)
    return boards.data
})

export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async ({ boardId, taskId, status }) => {
    try {
        await axios.patch(`http://localhost:5000/api/boards/${boardId}/tasks/${taskId}`, { status });
        return { taskId, updatedData: { status } };
    } catch (error) {
        throw error;
    }
});

export const deleteTask = createAsyncThunk('dbtask/deleteTask', async ({boardId, taskId}) => {
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
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
        })
        builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
            const { taskId, updatedData: { status } } = action.payload;
            state.tasks = state.tasks.map((task) =>
                task.task_id === taskId ? { ...task, status } : task
            )
            state.loading = false;
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task)=> task.id_task !== action.payload)
            state.loading = false;
        })
    }

});

export const { } = TasksSlice.actions;
export default TasksSlice.reducer;