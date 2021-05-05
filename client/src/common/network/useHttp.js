import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import isEmpty from "../components/validation/is-empty";
export default function useHttp(
  factory,
  onSuccess,
  onFailure,
  onComplete
) {
  const [data, setData] = useState({
    running: false,
    params: undefined,
  });

  const subscription = useRef(undefined);

  const unsubscribe = useCallback(() => {
    if (subscription.current) {
      const {current} = subscription;
      current.unsubscribe();
      subscription.current = undefined;
    }
  }, [subscription]);

  useEffect(() => {
    if (data?.running === true) {
      subscription.current = factory(data?.params).subscribe({
        next: (result) => onSuccess(result),
        error: (throwable) => {
          setData(({params}) => ({
            running: false,
            params,
          }));
          onFailure(throwable);
        },
        complete: () => {
          setData(({params}) => ({
            running: false,
            params,
          }));
          if (!isEmpty(onComplete)) {
            onComplete();
          }
        },
      });
    } else {
      unsubscribe();
    }

    return () => {
      unsubscribe();
    };
  }, [
    data,
    setData,
    factory,
    subscription,
    unsubscribe,
    onSuccess,
    onFailure,
    onComplete,
  ]);

  const isRunning = useMemo(() => data?.running, [data]);
  const setIsRunning = useCallback(
    (status, params) => {
      setData({
        running: status,
        params,
      });
    },
    [setData]
  );
  return [isRunning, setIsRunning];
}
