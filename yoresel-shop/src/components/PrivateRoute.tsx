import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import type { RootState } from '../store'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated)
    const location = useLocation()

    if (!isAuthenticated) {
        // Redirect to login, preserve where user wanted to go
        return <Navigate to="/giris" state={{ from: location }} replace />
    }

    return <>{children}</>
}
