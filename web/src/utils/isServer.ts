// Are we on the server or not, i.e Check if 'window' variable is defined.
// undefined -> we're in the server

export const isServer = () => typeof window === 'undefined';