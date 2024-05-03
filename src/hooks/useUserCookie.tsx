import { useEffect, useState} from "react";
import { useCookies } from "react-cookie";

export function useUserCookie() {
    const [cookies] = useCookies(['user']);
    const [isUserCookiePresent, setIsUserCookiePresent] = useState(false);

    useEffect(() => {
        setIsUserCookiePresent(!!cookies.user);
    }, [cookies]);

    return isUserCookiePresent;
}

// export default useUserCookie();