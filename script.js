
document.addEventListener("DOMContentLoaded", () => {
    const pads = [...document.querySelectorAll(".sound-pad")];

    const playButton = document.querySelector("#playAll");
    const stopButton = document.querySelector("#stopAll");
    const playIcon = document.querySelector("#playIcon");
    const playText = document.querySelector("#playText");

    const tempoSlider = document.querySelector("#tempo");
    const tempoValue = document.querySelector("#tempoValue");
    const volumeSlider = document.querySelector("#volume");
    const pitchSlider = document.querySelector("#pitch");
    const reverbSlider = document.querySelector("#reverb");
    const delaySlider = document.querySelector("#delay");

    const volumeValue = document.querySelector("#volumeValue");
    const pitchValue = document.querySelector("#pitchValue");
    const reverbValue = document.querySelector("#reverbValue");
    const delayValue = document.querySelector("#delayValue");

    const statusText = document.querySelector("#statusText");
    const statusContainer = document.querySelector(".transport-status");
    const selectedSound = document.querySelector("#selectedSound");

    let audioReady = false;
    let audioStarting = false;
    let master;
    let globalReverb;
    let globalDelay;
    let step = 0;
    let currentPitch = 0;

    const instruments = {};
    const layerEffects = {};
    const activeSounds = new Set();
    const settings = {};



    const patterns = {
        xylophone: ["C5", null, "E5", null, "G5", null, "E5", null, "D5", null, "G5", null, "E5", null, "D5", null],
        bells: ["E5", null, null, null, "G5", null, null, null, "B5", null, null, null, "G5", null, null, null],
        kalimba: ["C4", null, "G4", null, "E4", null, "G4", null, "A4", null, "G4", null, "E4", null, "D4", null],
        musicbox: ["G5", null, "E5", null, "D5", null, "C5", null, "E5", null, "G5", null, "A5", null, "G5", null],
        celesta: [null, null, "C6", null, null, null, "G5", null, null, null, "E6", null, null, null, "D6", null],
        sparkles: [null, "E6", null, null, null, null, "G6", null, "C6", null, null, null, null, "A5", null, null],
        bass: ["C2", null, null, null, null, null, "C2", null, "G2", null, null, null, null, null, "G2", null],
        maracas: ["C4", null, "C4", null, "C4", null, "C4", "C4", "C4", null, "C4", null, "C4", null, "C4", "C4"],
        drums: ["C2", null, null, null, "C2", null, null, null, "C2", null, null, null, "C2", null, null, null],
        darkpulse: ["C3", null, null, "G3", null, null, "C3", null, "Bb2", null, null, "G2", null, "Bb2", null, null],
        toms: ["C2", null, null, null, null, null, "G2", null, "C2", null, null, null, null, "G2", null, null],
        industrial: ["C3", null, null, null, "C3", null, "Eb3", null, "C3", null, null, null, "G2", null, "Bb2", null],
        ambient: ["C4", null, null, null, null, null, null, null, "G4", null, null, null, null, null, null, null],
        wind: ["C4", null, null, null, null, null, null, null, null, null, "G4", null, null, null, null, null],
        rain: ["C4", null, "C4", null, null, "C4", null, "C4", "C4", null, null, "C4", null, "C4", null, null],
        echo: ["E5", null, null, null, "G5", null, null, null, "E5", null, null, null, "D5", null, null, null],
        pad: ["C4", null, null, null, null, null, null, null, "E4", null, null, null, null, null, null, null],
        chimes: [null, null, "G5", null, null, null, null, null, null, "E5", null, null, null, null, "C6", null]
    };



    const configs = {
        xylophone: { type: "synth", osc: "triangle", attack: 0.005, decay: 0.18, sustain: 0.03, release: 0.15, volume: -7 },
        bells: { type: "synth", osc: "sine", attack: 0.01, decay: 0.8, sustain: 0.02, release: 1.1, volume: -9 },
        kalimba: { type: "synth", osc: "triangle", attack: 0.005, decay: 0.3, sustain: 0.02, release: 0.3, volume: -6 },
        musicbox: { type: "synth", osc: "sine", attack: 0.005, decay: 0.5, sustain: 0.02, release: 0.6, volume: -10 },
        celesta: { type: "synth", osc: "sine", attack: 0.01, decay: 0.6, sustain: 0.03, release: 0.8, volume: -10 },
        sparkles: { type: "synth", osc: "sine", attack: 0.005, decay: 0.12, sustain: 0.01, release: 0.2, volume: -12 },
        bass: { type: "mono", osc: "triangle", attack: 0.01, decay: 0.2, sustain: 0.35, release: 0.2, volume: -5, filter: 700 },
        maracas: { type: "noise", noise: "white", attack: 0.001, decay: 0.055, sustain: 0, release: 0.03, volume: -19 },
        drums: { type: "membrane", volume: -8, decay: 0.3 },
        darkpulse: { type: "mono", osc: "sawtooth", attack: 0.01, decay: 0.15, sustain: 0.2, release: 0.15, volume: -12, filter: 2200 },
        toms: { type: "membrane", volume: -12, decay: 0.3 },
        industrial: { type: "mono", osc: "square", attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1, volume: -17, filter: 2200 },
        ambient: { type: "poly", osc: "sine", attack: 0.5, decay: 0.4, sustain: 0.7, release: 1.5, volume: -13 },
        wind: { type: "noise", noise: "pink", attack: 0.3, decay: 0.5, sustain: 0.3, release: 0.8, volume: -23 },
        rain: { type: "noise", noise: "white", attack: 0.001, decay: 0.09, sustain: 0, release: 0.04, volume: -22 },
        echo: { type: "synth", osc: "triangle", attack: 0.01, decay: 0.2, sustain: 0.05, release: 0.25, volume: -11 },
        pad: { type: "poly", osc: "triangle", attack: 0.7, decay: 0.5, sustain: 0.65, release: 1.5, volume: -13 },
        chimes: { type: "synth", osc: "sine", attack: 0.01, decay: 0.45, sustain: 0.02, release: 0.7, volume: -11 }
    };

   
    Object.keys(configs).forEach(name => {
        const c = configs[name];
        settings[name] = {
            volume: 75,
            pitch: 0,
            reverb: 25,
            delay: 15,
            attack: c.attack ?? 0.01,
            decay: c.decay ?? 0.3,
            sustain: c.sustain ?? 0.1,
            release: c.release ?? 0.3,
            filter: c.filter ?? 2200,
            tone: c.osc ?? "sine"
        };
    });


    const definitions = {
        synth: [
            ["volume", "VOLUME", 0, 100, 1, "%"],
            ["pitch", "PITCH", -12, 12, 1, " st"],
            ["attack", "ATTACK", 0.001, 2, 0.001, " s"],
            ["decay", "DECAY", 0.02, 2, 0.01, " s"],
            ["sustain", "SUSTAIN", 0, 1, 0.01, ""],
            ["release", "RELEASE", 0.02, 3, 0.01, " s"],
            ["reverb", "REVERB", 0, 100, 1, "%"],
            ["delay", "DELAY", 0, 100, 1, "%"]
        ],
        poly: [
            ["volume", "VOLUME", 0, 100, 1, "%"],
            ["pitch", "PITCH", -12, 12, 1, " st"],
            ["attack", "ATTACK", 0.05, 3, 0.01, " s"],
            ["decay", "DECAY", 0.02, 3, 0.01, " s"],
            ["sustain", "SUSTAIN", 0, 1, 0.01, ""],
            ["release", "RELEASE", 0.05, 5, 0.01, " s"],
            ["reverb", "REVERB", 0, 100, 1, "%"],
            ["delay", "DELAY", 0, 100, 1, "%"]
        ],
        mono: [
            ["volume", "VOLUME", 0, 100, 1, "%"],
            ["pitch", "PITCH", -12, 12, 1, " st"],
            ["attack", "ATTACK", 0.001, 1, 0.001, " s"],
            ["decay", "DECAY", 0.02, 1.5, 0.01, " s"],
            ["sustain", "SUSTAIN", 0, 1, 0.01, ""],
            ["release", "RELEASE", 0.02, 2, 0.01, " s"],
            ["filter", "FILTER", 100, 8000, 50, " Hz"],
            ["reverb", "REVERB", 0, 100, 1, "%"],
            ["delay", "DELAY", 0, 100, 1, "%"]
        ],
        noise: [
            ["volume", "INTENSITY", 0, 100, 1, "%"],
            ["attack", "ATTACK", 0.001, 1.5, 0.001, " s"],
            ["decay", "LENGTH", 0.02, 2, 0.01, " s"],
            ["reverb", "REVERB", 0, 100, 1, "%"],
            ["delay", "DELAY", 0, 100, 1, "%"]
        ],
        membrane: [
            ["volume", "VOLUME", 0, 100, 1, "%"],
            ["pitch", "PITCH", -12, 12, 1, " st"],
            ["decay", "DECAY", 0.05, 1.5, 0.01, " s"],
            ["reverb", "REVERB", 0, 100, 1, "%"],
            ["delay", "DELAY", 0, 100, 1, "%"]
        ]
    };

    function formatValue(key, value, suffix) {
        if (key === "volume" || key === "reverb" || key === "delay") {
            return Math.round(value) + suffix;
        }
        if (key === "pitch") {
            return (value > 0 ? "+" : "") + value + suffix;
        }
        if (key === "filter") {
            return Math.round(value) + suffix;
        }
        return Number(value).toFixed(2) + suffix;
    }

    function createSettingsPanel(pad, name) {
        const config = configs[name];
        const wrapper = document.createElement("div");
        wrapper.className = "sound-card-wrap";

        pad.parentNode.insertBefore(wrapper, pad);
        wrapper.appendChild(pad);

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "pad-settings-toggle";
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<span>⚙</span> SOUND SETTINGS <span class="settings-chevron">⌄</span>';
        pad.appendChild(toggle);

        const panel = document.createElement("div");
        panel.className = "pad-settings-panel";
        panel.hidden = true;
        panel.innerHTML = `
            <div class="pad-settings-heading">
                <span class="pad-settings-title">${name.toUpperCase()}</span>
                <span class="pad-settings-caption">INDIVIDUAL CONTROLS</span>
            </div>
            <div class="pad-settings-grid"></div>
            <button type="button" class="reset-layer">RESET SETTINGS</button>
        `;

        wrapper.appendChild(panel);

        const grid = panel.querySelector(".pad-settings-grid");

        definitions[config.type].forEach(([key, label, min, max, stepSize, suffix]) => {
            const row = document.createElement("div");
            row.className = "layer-control";

            const id = `layer-${name}-${key}`;
            row.innerHTML = `
                <div class="layer-control-top">
                    <label for="${id}">${label}</label>
                    <output>${formatValue(key, settings[name][key], suffix)}</output>
                </div>
                <input id="${id}" type="range"
                    min="${min}" max="${max}" step="${stepSize}"
                    value="${settings[name][key]}"
                    data-key="${key}">
            `;

            grid.appendChild(row);
            const input = row.querySelector("input");
            const output = row.querySelector("output");

            input.addEventListener("input", () => {
                const value = Number(input.value);
                settings[name][key] = value;
                output.textContent = formatValue(key, value, suffix);
                applyLayerSetting(name, key, value);
            });
        });

        toggle.addEventListener("click", () => {
            const opening = panel.hidden;
            panel.hidden = !opening;
            toggle.setAttribute("aria-expanded", String(opening));
            toggle.classList.toggle("is-open", opening);
        });

        panel.querySelector(".reset-layer").addEventListener("click", () => {
            const c = configs[name];
            settings[name] = {
                volume: 75,
                pitch: 0,
                reverb: 25,
                delay: 15,
                attack: c.attack ?? 0.01,
                decay: c.decay ?? 0.3,
                sustain: c.sustain ?? 0.1,
                release: c.release ?? 0.3,
                filter: c.filter ?? 2200,
                tone: c.osc ?? "sine"
            };

            panel.querySelectorAll("input").forEach(input => {
                input.value = settings[name][input.dataset.key];
                input.dispatchEvent(new Event("input"));
            });
        });
    }

    pads.forEach(pad => {
        const name = pad.dataset.sound;
        if (configs[name]) createSettingsPanel(pad, name);
    });


    async function initAudio() {
        if (audioReady) {
            await Tone.start();
            return;
        }

        if (audioStarting) return;
        audioStarting = true;

        try {
            await Tone.start();

            master = new Tone.Volume(-3).toDestination();

            globalReverb = new Tone.Reverb({
                decay: 2.5,
                wet: 0
            });

            globalDelay = new Tone.FeedbackDelay({
                delayTime: "8n",
                feedback: 0.22,
                wet: 0
            });

            globalReverb.connect(globalDelay);
            globalDelay.connect(master);

            createInstruments();

            Tone.Transport.scheduleRepeat(time => {
                playSequenceStep(time);
            }, "16n");

            Tone.Transport.bpm.value = Number(tempoSlider.value);

          
            Tone.Transport.position = 0;
            audioReady = true;
            updateStatus("AUDIO READY");
        } catch (error) {
            console.error("Audio initialization error:", error);
            updateStatus("AUDIO ERROR");
        } finally {
            audioStarting = false;
        }
    }

    function createInstruments() {
        Object.keys(configs).forEach(name => {
            const c = configs[name];
            let instrument;

            const envelope = {
                attack: c.attack ?? 0.01,
                decay: c.decay ?? 0.3,
                sustain: c.sustain ?? 0.1,
                release: c.release ?? 0.3
            };

            if (c.type === "mono") {
                instrument = new Tone.MonoSynth({
                    oscillator: { type: c.osc },
                    envelope,
                    filter: {
                        type: "lowpass",
                        frequency: c.filter,
                        Q: 1
                    },
                    filterEnvelope: {
                        attack: 0.01,
                        decay: 0.15,
                        sustain: 0.15,
                        release: 0.2,
                        baseFrequency: 120,
                        octaves: 2
                    }
                });
            } else if (c.type === "noise") {
                instrument = new Tone.NoiseSynth({
                    noise: { type: c.noise },
                    envelope
                });
            } else if (c.type === "membrane") {
                instrument = new Tone.MembraneSynth({
                    pitchDecay: 0.05,
                    octaves: 3,
                    oscillator: { type: "sine" },
                    envelope: {
                        attack: 0.001,
                        decay: c.decay,
                        sustain: 0.01,
                        release: 0.15
                    }
                });
            } else if (c.type === "poly") {
                instrument = new Tone.PolySynth(Tone.Synth, {
                    oscillator: { type: c.osc },
                    envelope
                });
            } else {
                instrument = new Tone.Synth({
                    oscillator: { type: c.osc },
                    envelope
                });
            }

            instrument.volume.value = c.volume;

            const effects = {
                reverb: new Tone.Reverb({ decay: 2.5, wet: 0.25 }),
                delay: new Tone.FeedbackDelay({
                    delayTime: "8n",
                    feedback: 0.22,
                    wet: 0.15
                })
            };

            instrument.connect(effects.reverb);
            effects.reverb.connect(effects.delay);
            effects.delay.connect(globalReverb);

            instruments[name] = instrument;
            layerEffects[name] = effects;

            applyLayerSetting(name, "volume", settings[name].volume);
            applyLayerSetting(name, "reverb", settings[name].reverb);
            applyLayerSetting(name, "delay", settings[name].delay);
        });
    }


    function applyLayerSetting(name, key, value) {
        const instrument = instruments[name];
        const effects = layerEffects[name];
        const state = settings[name];

        if (key === "volume" && instrument) {
            instrument.volume.value = value === 0
                ? -Infinity
                : configs[name].volume + 20 * Math.log10(value / 75);
        }

        if (key === "reverb" && effects) {
            effects.reverb.wet.value = value / 100;
        }

        if (key === "delay" && effects) {
            effects.delay.wet.value = value / 100;
        }

        if (key === "filter" && instrument?.filter) {
            instrument.filter.frequency.rampTo(value, 0.05);
        }

        if (key === "attack" && instrument?.envelope) {
            instrument.envelope.attack = value;
        }

        if (key === "decay" && instrument?.envelope) {
            instrument.envelope.decay = value;
        }

        if (key === "sustain" && instrument?.envelope) {
            instrument.envelope.sustain = value;
        }

        if (key === "release" && instrument?.envelope) {
            instrument.envelope.release = value;
        }

      
        if (configs[name].type === "membrane" && instrument?.envelope) {
            instrument.envelope.decay = state.decay;
        }
    }


    function playSound(name, note, time) {
        const instrument = instruments[name];
        if (!instrument) return;

        const c = configs[name];
        const state = settings[name];
        const velocity = 0.75;

        if (c.type === "noise") {
            let duration = Math.max(0.02, state.decay);

            if (name === "wind") duration = Math.max(0.1, state.decay * 2);
            if (name === "rain") duration = Math.max(0.02, state.decay * 0.5);

            instrument.triggerAttackRelease(duration, time, velocity);
            return;
        }

        const transposedNote = Tone.Frequency(note)
            .transpose(currentPitch + state.pitch)
            .toNote();

        let duration = "16n";

        if (["bells", "celesta", "musicbox", "chimes"].includes(name)) {
            duration = "8n";
        }

        if (["ambient", "pad"].includes(name)) {
            duration = "2n";
        }

        if (name === "bass") duration = "8n";

        if (c.type === "membrane") {
            instrument.triggerAttackRelease(
                transposedNote,
                Math.max(0.05, state.decay),
                time,
                velocity
            );
        } else {
            instrument.triggerAttackRelease(
                transposedNote,
                duration,
                time,
                velocity
            );
        }
    }

    function playSequenceStep(time) {
        Object.keys(patterns).forEach(name => {
            if (!activeSounds.has(name)) return;

            const note = patterns[name][step];
            if (note) playSound(name, note, time);
        });

        step = (step + 1) % 16;
    }


    function startPlayback() {
        if (!audioReady || activeSounds.size === 0) {
            if (activeSounds.size === 0) updateStatus("SELECT A SOUND FIRST");
            return;
        }

        if (Tone.Transport.state !== "started") {
            Tone.Transport.start();
        }

        playIcon.textContent = "Ⅱ";
        playText.textContent = "PLAYING";
        statusContainer.classList.add("playing");
        updateStatus("PLAYING");
    }

    function stopPlayback() {
        if (audioReady) {
            Tone.Transport.stop();
            Tone.Transport.position = 0;
        }

        step = 0;
        playIcon.textContent = "▶";
        playText.textContent = "PLAY";
        statusContainer.classList.remove("playing");

        updateStatus(activeSounds.size ? "LAYERS READY" : "READY TO PLAY");
    }

    playButton.addEventListener("click", async () => {
        await initAudio();
        if (!audioReady) return;

        if (Tone.Transport.state === "started") {
            stopPlayback();
        } else {
            startPlayback();
        }
    });

    stopButton.addEventListener("click", stopPlayback);



    pads.forEach(pad => {
        pad.addEventListener("click", async event => {
         
            if (event.target.closest(".pad-settings-toggle")) return;

            await initAudio();
            if (!audioReady) return;

            const name = pad.dataset.sound;

            if (activeSounds.has(name)) {
                activeSounds.delete(name);
                pad.classList.remove("active");
                pad.querySelector(".pad-state").textContent = "TAP TO ACTIVATE";
            } else {
                activeSounds.add(name);
                pad.classList.add("active");
                pad.querySelector(".pad-state").textContent = "LAYER ACTIVE";
            }

            selectedSound.textContent = name.toUpperCase();

            if (activeSounds.size === 0) {
                stopPlayback();
                updateStatus("SELECT A SOUND");
            } else {
                updateStatus(activeSounds.size + " ACTIVE LAYER(S)");
                if (Tone.Transport.state !== "started") startPlayback();
            }
        });
    });



    tempoSlider.addEventListener("input", () => {
        const bpm = Number(tempoSlider.value);
        tempoValue.textContent = bpm + " BPM";

        if (audioReady) Tone.Transport.bpm.rampTo(bpm, 0.08);
    });

    volumeSlider.addEventListener("input", () => {
        const value = Number(volumeSlider.value);
        volumeValue.textContent = value + "%";

        if (audioReady) {
            master.volume.value = value === 0
                ? -Infinity
                : 20 * Math.log10(value / 100);
        }
    });

    pitchSlider.addEventListener("input", () => {
        currentPitch = Number(pitchSlider.value);
        pitchValue.textContent = currentPitch > 0
            ? "+" + currentPitch
            : String(currentPitch);
    });

    reverbSlider.addEventListener("input", () => {
        const value = Number(reverbSlider.value);
        reverbValue.textContent = value + "%";

        if (audioReady) globalReverb.wet.value = value / 100;
    });

    delaySlider.addEventListener("input", () => {
        const value = Number(delaySlider.value);
        delayValue.textContent = value + "%";

        if (audioReady) globalDelay.wet.value = value / 100;
    });

    function updateStatus(message) {
        statusText.textContent = message;
    }



    tempoValue.textContent = tempoSlider.value + " BPM";
    volumeValue.textContent = volumeSlider.value + "%";
    pitchValue.textContent = "0";
    reverbValue.textContent = reverbSlider.value + "%";
    delayValue.textContent = delaySlider.value + "%";
    updateStatus("READY TO PLAY");
});
