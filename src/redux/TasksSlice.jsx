import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const getTasks = createAsyncThunk('boards/fetchBoards', async (id) => {
    const boards = await axios.get(`http://localhost:5000/api/boards/${id}/tasks`)
    return boards.data
})

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
            state.loading = false;
        })
        builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
            const { taskId, updatedData } = action.payload;
            const updatedTasks = state.tasks.map((task) =>
                task.task_id === taskId ? { ...task, ...updatedData } : task
            );
            state.tasks = updatedTasks;
            console.log(state.tasks,'before')
            state.loading = false;
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task) => task.task_id !== action.payload)
            state.loading = false;
        })
    }

});

export const { setSelectedTask } = TasksSlice.actions;
export default TasksSlice.reducer;