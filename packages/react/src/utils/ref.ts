import { useRef } from "react";

export const generateRef = <T>(title?: string) => {
  const refObj = useRef<T>(null);

  return {
    refObj,
    extractElementFromRef: (throwErr = true): T | never => {
      const elm = refObj.current;
      if (!elm && throwErr === true) {
        const errorMessage = String.raw`Inject the ref object${
          title ? ": " + title + "," : ""
        } to the proper component`;

        throw new Error(errorMessage);
      }

      return elm as T;
    },
  };
};
