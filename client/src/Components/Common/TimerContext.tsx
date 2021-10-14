import React, { createContext, Dispatch, useState, useEffect, useReducer } from 'react';
import { useStateContext, useDispatchContext } from './UserInfoContext';
import { useMutation } from '@apollo/react-hooks'
import { getCookie, removeCookie, setCookie } from '../Auth/Cookis';
import { LOGOUT } from '../../Database/Graphql';
import { useCallback } from 'react';

type State = {
    time: number;
}
const timerStateContext = createContext<State | void>(undefined)

type Action = { type: 'TIMER_START' } | { type: 'TIMER_RESET' }
type IDispatch = Dispatch<Action>
const timerDispatchContext = createContext<IDispatch | any>(undefined);

const TimerProvider = ({ children }: { children: React.ReactNode }) => {

    const state = useStateContext();
    const dispatch = useDispatchContext();
    const [isIncrease, setIsIncrease] = useState(false)
    const [value, setValue] = useState<number>(getCookie('timer'));
    const [removeRefreshToken] = useMutation(LOGOUT, { variables: { id: state.id } })

    let tick: NodeJS.Timeout =
        setTimeout(() => setValue(value - 1), 1000)

    const logout = useCallback(() => {
        setIsIncrease(false)
        removeCookie('timer')
        clearTimeout(tick)
        removeCookie('refreshToken')
        removeRefreshToken()
        dispatch({ type: 'REMOVE_USER' })
        window.location.replace("/")
    }, [dispatch, removeRefreshToken, tick])
    //타이머 작업선택
    useEffect(() => {
        if (!isIncrease) return undefined;
        if (value) {
            if (value > 0 && isIncrease) {
                setTimeout(() => tick)
                setCookie('timer', value)
            }

            if (value <= 0) {
                logout();
            }
        }

        return () => clearTimeout(tick);
    }, [value, isIncrease, tick, logout])

    const reducer = (state: any, action: Action): void => {
        switch (action.type) {
            case 'TIMER_START':
                if (getCookie('timer')) {
                    setIsIncrease(true)
                    setValue(Number(getCookie('timer')))
                }
                break;
            case 'TIMER_RESET':
                logout();
                break;
            default:
                throw new Error();
        }

    }
    const [timerstate, timerdispatch] = useReducer(reducer, undefined)

    return (
        <timerDispatchContext.Provider value={timerdispatch}>
            <timerStateContext.Provider value={timerstate}>
                {children}
            </timerStateContext.Provider>
        </timerDispatchContext.Provider>
    )
}
export { TimerProvider, timerDispatchContext }