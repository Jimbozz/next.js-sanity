'use client'
import React, { useEffect, useRef, useState } from 'react'

interface DynamicIframeProps {
  iframeLink: string
  header: string
}
export default function EmbeddedIframe({
  iframeLink,
  header,
}: DynamicIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [iframeHeight, setIframeHeight] = useState<string>('0px')

  useEffect(() => {
    // Function to handle messages from iframe
    const handleIframeMessage = (event: MessageEvent) => {
      if (iframeRef.current && typeof event.data === 'string') {
        // Check if the message is in the expected format
        const messagePrefix = 'resize::'
        if (event.data.startsWith(messagePrefix)) {
          // Extract the height value after the 'resize::' prefix
          const height = event.data.split('::')[1]
          if (height && height !== iframeHeight) {
            setIframeHeight(height)
          }
        }
      }
    }
    window.addEventListener('message', handleIframeMessage)

    return () => {
      window.removeEventListener('message', handleIframeMessage)
    }
  }, [iframeHeight])

  return (
    <section className="mt-12" style={{ height: `${iframeHeight}px` }}>
      <iframe
        ref={iframeRef}
        src={iframeLink}
        className="w-full"
        title={header}
        loading="lazy"
        height="100%"
      ></iframe>
    </section>
  )
}
