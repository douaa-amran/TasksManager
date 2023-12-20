import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const getBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const boards = await axios.get('http://localhost:5000/api/boards')
  return boards.data
})

export const addBoard = createAsyncThunk('boards/addBoard', async (newBoardData, { dispatch }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/boards', newBoardData);

    // Assuming your server returns the newly added board data, including its ID
    
    const newBoardId = {'$oid':response.data.board_id};
    console.log('new',newBoardId)
    // Dispatch another action to update the Redux state with the newly added board
    dispatch(addBToState({ ...newBoardData, _id: newBoardId }));

    return newBoardId;

  } catch (error) {
    throw error;
  }
})

export const addBToState = (newBoard) => ({
  type: 'boards/addBoardToState',
  payload: newBoard,
});

export const deleteBoard = createAsyncThunk('dboards/deleteBoard', async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/boards/${id?.$oid}`);
    return id.$oid;
  } catch (error) {
    throw error;
  }
})

export const updateBoard = createAsyncThunk('uboards/updateBoard', async ({ id, newName }) => {
  try {
    await axios.patch(`http://localhost:5000/api/boards/${id.$oid}`, { board_name: newName }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return { id: id.$oid, updatedData: { board_name: newName } };
  } catch (error) {
    throw error;
  }
})

const BoardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
    loading: false,
    selectedBoard: null
  },
  reducers: {
    addBoardToState: (state, action) => {
      // Handle updating the state with the newly added board
      state.boards.push(action.payload);
    },
    setSelectedBoard: (state, action) => {
      state.selectedBoard = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
      state.loading = false;
    })
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      state.boards = state.boards.filter((board) => board._id?.$oid !== action.payload);
    })
    builder.addCase(updateBoard.fulfilled, (state, action) => {
      state.boards = state.boards.map((board) => board._id.$oid === action.payload.id
        ? { ...board, ...action.payload.updatedData }
        : board);
    })
  }

});

export const { addBoardToState, setSelectedBoard } = BoardsSlice.actions;
export default BoardsSlice.reducer;