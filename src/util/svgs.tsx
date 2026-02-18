import React from 'react';

export const getRightSvg = (className = 'inline') => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={className} width="1em" height="1em" >
    <path fill="currentColor" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clipRule="evenodd" > </path>
  </svg>
);

export const getWrongSvg = (className = 'inline') => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={className} width="1em" height="1em" >
    <path fill="currentColor" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06" clipRule="evenodd" > </path>
  </svg>
);

export const getWikiSvg = (className = 'mr-1 inline') => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path fill="currentColor" d="M8.387 5.08a10 10 0 0 0-.5-.745A6.97 6.97 0 0 1 12 3c1.32 0 2.555.365 3.608 1q-.022.134-.066.303c-.106.399-.272.78-.413 1.002-.049.077-.25.273-.613.544-.162.12-.341.231-.556.36l-.074.043c-.187.112-.402.24-.609.382-.488.334-.996.786-1.338 1.517a2.1 2.1 0 0 0-.12 1.456c.035.135.054.27.055.39 0 .037-.015.096-.097.165a.52.52 0 0 1-.327.118c-1.077-.012-1.927-.904-2.05-2.327-.094-1.082-.536-2.084-1.013-2.874M16.652 14.509q.396-.005.745-.05a7 7 0 0 1-3.418 2.257c-.046-.381-.016-.84.209-1.263.192-.362.678-.633 1.334-.794a5.5 5.5 0 0 1 1.109-.15h.021"></path>
    <path fill="currentColor" d="M5 10c0-1.72.62-3.294 1.648-4.512q.154.215.301.46c.402.664.713 1.416.777 2.15.17 1.97 1.481 3.837 3.705 3.862.961.01 2.126-.712 2.123-1.968 0-.287-.046-.567-.112-.815a.44.44 0 0 1 .019-.315c.17-.364.422-.607.766-.842.16-.11.326-.21.518-.324l.077-.046c.216-.129.461-.278.698-.454.345-.257.79-.618 1.027-.99.187-.294.36-.671.494-1.063A6.98 6.98 0 0 1 19 10q-.002.799-.172 1.55c-.067.199-.151.385-.303.582-.237.307-.712.685-1.89.697h-.036l-.096.003a7.134 7.134 0 0 0-1.382.195c-.759.186-1.871.61-2.417 1.639-.43.811-.48 1.645-.382 2.327A7.003 7.003 0 0 1 5 10"></path>
    <path fill="currentColor" fillRule="evenodd" d="M18.004 1.5a.75.75 0 0 1 1.058-.059 11.04 11.04 0 0 1 3.688 8.246c0 5.751-4.389 10.478-10 11.013v.55H14a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1 0-1.5h1.25v-.509a11.04 11.04 0 0 1-7.809-3.678.75.75 0 1 1 1.118-1 9.54 9.54 0 0 0 7.128 3.187 9.563 9.563 0 0 0 9.563-9.563 9.54 9.54 0 0 0-3.188-7.128.75.75 0 0 1-.059-1.06" clipRule="evenodd"></path>
  </svg>
);

export const getGuessPencilSvg = (className = 'inline') => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path fill="currentColor" d="m11.4 18.161 7.396-7.396a10.3 10.3 0 0 1-3.326-2.234 10.3 10.3 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.6 6.6 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56q.647-.308 1.211-.749c.318-.248.607-.537 1.184-1.114M20.848 8.713a3.932 3.932 0 0 0-5.561-5.561l-.887.887.038.111a8.75 8.75 0 0 0 2.092 3.32 8.75 8.75 0 0 0 3.431 2.13z"></path>
  </svg>
);

export const getCategoriesSvg = (className = 'inline') => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path fill="currentColor" fillRule="evenodd" d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828S16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M7.25 8A.75.75 0 0 1 8 7.25h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8m0 4a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75M8 15.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z" clipRule="evenodd"></path>
  </svg>
);

export const getPeopleSvg = (className = 'inline') => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <circle cx="9.001" cy="6" r="4" fill="currentColor"></circle>
    <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4"></ellipse>
    <path fill="currentColor" d="M21 17c0 1.657-2.036 3-4.521 3 .732-.8 1.236-1.805 1.236-2.998 0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17M18 6a3 3 0 0 1-4.029 2.82A5.7 5.7 0 0 0 14.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0 1 18 6.001"></path>
  </svg>
);

export const getCameraSvg = (className = 'inline') => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path fill="currentColor" fillRule="evenodd" d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.4 4.4 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697s0-4.597-.749-5.697a4.4 4.4 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636-.129.635-.696 1.125-1.355 1.125-1.38.06-2.282.23-3.003.702A4.4 4.4 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364s0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21M12 9.273c-2.301 0-4.167 1.831-4.167 4.09S9.7 17.456 12 17.456s4.167-1.832 4.167-4.091S14.3 9.273 12 9.273m0 1.636c-1.38 0-2.5 1.099-2.5 2.455 0 1.355 1.12 2.454 2.5 2.454s2.5-1.099 2.5-2.454-1.12-2.455-2.5-2.455m4.722-.818c0-.452.373-.818.834-.818h1.11c.46 0 .834.366.834.818a.826.826 0 0 1-.833.818h-1.111a.826.826 0 0 1-.834-.818" clipRule="evenodd"></path>
  </svg>
);

export const getSuggestionSvg = (className = 'inline') => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path fill="currentColor" fillRule="evenodd" d="M10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12s0-5.657 1.172-6.828S6.229 4 10 4m3.25 5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75m1 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m1 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75M11 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-2 8c4 0 4-.895 4-2s-1.79-2-4-2-4 .895-4 2 0 2 4 2" clipRule="evenodd"></path>
  </svg>
);
