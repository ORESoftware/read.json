'use strict';

export type EVCb<T, E = any> = (err: E, val?: T) => void;

export const r2gSmokeTest = function () {
  return true;
};
