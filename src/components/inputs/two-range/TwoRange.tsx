import React, {ChangeEventHandler, useState} from 'react';
import './two-range.scss'

const TwoWayRange = () => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [currentValue, setCurrentValue] = useState(50);

    const handleMinChange = (event: any) => {
        const element = event.target as HTMLInputElement
        if (element) {
            const value = parseInt(element.value);
            setMinValue(value);
            if (value > currentValue) setCurrentValue(value);
        }

    };

    const handleMaxChange = (event: any) => {
        const value = parseInt(event.target.value);
        setMaxValue(value);
        if (value < currentValue) setCurrentValue(value);
    };

    const handleRangeChange = (event: any) => {
        setCurrentValue(parseInt(event.target.value));
    };

    return (
        <div>
            <input
                type="range"
                min={minValue}
                max={maxValue}
                step="1"
                value={currentValue}
                onChange={handleRangeChange}
                className="custom-range"
            />
            <div>
                <span>Min: {minValue}</span>
                <input type="number" value={minValue} onChange={handleMinChange} />
            </div>
            <div>
                <span>Max: {maxValue}</span>
                <input type="number" value={maxValue} onChange={handleMaxChange} />
            </div>
            <div>
                <span>Current: {currentValue}</span>
            </div>
        </div>
    );
};

export default TwoWayRange;