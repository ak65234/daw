class Node {
    /** @type {AudioNode} */
    #node;

    /** @param {AudioNode} node */
    constructor(node) {
        this.#node = node;
    }

    /** @param {...AudioNode|Node} */
    add(/* args */) {
        for (const arg of arguments)
            arg.connect(this.#node);

        return this;
    }

    /** @param {...AudioNode|Node} */
    remove(/* args */) {
        for (const arg of arguments)
            arg.disconnect(this.#node);

        return this;
    }

    /** @param {AudioDestinationNode} dest */
    connect(dest) {
        this.#node.connect(dest);

        return this;
    }

    /** @param {AudioDestinationNode} dest */
    disconnect(dest) {
        this.#node.disconnect(dest);

        return this;
    }
}

class Gain extends Node {
    /** @type {GainNode} */
    #gain;

    /** @param {AudioContext} ctx */
    constructor(ctx) {
        const gain = ctx.createGain();
        super(gain);
        this.#gain = gain;
    }

    /**
     * @param {number} value
     * @param {number} time Time in seconds
     */
    gain(value, time = 0) {
        if (typeof value !== "number")
            return this.#gain.gain.value;
        else
            this.#gain.gain.setValueAtTime(value, time)

        return this;
    }
}

class Oscillator extends Node {
    /** @type {OscillatorNode} */
    #osc;

    /** @param {AudioContext} ctx */
    constructor(ctx) {
        const osc = ctx.createOscillator();
        super(osc);
        this.#osc = osc;
    }

    /** @param {OscillatorType} type */
    type(type) {
        this.#osc.type = type;

        return this;
    }

    /** @param {number} frequency */
    freq(frequency) {
        this.#osc.frequency.value = frequency;

        return this;
    }

    /** @param {number} time Time in seconds */
    start(time = 0) {
        this.#osc.start(time);

        return this;
    }

    /** @param {number} time Time in seconds */
    stop(time = 0) {
        this.#osc.stop(time);

        return this;
    }
}