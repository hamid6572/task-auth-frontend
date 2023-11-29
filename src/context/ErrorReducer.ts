type ErrorAction = { type: 'SET_ERROR'; payload: string } | { type: 'CLEAR_ERROR' }

export const errorReducer = (state: string | null, action: ErrorAction): string | null => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.payload
    case 'CLEAR_ERROR':
      return null
    default:
      return state
  }
}
