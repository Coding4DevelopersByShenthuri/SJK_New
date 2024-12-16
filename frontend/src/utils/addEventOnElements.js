/**
 * Add event listeners to multiple elements.
 * @param {NodeList | HTMLElement[]} elements - Elements to which the event listener will be attached.
 * @param {string} eventType - Type of event (e.g., "click", "mouseover").
 * @param {Function} callback - Callback function to execute when the event occurs.
 */
export const addEventOnElements = (elements, eventType, callback) => {
  if (!elements || elements.length === 0) return;

  elements.forEach(element => {
    element.addEventListener(eventType, callback);
  });
};
