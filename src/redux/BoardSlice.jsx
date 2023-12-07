import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const getBoards = createAsyncThunk('boards/fetchBoards', async () => {
    const boards = await axios.get('http://localhost:5000/api/boards')
    return boards.data
})

export const deleteBoard = createAsyncThunk('dboards/deleteBoard', async (id) => {
    try {
        await axios.delete('http://localhost:5000/api/boards/'+id);
        return id;
      } catch (error) {
        throw error;
      }
})

const BoardsSlice = createSlice({
    name: 'boards',
    initialState: {
        boards: [],
        loading:false
    },
    reducers: {
        ajouter: (state, action) => {
            state.boards=[...state.boards, action.payload]
        },
        supprimertous: (state, action) => {
            state.boards = []
        },
        supprimercom: (state, action) => {
            state.boards=state.boards.filter(board => board.completed === false);
        },
        supprimernonco: (state, action) => {
            state.boards=state.boards.filter(board => board.completed === true);
        },
        valider: (state, action) => {
            state.boards=state.boards.map(board =>
                board.id === action.payload ? { ...board, completed: !board.completed } : board)
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(getBoards.pending, (state,action) =>{
            state.loading = true;
        })
        builder.addCase(getBoards.fulfilled, (state,action) =>{
            state.boards = action.payload;
            state.loading = false;
        })
        builder.addCase(deleteBoard.fulfilled, (state, action) => {
            state.boards = state.boards.filter((board) => board._id !== action.payload);
        })
    }

});

export const {ajouter,modifier,supprimer,supprimertous,supprimercom,supprimernonco,valider} = BoardsSlice.actions;
export default BoardsSlice.reducer;