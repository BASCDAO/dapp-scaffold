import { FC, useEffect, useState } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

export const BasicsView: FC = ({ }) => {

/*const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';*/
const MAPBOX_TOKEN ="pk.eyJ1IjoiZXh4ZW1wdCIsImEiOiJjbDI4Nm85ZW8wNmcwM2RvMXNtYnVncWN5In0.IvpgiphMkVw3Nlw8ynLoSQ"
const initialState = {
    viewport: {
      latitude: 8.950357,
      longitude: -20.604661,
      position: "absolute",
      width: "100vw",
      height: "100vh",
      zoom: 2.23,
    },
};
type State = typeof initialState;
type Viewport = typeof initialState.viewport;

export default class Map extends React.Component<{}, State> {
    public state: State = initialState;

    public componentDidMount() {
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    public updateViewport = (viewport: Viewport) => {
        this.setState(prevState => ({
            viewport: { ...prevState.viewport, ...viewport },
        }));
    };

    public resize = () => {
        this.setState(prevState => ({
            viewport: {
                ...prevState.viewport,
                height: window.innerHeight,
                width: window.innerWidth,
            },
        }));
    };

    public render() {
        const { viewport } = this.state;
        return (
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/exxempt/cl3klweqn001m14p0qfc9jpcr"
                onViewportChange={(v: Viewport) => this.updateViewport(v)}
            >
                <div style={{ position: 'absolute', right: 30, bottom: 30 }}>
                    <NavigationControl onViewportChange={this.updateViewport} />
                </div>
            </ReactMapGL>
        );
    }
}
};