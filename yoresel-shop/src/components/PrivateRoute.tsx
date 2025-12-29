import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import type { RootState } from '../store'

export default function PrivateRoute({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
    const { isAuthenticated, user } = useSelector((s: RootState) => s.auth)
    const location = useLocation()

    if (!isAuthenticated) {
        // Redirect to login, preserve where user wanted to go
        return <Navigate to="/giris" state={{ from: location }} replace />
    }

    if (requireAdmin && user?.role !== 'admin') {
        // If user is logged in but not admin, redirect to home
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
