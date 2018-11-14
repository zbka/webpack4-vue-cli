export default {
    doneTodosCount (state) {
        return state.todos.filter( todo => todo.done );
    },
    doneTodosCountLength (state, getter) {
        return getter.doneTodosCount.length;
    }
}