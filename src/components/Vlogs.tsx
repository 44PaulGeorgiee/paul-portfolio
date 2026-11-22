import { useState } from 'react'
import { ArrowUpRight, VideoCamera } from '@/components/slab'

const PLAYLISTS = [
  { id: 'journey', label: 'My Journey', description: 'Building an AI automation business' },
  { id: 'tutorials', label: 'Tutorials', description: 'Tips, walkthroughs, and how-tos' },
  { id: 'builds', label: 'Experiments & Builds', description: 'Things I am testing and creating' },
] as const

type PlaylistId = (typeof PLAYLISTS)[number]['id']

export default function Vlogs() {
  const [activePlaylist, setActivePlaylist] = useState<PlaylistId>('journey')
  const hasJourneyVideo = activePlaylist === 'journey'

  return (
    <section className="pgrid vlogs" aria-labelledby="vlogs-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">The journey, in progress</span>
        <h1 className="pgrid__title" id="vlogs-title">
          My journey building an AI automation business.
        </h1>
        <p className="pgrid__lede">
          A growing library of honest updates, lessons, and experiments as I learn and build.
        </p>
      </header>

      <div className="home__glass vlogs__glass">
        <nav className="vlogs__playlists" aria-label="Video playlists">
          <span className="vlogs__playlist-label">Playlists</span>
          {PLAYLISTS.map((playlist) => (
            <button
              key={playlist.id}
              type="button"
              className="vlogs__playlist"
              data-active={activePlaylist === playlist.id}
              aria-current={activePlaylist === playlist.id ? 'true' : undefined}
              aria-controls="vlogs-playlist-content"
              onClick={() => setActivePlaylist(playlist.id)}
            >
              <span className="vlogs__playlist-icon">
                <VideoCamera size={17} weight="duotone" aria-hidden="true" />
              </span>
              <span className="vlogs__playlist-copy">
                <span className="vlogs__playlist-name">{playlist.label}</span>
                <span className="vlogs__playlist-description">{playlist.description}</span>
              </span>
              <span className="vlogs__playlist-count" aria-label={hasJourneyVideo && playlist.id === 'journey' ? '1 video' : '0 videos'}>
                {playlist.id === 'journey' ? '01' : '00'}
              </span>
            </button>
          ))}
        </nav>

        <div className="vlogs__content" id="vlogs-playlist-content" aria-live="polite">
          <header className="vlogs__content-head">
            <div>
              <span className="vlogs__eyebrow">Video library</span>
              <h2>{PLAYLISTS.find((playlist) => playlist.id === activePlaylist)?.label}</h2>
            </div>
            <span className="vlogs__content-count">{hasJourneyVideo ? '1 video' : 'No videos yet'}</span>
          </header>

          {hasJourneyVideo ? (
            <article className="vlogs__episode">
              <div className="vlogs__player">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/pMqr7xk6BCs"
                  title="My Journey Building an AI Automation Business"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <div className="vlogs__details">
                <span className="vlogs__eyebrow">
                  <VideoCamera size={16} weight="fill" aria-hidden="true" />
                  Journey vlog · 01
                </span>
                <h3>Building an AI automation business</h3>
                <p>
                  Follow along as I develop my skills, explore AI automation, and work toward building a business around it.
                </p>
                <a
                  className="vlogs__youtube"
                  href="https://youtu.be/pMqr7xk6BCs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open video on YouTube
                  <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </article>
          ) : (
            <div className="vlogs__empty">
              <span className="vlogs__empty-icon">
                <VideoCamera size={26} weight="duotone" aria-hidden="true" />
              </span>
              <h3>This playlist is ready for its first video.</h3>
              <p>New tutorials and build experiments will appear here as the library grows.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
