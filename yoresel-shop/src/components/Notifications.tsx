import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState, AppDispatch } from '../store'
import { clearNotification } from '../slices/uiSlice'

export default function Notifications() {
    const notification = useSelector((s: RootState) => s.ui.notification)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        if (!notification) return
        const t = setTimeout(() => dispatch(clearNotification()), 3500)
        return () => clearTimeout(t)
    }, [notification, dispatch])

    if (!notification) return null

    const color = notification.type === 'success' ? 'green' : notification.type === 'error' ? 'red' : 'blue'

    const handleClose = () => dispatch(clearNotification())

    const handleAction = (e?: React.MouseEvent) => {
        if (e) e.preventDefault()
        if (notification?.actionUrl) {
            // navigate within the app (SPA)
            try {
                navigate(notification.actionUrl)
            } catch {
                // fallback to full navigation
                window.location.href = notification.actionUrl
            }
        }
        dispatch(clearNotification())
    }

    return (
        <div className="fixed top-6 right-6 z-[9999]">
            <div className="max-w-xs w-full shadow-lg rounded-lg overflow-hidden flex bg-white">
                {/* left colored stripe */}
                <div className={`w-1.5 ${color === 'green' ? 'bg-green-500' : color === 'red' ? 'bg-red-500' : 'bg-blue-500'}`} />

                <div className="flex-1 px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2">
                                {/* success icon */}
                                {notification.type === 'success' && (
                                    <svg className="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
                                <div className="text-sm font-medium text-gray-900">{notification.title ?? (notification.type === 'success' ? 'Ürün sepete eklendi' : 'Bilgi')}</div>
                            </div>
                            {notification.message && <div className="mt-1 text-sm text-gray-700">{notification.message}</div>}
                        </div>

                        <div className="flex items-start gap-2">
                            {notification.actionLabel && notification.actionUrl && (
                                <button onClick={handleAction} className="text-sm font-semibold text-green-600 hover:underline">
                                    {notification.actionLabel}
                                </button>
                            )}

                            <button onClick={handleClose} aria-label="Kapat" className="text-gray-400 hover:text-gray-600">
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
