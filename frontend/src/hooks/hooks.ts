import { useEffect, useState } from "react"

// Custom hook to debounce a value
// T represents the type of the value being passed in
export const useDebounce = <T>(value: T, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set a timeout to update debouncedValue after the specified delay
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clear previous timeout when value or delay changes
        return () => clearTimeout(timeout); 
    }, [value, delay]);

     // Return the debounced value
    return debouncedValue;
}