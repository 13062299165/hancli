import create from 'zustand'
const useStore = create(set => ({
    votes: 0,
    addVotes: () => set(state => ({ votes: state.votes + 1 })),
    subtractVotes: () => set(state => ({ votes: state.votes - 1 })),
}));
export default useStore;