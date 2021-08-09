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

    /** @param {AudioDestinationNode|Node} dest */
    connect(dest) {
        if (dest instanceof Node)
            dest.add(this)
        else
            this.#node.connect(dest);

        return this;
    }

    /** @param {AudioDestinationNode|Node} dest */
    disconnect(dest) {
        if (dest instanceof Node)
            dest.remove(this)
        else
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

    /**
     * @param {number} value
     * @param {number} time Time in seconds
     */
    linearAutomation(value, time) {
        this.#gain.gain.linearRampToValueAtTime(value, time)

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

    /**
     * @param {number} frequency
     * @param {number} time Time in seconds
     */
    freq(frequency, time = 0) {
        this.#osc.frequency.setValueAtTime(frequency, time);

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