"use client";

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number.parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
        {...props}
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Slider;
