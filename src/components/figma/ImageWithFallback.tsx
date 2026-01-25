import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

const LOADING_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0iI2Y3ZjdmNyI+PHJlY3Qgd2lkdGg9Ijg4IiBoZWlnaHQ9Ijg4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iI2FhYSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4K'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  lazy?: boolean;
  fallbackSrc?: string;
  quality?: number;
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldLoad, setShouldLoad] = useState(!props.lazy)
  const imgRef = useRef<HTMLImageElement>(null)

  // Lazy loading using Intersection Observer
  useEffect(() => {
    if (!props.lazy || shouldLoad) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' } // Start loading 50px before the image comes into view
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [props.lazy, shouldLoad])

  const handleError = useCallback(() => {
    setDidError(true)
    setIsLoading(false)
  }, [])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Optimize image URL with quality parameter if supported
  const optimizeImageUrl = useCallback((url: string, quality = 80) => {
    if (!url) return url
    
    // For Unsplash images, add quality parameter
    if (url.includes('unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?'
      return `${url}${separator}q=${quality}&fm=jpg&fit=crop&auto=format`
    }
    
    return url
  }, [])

  const { src, alt, style, className, lazy = false, fallbackSrc, quality = 80, ...rest } = props
  const optimizedSrc = optimizeImageUrl(src || '', quality)

  return (
    <div 
      ref={imgRef}
      className={`relative inline-block ${className ?? ''}`}
      style={style}
    >
      <AnimatePresence mode="wait">
        {!shouldLoad ? (
          // Placeholder for lazy loading
          <motion.div
            key="placeholder"
            className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
          </motion.div>
        ) : didError ? (
          // Error state
          <motion.div
            key="error"
            className="w-full h-full bg-gray-100 text-center flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <img 
                src={fallbackSrc || ERROR_IMG_SRC} 
                alt="Error loading image" 
                className="mx-auto mb-2 opacity-50"
                style={{ maxWidth: '48px', maxHeight: '48px' }}
              />
              <p className="text-xs text-gray-500">Failed to load image</p>
            </div>
          </motion.div>
        ) : (
          // Successful image load
          <div className="relative">
            {isLoading && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center z-10"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-6 h-6 rounded-full border-2 border-gray-300 border-t-primary"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            )}
            <motion.img
              src={optimizedSrc}
              alt={alt}
              className={className}
              style={style}
              onError={handleError}
              onLoad={handleLoad}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ 
                opacity: isLoading ? 0 : 1, 
                scale: 1
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.25, 0.25, 1]
              }}
              loading={lazy ? "lazy" : "eager"}
              decoding="async"
              {...rest}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
