import { Events } from "./dev_modules/webc-events/events.js";
export { init };
export default init;

function init() {
    customElements.define("webc-events", Events);
}