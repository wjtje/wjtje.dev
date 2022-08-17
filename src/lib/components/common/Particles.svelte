<script>
	import { browser } from '$app/env';

	import { onMount } from 'svelte';

	import Particles from 'svelte-particles';
	import { loadFull } from 'tsparticles';

	let particlesConfig = {
		fullScreen: false,
		detectRetina: true,
		fpsLimit: 60,
		particles: {
			color: {
				value: '#fff',
				animation: {
					enable: true,
					speed: 50,
					sync: false
				}
			},
			links: {
				color: {
					value: 'random'
				},
				distance: 100,
				enable: true,
				frequency: 1,
				opacity: 0.7,
				width: 1
			},
			move: {
				enable: true,
				speed: 0.5
			},
			number: {
				density: {
					enable: true,
					area: 800,
					factor: 1000
				},
				limit: 0,
				value: 50
			},
			opacity: {
				random: {
					enable: true,
					minimumValue: 0.3
				},
				value: 0.5,
				animation: {
					destroy: 'none',
					enable: true,
					minimumValue: 0.3,
					speed: 0.5,
					startValue: 'random',
					sync: false
				}
			},
			size: {
				random: {
					enable: true,
					minimumValue: 1
				},
				value: 3,
				animation: {
					destroy: 'none',
					enable: true,
					minimumValue: 1,
					speed: 3,
					startValue: 'random',
					sync: false
				}
			}
		}
	};

	let onParticlesLoaded = (event) => {
		const particlesContainer = event.detail.particles;

		// you can use particlesContainer to call all the Container class
		// (from the core library) methods like play, pause, refresh, start, stop
	};

	let particlesInit = async (engine) => {
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	};

	let height;

	function styles(node, styles) {
		setCustomProperties(node, styles);

		return {
			update(styles) {
				setCustomProperties(node, styles);
			}
		};
	}

	function setCustomProperties(node, styles) {
		Object.entries(styles).forEach(([key, value]) => {
			node.style.setProperty(`--${key}`, value);
		});
	}

	onMount(() => {
		if (browser) {
			const resizeObserver = new ResizeObserver((entries) => {
				height = Math.max(entries[0].target.clientHeight, document.documentElement.clientHeight);
			});

			resizeObserver.observe(document.body);
		}
	});
</script>

<div use:styles={{ height: `${height}px` }}>
	<Particles
		id="tsparticles"
		options={particlesConfig}
		on:particlesLoaded={onParticlesLoaded}
		{particlesInit}
	/>
</div>
