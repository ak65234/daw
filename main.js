(() => {
    /** @type {AudioContext} */
    const ctx = new (AudioContext || webkitAudioContext)();
})();