import { useState, useEffect, RefObject } from 'react';

type EventListener = (event: MouseEvent) => void;

export const useOutsideClickClose = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void
): void => {
  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, handler]);
};

