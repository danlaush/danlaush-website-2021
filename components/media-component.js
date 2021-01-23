import React from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'

import styles from './media-component.module.css'

export default class MediaComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      transitioning: false,
      aspectRatioAsPercent: this.getAspectRatioAsPercent(props),
    }
  }

  toggleExpanded() {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }))
  }

  toggleTransitioning() {
    this.setState(prevState => ({
      transitioning: !prevState.transitioning,
    }))
  }

  getAspectRatioAsPercent(props) {
    if (props.img600) {
      const width = props.img600.width
      const height = props.img600.height

      const aspectRatio = Math.round((height / width) * 100)
      return `${aspectRatio}%`
    }
    return null
  }

  render() {
    if (
      this.props.file.contentType === 'image/png' ||
      this.props.file.contentType === 'image/jpeg' ||
      this.props.file.contentType === 'image/gif'
    ) {
      let imageAttrs
      if (this.state.expanded) {
        imageAttrs = {
          src: this.props.img2000.src,
          width: this.props.img2000.width / 2,
          height: this.props.img2000.height / 2,
        }
      } else {
        imageAttrs = {
          src: this.props.img600.src,
          width: this.props.img600.width / 2,
          height: this.props.img600.height / 2,
        }
      }
      return (
        <div
          className={styles.mediaContainer}
          style={{
            paddingTop: this.state.aspectRatioAsPercent,
          }}
        >
          <Flipper flipKey={this.state.expanded}>
            <Flipped
              flipId="image"
              onStart={this.toggleTransitioning.bind(this)}
              onComplete={this.toggleTransitioning.bind(this)}
            >
              <div
                className={`
                  ${styles.media}
                  ${this.state.expanded ? styles.isExpanded : ''}
                  ${this.state.transitioning ? styles.isTransitioning : ''}
                `}
              >
                <Flipped
                  scale
                  inverseFlipId="image"
                  transformOrigin="center center"
                >
                  <img
                    {...imageAttrs}
                    alt={this.props.description}
                    onClick={this.toggleExpanded.bind(this)}
                    className={styles.mediaAsset}
                  />
                </Flipped>
              </div>
            </Flipped>
          </Flipper>
        </div>
      )
    } else if (this.props.file.contentType === 'video/mp4') {
      return (
        <div className={`${styles.media} ${styles.video}`}>
          <video
            autoPlay
            muted
            controls
            width={this.props.width}
            height={this.props.height}
            alt={this.props.description}
          >
            <source src={this.props.file.url} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
      )
    } else {
      return <p>dunno what</p>
    }
  }
}
