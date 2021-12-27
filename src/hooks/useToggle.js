import { useState } from "react";

const useToggle = (initial) => {
    const [isToggled, setToggled] = useState(initial);

    const toggle = () => {
        setToggled(!isToggled);
    }

    return [isToggled, toggle];
}

export default useToggle;