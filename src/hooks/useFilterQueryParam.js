import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { bloatFilters, flattenFilters } from "../helpers";

/**
 * A Custom hook to transform the filters when reading from or writing to query string
 *
 * @returns {Array} An array containing a reference to the value and a function to set the value
 */
const useFilterQueryParam = () => {
    const [filterParams, setFilterParams] = useSearchParams();
    const params = {};
  
    ["startDate", "endDate", "colOrder", "colVisible"].forEach((val) => {
      params[val] = filterParams.get(val);
    });
  
    const value = useMemo(() => bloatFilters(params), [params]);
  
    /**
     * Sets the new value to the search params
     *
     * @param {any} newValue
     * @param {{replace: boolean, state: any}} options
     *
     * @returns void
     */
    const setValue = useCallback(
      (newFilters, options) => {
        const _newFilters = flattenFilters(newFilters);
        setFilterParams(new URLSearchParams(_newFilters), options);
      },
      [filterParams, setFilterParams]
    );
  
    return [value, setValue];
  };

  export default useFilterQueryParam