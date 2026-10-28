
(() => {
    'use strict';

  
    const instruments = [
        {
            id: 'xylophone', name: 'Xylophone', glyph: '✳',
            color: '#FF5D8F', kind: 'synth', type: 'triangle',
            base: 0.72, attack: 0.03, release: 0.35,
            pattern: ['C5', null, 'E5', null, 'G5', null, 'E5', null, 'D5', null, 'F5', null, 'A5', null, 'G5', null]
        },
        {
            id: 'bells', name: 'Bells', glyph: '✧',
            color: '#B99CFF', kind: 'fm',
            base: 0.45, attack: 0.01, release: 1.25,
            pattern: ['G5', null, null, 'D5', null, null, 'A5', null, 'G5', null, null, 'D5', null, 'E5', null, null]
        },
        {
            id: 'kalimba', name: 'Kalimba', glyph: '◈',
            color: '#46D9E7', kind: 'pluck',
            base: 0.60, attack: 0.01, release: 0.7,
            pattern: ['C4', null, 'G4', null, null, 'E4', null, 'G4', 'A4', null, 'E4', null, null, 'D4', null, 'G4']
        },
        {
            id: 'musicbox', name: 'Music box', glyph: '♫',
            color: '#FFD166', kind: 'fm',
            base: 0.34, attack: 0.01, release: 1.6,
            pattern: [null, 'E5', null, 'G5', null, 'B5', null, 'G5', null, 'D5', null, 'F5', null, 'A5', null, 'F5']
        },
        {
            id: 'celesta', name: 'Celesta', glyph: '✦',
            color: '#F17CFF', kind: 'synth', type: 'sine',
            base: 0.42, attack: 0.01, release: 1.1,
            pattern: ['E5', null, null, 'G5', null, null, 'B5', null, 'A5', null, null, 'G5', null, null, 'E5', null]
        },
        {
            id: 'sparkles', name: 'Sparkles', glyph: '✺',
            color: '#D5FF5B', kind: 'fm',
            base: 0.27, attack: 0.01, release: 0.8,
            pattern: [null, null, 'C6', null, null, 'G5', null, null, 'E6', null, null, 'B5', null, null, 'D6', null]
        },
        {
            id: 'bass', name: 'Bass', glyph: '◉',
            color: '#FF9853', kind: 'mono',
            base: 0.67, attack: 0.02, release: 0.25,
            pattern: ['C2', null, null, null, 'C2', null, 'G1', null, 'A1', null, null, null, 'F1', null, 'G1', null]
        },
        {
            id: 'maracas', name: 'Maracas', glyph: '⋰',
            color: '#7E82FF', kind: 'noise',
            base: 0.24, attack: 0.001, release: 0.07,
            pattern: [1, null, 1, null, 1, 1, null, 1, 1, null, 1, null, 1, 1, null, 1]
        },
        {
            id: 'drums', name: 'Drums', glyph: '▤',
            color: '#FF6677', kind: 'membrane',
            base: 0.70, attack: 0.001, release: 0.22,
            pattern: ['C2', null, null, null, 'C2', null, null, null, 'C2', null, null, null, 'G1', null, null, null]
        },
        {
            id: 'darkpulse', name: 'Darkpulse', glyph: '◒',
            color: '#A184FF', kind: 'mono',
            base: 0.47, attack: 0.03, release: 0.3,
            pattern: ['C3', null, 'C3', null, null, 'D#3', null, null, 'G2', null, 'G2', null, null, 'A#2', null, null]
        },
        {
            id: 'toms', name: 'Toms', glyph: '◍',
            color: '#4BE0B5', kind: 'membrane',
            base: 0.32, attack: 0.002, release: 0.3,
            pattern: [null, null, 'G2', null, null, null, null, 'A2', null, null, 'C3', null, null, null, 'G2', null]
        },
        {
            id: 'industrial', name: 'Industrial', glyph: '⌁',
            color: '#9AC1CF', kind: 'noise', noise: 'brown',
            base: 0.32, attack: 0.001, release: 0.25,
            pattern: [1, null, null, null, null, null, 1, null, null, null, 1, null, null, null, null, null]
        },
        {
            id: 'ambient', name: 'Ambient', glyph: '◌',
            color: '#70B4FF', kind: 'poly',
            base: 0.25, attack: 0.45, release: 1.8,
            pattern: ['C4', null, null, null, null, null, null, null, 'G4', null, null, null, null, null, null, null]
        },
        {
            id: 'wind', name: 'Wind', glyph: '≈',
            color: '#70E5BA', kind: 'noise', noise: 'pink',
            base: 0.15, attack: 0.4, release: 1.5,
            pattern: [1, null, null, null, null, null, null, null, null, null, 1, null, null, null, null, null]
        },
        {
            id: 'rain', name: 'Rain', glyph: '∿',
            color: '#5D93FF', kind: 'noise',
            base: 0.16, attack: 0.015, release: 0.18,
            pattern: [1, null, 1, 1, null, 1, null, 1, 1, null, 1, null, 1, 1, null, 1]
        },
        {
            id: 'echo', name: 'Echo', glyph: '◎',
            color: '#FF83BD', kind: 'synth', type: 'sine',
            base: 0.30, attack: 0.02, release: 0.7,
            pattern: [null, 'G4', null, null, null, 'D5', null, null, null, 'G4', null, null, null, 'D5', null, null]
        },
        {
            id: 'pad', name: 'Pad', glyph: '▱',
            color: '#C1A0FF', kind: 'poly',
            base: 0.35, attack: 0.6, release: 2.1,
            pattern: ['C4', null, null, null, null, null, null, null, 'A3', null, null, null, null, null, null, null]
        },
        {
            id: 'chimes', name: 'Chimes', glyph: '♢',
            color: '#F8E66D', kind: 'fm',
            base: 0.35, attack: 0.005, release: 0.9,
            pattern: [null, null, null, 'E5', null, null, null, null, null, null, 'G5', null, null, null, null, null]
        }
    ];



    const defaults = {
        volume: 72,
        pitch: 0,
        tone: 72,
        reverb: 32,
        delay: 18,
        attack: 0.08,
        release: 0.6,
        muted: true
    };

    const settings = {};
    const voices = {};

    let selected = 'xylophone';
    let solo = null;
    let audioReady = false;
    let reverbReady = false;
    let isPlaying = false;
    let step = 0;
    let transportEvent = null;
    let masterMuted = false;

    let master = null;
    let reverb = null;
    let delay = null;

    const $ = id => document.getElementById(id);

    const soundGrid = $('soundGrid');
    const stepTrack = $('stepTrack');

    const sliderIds = [
        'volume', 'pitch', 'tone', 'reverb',
        'delay', 'attack', 'release'
    ];



    const cleanStyle = document.createElement('style');

    cleanStyle.textContent = `
        .library-foot,
        .settings-note,
        .bottom-caption,
        .live-indicator,
        #soundGrid .sound-state {
            display: none !important;
        }

        #soundGrid > .sound-card {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            text-align: left;
            min-width: 0;
        }

        #soundGrid > .sound-card .sound-glyph {
            display: block;
            line-height: 1.2;
        }

        #soundGrid > .sound-card .sound-name {
            display: block;
            width: 100%;
            margin-top: auto;
            line-height: 1.25;
            overflow-wrap: anywhere;
        }

        #soundGrid > .sound-card .sound-status {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #soundGrid > .sound-card .sound-indicator {
            display: inline-block;
            width: 7px;
            height: 7px;
            flex: 0 0 7px;
            border-radius: 50%;
            background: rgba(25, 22, 37, .28);
        }

        #soundGrid > .sound-card.is-active .sound-indicator {
            background: #191625;
            box-shadow: 0 0 9px rgba(25, 22, 37, .4);
        }

        #soundGrid > .sound-card.is-muted {
            opacity: .55;
            filter: saturate(.65);
        }

        #soundGrid > .sound-card.is-active {
            outline: 2px solid white;
            outline-offset: -3px;
        }

        #soundGrid > .sound-card.is-solo {
            outline-color: #D9FF61;
            box-shadow: 0 0 15px rgba(217, 255, 97, .2);
        }
    `;

    document.head.appendChild(cleanStyle);



    function outputText(param, value) {
        const number = Number(value);

        if (param === 'pitch') {
            return `${number > 0 ? '+' : ''}${number} ST`;
        }

        if (param === 'attack' || param === 'release') {
            return `${number.toFixed(2)} S`;
        }

        return `${Math.round(number)}%`;
    }

    function setSliderFill(input) {
        if (!input) return;

        const min = Number(input.min);
        const max = Number(input.max);
        const value = Number(input.value);
        const percent = ((value - min) / (max - min)) * 100;

        input.style.setProperty('--fill', `${percent}%`);
    }

    function isAudible(id) {
        return Boolean(
            settings[id] &&
            !settings[id].muted &&
            (!solo || solo === id)
        );
    }

    function setStatus(message) {
        const el = $('statusText');

        if (el) {
            el.textContent = message;
        }
    }



    function renderCards() {
        if (!soundGrid || !stepTrack) {
            console.error('Не найдены soundGrid или stepTrack в index.html.');
            return;
        }

        soundGrid.innerHTML = '';
        stepTrack.innerHTML = '';

        instruments.forEach(inst => {
            settings[inst.id] = {
                ...defaults,
                volume: Math.round(inst.base * 100),
                attack: inst.attack,
                release: inst.release
            };

            const card = document.createElement('button');

            card.type = 'button';
            card.className = 'sound-card is-muted';
            card.dataset.id = inst.id;
            card.style.setProperty('--tile-color', inst.color);
            card.style.setProperty('--accent', inst.color);

            card.setAttribute('aria-pressed', 'false');
            card.setAttribute('aria-label', `${inst.name}: выключен`);

            card.innerHTML = `
                <span class="sound-glyph">${inst.glyph}</span>
                <span class="sound-name">${inst.name}</span>
                <span class="sound-status">
                    <i class="sound-indicator"></i>
                    <span class="sound-state">OFF</span>
                </span>
            `;

            card.addEventListener('click', () => {
                handleCardClick(inst.id);
            });

            soundGrid.appendChild(card);
        });

        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('span');
            cell.className = 'step-cell';
            stepTrack.appendChild(cell);
        }

        renderStep(0);
    }



    function selectInstrument(id) {
        selected = id;

        const inst = instruments.find(item => item.id === id);
        if (!inst) return;

        $('selectedName').textContent = inst.name.toUpperCase();
        $('selectedGlyph').textContent = inst.glyph;

        $('selectedGlyph').style.color = inst.color;
        $('selectedGlyph').style.background =
            `color-mix(in srgb, ${inst.color} 16%, #28253e)`;

        document.querySelectorAll('.setting-row').forEach(row => {
            row.style.setProperty('--accent', inst.color);
        });

        sliderIds.forEach(param => {
            const input = $(param);
            const output = $(param + 'Value');

            if (!input || !output) return;

            input.value = settings[id][param];
            output.textContent = outputText(param, settings[id][param]);

            setSliderFill(input);
        });

        updateCardsState();
        updateActionButtons();
    }



    function updateCardsState() {
        if (!soundGrid) return;

        soundGrid.querySelectorAll('.sound-card').forEach(card => {
            const id = card.dataset.id;
            const muted = settings[id].muted;
            const active = !muted && (!solo || solo === id);

           
            card.classList.toggle('selected', id === selected && active);
            card.classList.toggle('is-active', active);
            card.classList.toggle('enabled', !muted);
            card.classList.toggle('is-muted', muted);
            card.classList.toggle('muted', muted);
            card.classList.toggle('is-solo', solo === id);
            card.classList.toggle('solo', solo === id);

            card.setAttribute('aria-pressed', String(!muted));
            card.setAttribute(
                'aria-label',
                `${instruments.find(inst => inst.id === id).name}: ${muted ? 'выключен' : 'включён'}`
            );

            const indicator = card.querySelector('.sound-indicator');
            const state = card.querySelector('.sound-state');

            if (indicator) {
                indicator.classList.toggle('active', active);
            }

            if (state) {
                state.textContent = muted ? 'OFF' : solo === id ? 'SOLO' : 'ON';
            }
        });
    }

    function updateActionButtons() {
        const current = settings[selected];
        if (!current) return;

        $('muteBtn').classList.toggle('is-muted', current.muted);
        $('muteBtn').classList.toggle('active', current.muted);

        $('muteBtn').innerHTML = `
            <span class="action-symbol">◖</span>
            ${current.muted ? 'UNMUTE' : 'MUTE'}
        `;

        $('soloBtn').classList.toggle('is-solo', solo === selected);
        $('soloBtn').classList.toggle('active', solo === selected);

        $('activeBadge').textContent = current.muted
            ? 'MUTED'
            : solo === selected
                ? 'SOLO'
                : 'ACTIVE';

        $('activeBadge').classList.toggle('muted', current.muted);
        $('activeBadge').classList.toggle('is-muted', current.muted);
    }



    function createVoice(inst) {
        const filter = new Tone.Filter({
            frequency: 14000,
            type: 'lowpass',
            rolloff: -12,
            Q: 0.6
        });

        const level = new Tone.Gain(1);
        const reverbSend = new Tone.Gain(0);
        const delaySend = new Tone.Gain(0);

        let synth;

        switch (inst.kind) {
            case 'pluck':
                synth = new Tone.PluckSynth({
                    attackNoise: 1.4,
                    dampening: 2600,
                    resonance: 0.82
                });
                break;

            case 'fm':
                synth = new Tone.FMSynth({
                    harmonicity: 3.2,
                    modulationIndex: 8,
                    oscillator: { type: 'sine' },
                    envelope: {
                        attack: inst.attack,
                        decay: 0.22,
                        sustain: 0.12,
                        release: inst.release
                    },
                    modulation: { type: 'sine' },
                    modulationEnvelope: {
                        attack: 0.01,
                        decay: 0.2,
                        sustain: 0.05,
                        release: 0.2
                    }
                });
                break;

            case 'mono':
                synth = new Tone.MonoSynth({
                    oscillator: { type: 'sawtooth' },
                    filter: {
                        Q: 2,
                        type: 'lowpass',
                        rolloff: -24
                    },
                    envelope: {
                        attack: inst.attack,
                        decay: 0.12,
                        sustain: 0.3,
                        release: inst.release
                    },
                    filterEnvelope: {
                        attack: 0.01,
                        decay: 0.15,
                        sustain: 0.2,
                        release: 0.3,
                        baseFrequency: 180,
                        octaves: 3
                    }
                });
                break;

            case 'poly':
                synth = new Tone.PolySynth(Tone.Synth, {
                    oscillator: { type: 'sine' },
                    envelope: {
                        attack: inst.attack,
                        decay: 0.2,
                        sustain: 0.25,
                        release: inst.release
                    }
                });
                break;

            case 'noise':
                synth = new Tone.NoiseSynth({
                    noise: { type: inst.noise || 'white' },
                    envelope: {
                        attack: inst.attack,
                        decay: 0.05,
                        sustain: 0,
                        release: inst.release
                    }
                });
                break;

            case 'membrane':
                synth = new Tone.MembraneSynth({
                    pitchDecay: 0.08,
                    octaves: 3,
                    oscillator: { type: 'sine' },
                    envelope: {
                        attack: inst.attack,
                        decay: 0.3,
                        sustain: 0,
                        release: inst.release
                    }
                });
                break;

            case 'metal':
                synth = new Tone.MetalSynth({
                    frequency: 420,
                    harmonicity: 5.1,
                    modulationIndex: 26,
                    resonance: 3200,
                    octaves: 1.35,
                    envelope: {
                        attack: inst.attack,
                        decay: inst.release,
                        release: 0.12
                    }
                });
                break;

            default:
                synth = new Tone.Synth({
                    oscillator: { type: inst.type || 'triangle' },
                    envelope: {
                        attack: inst.attack,
                        decay: 0.15,
                        sustain: 0.15,
                        release: inst.release
                    }
                });
        }

        synth.connect(filter);
        filter.connect(level);

        
        level.connect(master);
        level.connect(reverbSend);
        level.connect(delaySend);

        reverbSend.connect(reverb);
        delaySend.connect(delay);

        return {
            synth,
            filter,
            level,
            reverbSend,
            delaySend,
            kind: inst.kind
        };
    }

    function ensureEngine() {
        if (audioReady) return;

        master = new Tone.Volume(Number($('master').value))
            .toDestination();

        reverb = new Tone.Reverb({
            decay: 3.2,
            wet: 1
        });

        delay = new Tone.FeedbackDelay({
            delayTime: '8n',
            feedback: 0.24,
            wet: 1
        });

        reverb.connect(master);
        delay.connect(master);

        instruments.forEach(inst => {
            voices[inst.id] = createVoice(inst);
        });

        Tone.Transport.bpm.value = Number($('tempo').value);
        Tone.Transport.loop = false;

        transportEvent = Tone.Transport.scheduleRepeat(onStep, '16n');

        audioReady = true;

        applyAllSettings();
    }



    function applySettings(id) {
        if (!audioReady || !voices[id]) return;

        const s = settings[id];
        const voice = voices[id];

        const audible = isAudible(id);

        const targetVolume = audible ? s.volume / 100 : 0;

        voice.level.gain.rampTo(targetVolume, 0.025);

        const toneHz = 220 + Math.pow(s.tone / 100, 2.15) * 18500;

        voice.filter.frequency.rampTo(toneHz, 0.06);

        voice.reverbSend.gain.rampTo(
            audible ? (s.reverb / 100) * 0.42 : 0,
            0.04
        );

        voice.delaySend.gain.rampTo(
            audible ? (s.delay / 100) * 0.34 : 0,
            0.04
        );

        try {
            if (voice.kind !== 'pluck' && voice.kind !== 'metal') {
                voice.synth.set({
                    envelope: {
                        attack: Number(s.attack),
                        release: Number(s.release)
                    }
                });
            } else if (voice.kind === 'metal') {
                voice.synth.set({
                    envelope: {
                        attack: Math.max(0.001, Number(s.attack)),
                        decay: Math.max(0.06, Number(s.release))
                    }
                });

                if (voice.synth.frequency) {
                    voice.synth.frequency.rampTo(
                        420 * Math.pow(2, Number(s.pitch) / 12),
                        0.05
                    );
                }
            } else if (voice.kind === 'pluck') {
                voice.synth.set({
                    dampening: 1200 + (2.5 - Number(s.release)) * 700
                });
            }
        } catch (error) {
            console.warn('Instrument setting not supported:', error);
        }
    }

    function applyAllSettings() {
        instruments.forEach(inst => applySettings(inst.id));
    }

    async function prepareAudio() {
        if (!window.Tone) {
            throw new Error('Tone.js не загрузился. Проверь интернет.');
        }

        await Tone.start();
        ensureEngine();

        if (!reverbReady) {
            await reverb.generate();
            reverbReady = true;
        }
    }

    function restoreMasterVolume() {
        if (!audioReady || !master) return;

        masterMuted = false;

        master.volume.rampTo(Number($('master').value), 0.04);
    }



    function fire(id, note, time) {
        if (!voices[id] || !isAudible(id)) return;

        const inst = instruments.find(item => item.id === id);
        const voice = voices[id];
        const s = settings[id];

        const velocity = Math.min(
            0.95,
            Math.max(0.08, 0.7 + (s.volume / 100) * 0.25)
        );

        try {
            if (inst.kind === 'noise') {
                voice.synth.triggerAttackRelease(
                    Math.max(0.04, Number(s.release) * 0.28),
                    time,
                    velocity
                );
                return;
            }

            if (inst.kind === 'metal') {
                voice.synth.triggerAttackRelease(
                    Math.max(0.07, Number(s.release) * 0.38),
                    time,
                    velocity
                );
                return;
            }

            const shiftedNote = Tone.Frequency(note)
                .transpose(Number(s.pitch))
                .toNote();

            if (inst.kind === 'pluck') {
                voice.synth.triggerAttack(shiftedNote, time, velocity);
            } else if (inst.kind === 'membrane') {
                voice.synth.triggerAttackRelease(
                    shiftedNote, '8n', time, velocity
                );
            } else {
                voice.synth.triggerAttackRelease(
                    shiftedNote,
                    Math.max(0.08, Math.min(1.8, Number(s.release) * 0.6)),
                    time,
                    velocity
                );
            }
        } catch (error) {
            console.warn(`Could not play ${id}:`, error);
        }
    }



    async function handleCardClick(id) {
        selectInstrument(id);

       
        if (!settings[id].muted) {
            settings[id].muted = true;

            if (solo === id) {
                solo = null;
            }

            applyAllSettings();
            updateCardsState();
            updateActionButtons();

            const activeCount = instruments.filter(inst =>
                isAudible(inst.id)
            ).length;

            if (isPlaying && activeCount === 0) {
                setStatus('NO ACTIVE LAYERS');
            }

            return;
        }

       
        settings[id].muted = false;

       
        solo = null;

        updateCardsState();
        updateActionButtons();

        try {
            await prepareAudio();

            restoreMasterVolume();
            applyAllSettings();

            const inst = instruments.find(item => item.id === id);
            const firstNote = inst.pattern.find(
                event => event !== null && event !== undefined
            );

            if (firstNote !== undefined) {
                fire(id, firstNote, Tone.now() + 0.03);
            }

            if (!isPlaying) {
                setStatus('LAYER PREVIEW');
            }
        } catch (error) {
            console.error(error);
            setStatus('AUDIO ERROR');
        }
    }



    function onStep(time) {
        const currentStep = step;

        instruments.forEach(inst => {
            const event = inst.pattern[currentStep];

            if (event !== null && event !== undefined) {
                fire(inst.id, event, time);
            }
        });

        if (window.Tone && Tone.Draw) {
            Tone.Draw.schedule(() => {
                renderStep(currentStep);
            }, time);
        }

        step = (step + 1) % 16;
    }

    function renderStep(currentStep) {
        if (!stepTrack) return;

        stepTrack.querySelectorAll('.step-cell').forEach((cell, index) => {
            cell.classList.toggle('active', index === currentStep);
        });

        $('stepCounter').textContent =
            `STEP ${String(currentStep + 1).padStart(2, '0')} / 16`;
    }



    async function startAudio() {
        if (isPlaying) return;

        const activeLayers = instruments.filter(inst => isAudible(inst.id));

        if (activeLayers.length === 0) {
            setStatus('CHOOSE A SOUND FIRST');
            return;
        }

        $('startBtn').disabled = true;

        try {
            await prepareAudio();

            restoreMasterVolume();
            applyAllSettings();

            Tone.Transport.bpm.value = Number($('tempo').value);
            Tone.Transport.start();

            isPlaying = true;

            $('startLabel').textContent = 'PLAYING';
            $('startBtn').classList.add('is-playing');

            setStatus(`PLAYING ${activeLayers.length} LAYER(S)`);
        } catch (error) {
            console.error(error);
            setStatus('AUDIO ERROR — CHECK CONNECTION');
        } finally {
            $('startBtn').disabled = false;
        }
    }

    function stopAudio() {
        
        if (audioReady && Tone.Transport) {
            Tone.Transport.stop();
            Tone.Transport.position = '0:0:0';
        }

        isPlaying = false;
        step = 0;
        solo = null;

        
        instruments.forEach(inst => {
            settings[inst.id].muted = true;
        });

        
        if (audioReady && master) {
            master.volume.value = -60;
            masterMuted = true;

            applyAllSettings();
        }

        $('startLabel').textContent = 'START AUDIO';
        $('startBtn').classList.remove('is-playing');

        
        updateCardsState();
        updateActionButtons();
        renderStep(0);

        setStatus('READY');
    }

    $('startBtn').addEventListener('click', startAudio);
    $('stopBtn').addEventListener('click', stopAudio);



    sliderIds.forEach(param => {
        const input = $(param);

        input.addEventListener('input', () => {
            settings[selected][param] = Number(input.value);

            $(param + 'Value').textContent =
                outputText(param, input.value);

            setSliderFill(input);
            applySettings(selected);
        });

        setSliderFill(input);
    });

    $('tempo').addEventListener('input', event => {
        $('tempoValue').textContent = event.target.value;

        setSliderFill(event.target);

        if (audioReady) {
            Tone.Transport.bpm.rampTo(
                Number(event.target.value),
                0.08
            );
        }
    });

    $('master').addEventListener('input', event => {
        const value = Number(event.target.value);

        $('masterValue').textContent =
            value < 0 ? `−${Math.abs(value)}` : String(value);

        setSliderFill(event.target);

       
        if (audioReady && !masterMuted) {
            master.volume.rampTo(value, 0.08);
        }
    });



    $('muteBtn').addEventListener('click', () => {
        settings[selected].muted = !settings[selected].muted;

        if (settings[selected].muted && solo === selected) {
            solo = null;
        }

        applyAllSettings();
        updateCardsState();
        updateActionButtons();
    });

    $('soloBtn').addEventListener('click', () => {
        if (solo === selected) {
            solo = null;
        } else {
            settings[selected].muted = false;
            solo = selected;
        }

        applyAllSettings();
        updateCardsState();
        updateActionButtons();
    });

    $('resetBtn').addEventListener('click', () => {
        const inst = instruments.find(item => item.id === selected);
        const mutedState = settings[selected].muted;

        settings[selected] = {
            ...defaults,
            volume: Math.round(inst.base * 100),
            attack: inst.attack,
            release: inst.release,
            muted: mutedState
        };

        if (solo === selected && mutedState) {
            solo = null;
        }

        selectInstrument(selected);
        applyAllSettings();
        updateCardsState();
        updateActionButtons();
    });



    renderCards();
    selectInstrument(selected);

    setSliderFill($('tempo'));
    setSliderFill($('master'));

 
})();
