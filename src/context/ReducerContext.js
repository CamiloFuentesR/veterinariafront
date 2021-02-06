export const reducerContext = async (state={} , action) => {
    const res = await state;
    console.log(res)

    switch (action.type) {
        case 'add':
            return [...state, action.payload];

        case 'delete':
            return state.filter(todo => todo.id !== action.payload);

        case 'update':
            //   return console.log(res)
               return  await res.find(todo =>todo._id === action.payload);
      
        default:
            return state;
    }

}