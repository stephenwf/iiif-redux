import React, { Component } from 'react';
import { connect } from 'react-redux';
import { canvasByIdSelector } from 'iiif-redux/es/api/canvas';
import { Spin, Radio } from 'antd';

class ImageService extends Component {
  state = { service: null, error: null, setSize: 'none', clickThrough: false };
  componentWillMount() {
    this.loadImageService(this.props.thumbnail, this.props.imageService);
  }

  componentWillReceiveProps(newProps) {
    if (
      this.props.thumbnail !== newProps.thumbnail ||
      this.props.imageService !== newProps.imageService
    ) {
      this.loadImageService(newProps.thumbnail, newProps.imageService);
    }
  }

  loadImageService(thumbnail, imageService) {
    fetch(`${imageService['@id']}/info.json`)
      .then(r => r.json())
      .then(service => {
        const profileObject = service.profile.find(
          prof => typeof prof !== 'string'
        );
        console.log(service);
        this.setState({
          service,
          format: profileObject.formats[0],
          quality: profileObject.qualities[0],
          tile: service.tiles[0].height || service.tiles[0].width,
          scaleFactor: service.tiles[0].scaleFactors[0],
          // error: service.tiles[0].scaleFactor[0] || 1,
        });
      })
      .catch(err => {
        this.setState({
          service: null,
          error: 'Something went wrong requesting image service',
        });
      });
  }

  getImage = () => {
    const { service, format, quality, tile, scaleFactor, setSize } = this.state;

    if (setSize !== 'none') {
      const realSize = service.sizes[setSize];
      return (
        <img
          src={`${service['@id']}/full/${realSize.width},${
            realSize.height
          }/0/${quality}.${format}`}
        />
      );
    }

    const rotation = '0';
    const currentTile = service.tiles.find(
      t => t.height === tile || t.width === tile
    );

    const makeTile = (currentService, ratio, x, y) =>
      `${currentService.width / ratio * x},${service.height /
        ratio *
        y},${currentService.width / scaleFactor},${currentService.height /
        scaleFactor}`;

    const makeImage = region =>
      `${service['@id']}/${region}/${currentTile.width},${
        currentTile.height
      }/${rotation}/${quality}.${format}`;

    if (scaleFactor === 1) {
      return <img src={makeImage('full')} />;
    }

    const map = [];
    for (let y = 0; y < scaleFactor; y++) {
      for (let x = 0; x < scaleFactor; x++) {
        map.push(makeImage(makeTile(service, scaleFactor, x, y)));
      }
    }
    return (
      <div>
        {map.map(src => (
          <img src={src} style={{ width: `${100 / scaleFactor}%` }} />
        ))}
      </div>
    );
  };

  onChange = value => e => {
    this.setState({
      [value]: e.target.value,
    });
  };

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const radioContainer = {
      marginBottom: '10px',
    };

    const { error, service } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    if (!service) {
      return <Spin />;
    }

    const profileObject = service.profile.find(
      prof => typeof prof !== 'string'
    );

    const clickThrough = (service.service || []).find(
      serv => serv.profile === 'http://iiif.io/api/auth/0/login/clickthrough'
    );

    if (clickThrough && this.state.clickThrough === false) {
      return (
        <div>
          <h4>{clickThrough.label}</h4>
          <span
            dangerouslySetInnerHTML={{ __html: clickThrough.description }}
          />
          <a
            onClick={() => this.setState({ clickThrough: true })}
            href={`${clickThrough['@id']}?origin=${window.location.host}`}
            target="_blank"
          >
            Agree and continue
          </a>
        </div>
      );
    }

    return (
      <div>
        <h3>Formats</h3>
        <Radio.Group
          onChange={this.onChange('format')}
          value={this.state.format}
          style={radioContainer}
        >
          {(profileObject.formats || ['jpg']).map(format => (
            <Radio style={radioStyle} value={format}>
              {format}
            </Radio>
          ))}
        </Radio.Group>

        <h3>Qualities</h3>
        <Radio.Group
          onChange={this.onChange('quality')}
          value={this.state.quality}
          style={radioContainer}
        >
          {(profileObject.qualities || ['jpg']).map(quality => (
            <Radio style={radioStyle} value={quality}>
              {quality}
            </Radio>
          ))}
        </Radio.Group>

        {service.sizes ? (
          <div>
            <h3>Preset sizes</h3>
            <Radio.Group
              onChange={this.onChange('setSize')}
              value={this.state.setSize}
              style={radioContainer}
            >
              <Radio style={radioStyle} value={'none'}>
                None
              </Radio>
              {(service.sizes || []).map((quality, n) => (
                <Radio style={radioStyle} value={n}>
                  {quality.width} x {quality.height}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        ) : (
          <div>No preset sizes</div>
        )}

        <h3>Tiles</h3>
        <Radio.Group
          style={{ border: '1px solid #eee', width: '100%', padding: 20 }}
          onChange={this.onChange('tile')}
          value={this.state.tile}
        >
          {(service.tiles || []).map(tile => (
            <div>
              <Radio
                style={{ ...radioContainer, ...radioStyle }}
                value={tile.width || tile.height}
              >
                Tile at {tile.width || tile.height}px
              </Radio>
              <h4>Scale factor</h4>
              <Radio.Group
                onChange={this.onChange('scaleFactor')}
                value={this.state.scaleFactor}
                style={radioContainer}
              >
                {(tile.scaleFactors || [1]).map(scale => (
                  <Radio style={radioStyle} value={scale}>
                    {scale}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          ))}
        </Radio.Group>
        {this.getImage()}
      </div>
    );
  }
}

export default connect(
  canvasByIdSelector(api => ({
    thumbnail: api.getThumbnail,
    imageService: api.getImageService,
  }))
)(ImageService);
