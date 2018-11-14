export default {
    laterAdd (context, n) {
        setTimeout(() => {
            context.commit('increment', n);
        },1000);
    },
    promiseAdd ({commit}, n) {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                commit('increment', n);
                resolve();
            },1000)
        })
    }
}