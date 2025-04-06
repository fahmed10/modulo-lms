import { useEffect, useState } from "react";
import { AxiosResponse } from "axios"

export default function useAxiosData<T>(apiFunction: () => Promise<AxiosResponse<T>>, initialValue?: T, onLoad?: (data: T) => void): [T, boolean, React.Dispatch<React.SetStateAction<T>>] {
    const [data, setData] = useState<T>(initialValue!);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        (async () => {
            const currentData = (await apiFunction()).data;
            setData(currentData);
            setStatus(true);
            onLoad?.(currentData);
        })();
    }, []);

    return [data, status, setData];
}