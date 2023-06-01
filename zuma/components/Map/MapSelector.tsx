import Frog from "../Frog/Frog";
import styles from "../Map/Map.module.scss"
import React, { useState } from 'react';
export interface MapSelectorProps {
    maps: string[];
}

const MapSelector = ({ maps }:MapSelectorProps) => {
    const [selectedMap, setSelectedMap] = useState(maps[0]);

    const handleMapClick = (map: string) => {
        setSelectedMap(map);
    };

    return (
        <div className="map-selector">
            {maps.map((map, index) => (
                <div
                    key={index}
                    className={`map ${map}`}
                    onClick={() => handleMapClick(map)}
                >
                    {map}
                </div>
            ))}
        </div>
    );
};

export default MapSelector;