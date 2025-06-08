"use client"

import * as React from "react"

interface Toast {
    id: string
    message: string
    type: "success" | "error" | "warning" | "info"
    duration?: number
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = Toast & {
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
}

const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER
    return count.toString()
}

type ActionType = typeof actionTypes

type Action =
    | {
    type: ActionType["ADD_TOAST"]
    toast: ToasterToast
}
    | {
    type: ActionType["UPDATE_TOAST"]
    toast: Partial<ToasterToast>
}
    | {
    type: ActionType["DISMISS_TOAST"]
    toastId?: ToasterToast["id"]
}
    | {
    type: ActionType["REMOVE_TOAST"]
    toastId?: ToasterToast["id"]
}

interface State {
    toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
    if (toastTimeouts.has(toastId)) {
        return
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId)
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId,
        })
    }, TOAST_REMOVE_DELAY)

    toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            }

        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
            }

        case "DISMISS_TOAST": {
            const { toastId } = action

            // ! Side effects ! - This could be extracted into a dismissToast() action,
            // but I'll keep it here for simplicity
            if (toastId) {
                addToRemoveQueue(toastId)
            } else {
                state.toasts.forEach((toast) => {
                    addToRemoveQueue(toast.id)
                })
            }

            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === toastId || toastId === undefined
                        ? {
                            ...t,
                            open: false,
                        }
                        : t,
                ),
            }
        }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: [],
                }
            }
            return {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== action.toastId),
            }
    }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
    memoryState = reducer(memoryState, action)
    listeners.forEach((listener) => {
        listener(memoryState)
    })
}

function useToast() {
    const [state, setState] = React.useState<State>(memoryState)

    const addToast = React.useCallback((toast: Omit<ToasterToast, "id">) => {
        const id = genId()
        dispatch({
            type: "ADD_TOAST",
            toast: {
                ...toast,
                id,
                open: true,
                onOpenChange: (open) => {
                    if (!open) dispatch({ type: "DISMISS_TOAST", toastId: id })
                },
            },
        })
    }, [])

    const removeToast = React.useCallback((id: string) => {
        dispatch({ type: "REMOVE_TOAST", toastId: id })
    }, [])

    const success = React.useCallback(
        (message: string, duration?: number) => {
            addToast({ message, type: "success", duration })
        },
        [addToast],
    )

    const error = React.useCallback(
        (message: string, duration?: number) => {
            addToast({ message, type: "error", duration })
        },
        [addToast],
    )

    const warning = React.useCallback(
        (message: string, duration?: number) => {
            addToast({ message, type: "warning", duration })
        },
        [addToast],
    )

    const info = React.useCallback(
        (message: string, duration?: number) => {
            addToast({ message, type: "info", duration })
        },
        [addToast],
    )

    React.useEffect(() => {
        listeners.push(setState)
        return () => {
            const index = listeners.indexOf(setState)
            if (index > -1) {
                listeners.splice(index, 1)
            }
        }
    }, [state])

    return {
        ...state,
        success,
        error,
        warning,
        info,
        removeToast,
    }
}

export { useToast }
