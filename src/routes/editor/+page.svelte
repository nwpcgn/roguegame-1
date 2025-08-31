<script lang="ts">
	import NavBar from '$lib/NavBar.svelte'
	import { onMount } from 'svelte'

	// State variables
	let videoFile = $state(null)
	let videoElement = $state()
	let videoUrl = $state('')
	let canvasElement
	let ctx
	let screenshotGallery = $state([])
	let isAutoCapturing = $state(false)
	let captureInterval = $state(1000) // 1 second by default
	let intervalId = null
	let videoLoaded = $state(false)

	// Handle file upload
	function handleFileUpload(event) {
		const file = event.target.files[0]
		if (file && file.type.includes('video/')) {
			videoFile = file
			videoUrl = URL.createObjectURL(file)
			videoLoaded = false
		}
	}

	// Take a screenshot from the current video frame
	function takeScreenshot() {
		if (!videoElement || videoElement.paused || videoElement.ended) return

		// Set canvas dimensions to match video
		canvasElement.width = videoElement.videoWidth
		canvasElement.height = videoElement.videoHeight

		// Draw the current video frame to the canvas
		ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height)

		// Convert canvas to image data URL
		const imageDataUrl = canvasElement.toDataURL('image/png')

		// Add to gallery
		screenshotGallery = [
			...screenshotGallery,
			{
				id: Date.now(),
				src: imageDataUrl,
				timestamp: formatTime(videoElement.currentTime)
			}
		]
	}

	// Format time in seconds to MM:SS format
	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = Math.floor(seconds % 60)
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
	}

	// Format bytes to human-readable size
	function formatFileSize(bytes) {
		if (bytes === 0) return '0 Bytes'

		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))

		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
	}

	// Calculate megabytes from bytes
	function bytesToMB(bytes) {
		return (bytes / (1024 * 1024)).toFixed(2)
	}

	// Toggle automatic screenshot capture
	function toggleAutoCapture() {
		if (isAutoCapturing) {
			clearInterval(intervalId)
			intervalId = null
		} else {
			intervalId = setInterval(takeScreenshot, captureInterval)
		}
		isAutoCapturing = !isAutoCapturing
	}

	// Update capture interval
	function updateCaptureInterval(event) {
		captureInterval = event.target.value * 1000 // Convert to milliseconds
		if (isAutoCapturing) {
			clearInterval(intervalId)
			intervalId = setInterval(takeScreenshot, captureInterval)
		}
	}

	// Download a screenshot
	function downloadScreenshot(imageDataUrl, timestamp) {
		const a = document.createElement('a')
		a.href = imageDataUrl
		a.download = `screenshot-${timestamp.replace(':', '-')}.png`
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}

	// Clear all screenshots
	function clearScreenshots() {
		screenshotGallery = []
	}

	// Handle video loaded
	function handleVideoLoaded() {
		videoLoaded = true
	}

	// Clean up on component unmount
	onMount(() => {
		canvasElement = document.createElement('canvas')
		ctx = canvasElement.getContext('2d')

		return () => {
			if (videoUrl) URL.revokeObjectURL(videoUrl)
			if (intervalId) clearInterval(intervalId)
		}
	})
</script>

<div class="main">
	<div class="page bg-base-100 nwp">
		<div class="content">
			<!-- 			<header class="flex items-center justify-between gap-4">
				<h1 class="text-xl font-bold">Editor</h1>
				<NavBar></NavBar>
			</header> -->
			<div>
				<header class="flex items-center justify-between gap-4 py-4">
					<label class="btn btn-sm btn-info">
						<span> Upload Video File </span>
						<input
							id="video-upload"
							class="sr-only"
							type="file"
							accept="video/*"
							onchange={handleFileUpload} />
					</label>

					{#if videoFile}
						<span class="text-sm font-light">
							File: {videoFile.name} ({bytesToMB(videoFile.size)} MB)
						</span>
					{/if}
				</header>

				{#if videoUrl}
					<div class="mb-6">
						<div class="relative overflow-hidden rounded-lg bg-black">
							<video
								bind:this={videoElement}
								src={videoUrl}
								controls
								volume={0.1}
								onloadeddata={handleVideoLoaded}
								class="mx-auto max-h-[60vh] w-full">
								Your browser does not support the video tag.
								<track kind="captions" />
							</video>
						</div>

						{#if videoLoaded}
							<div class="mt-4 flex flex-wrap gap-4">
								<button onclick={takeScreenshot} class="btn">
									Take Screenshot
								</button>

								<button
									onclick={toggleAutoCapture}
									class="btn {isAutoCapturing ? 'btn-error' : 'btn-info'}">
									{isAutoCapturing ? 'Stop Auto Capture' : 'Start Auto Capture'}
								</button>

								{#if screenshotGallery.length > 0}
									<button
										onclick={clearScreenshots}
										class="rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700">
										Clear All Screenshots
									</button>
								{/if}
							</div>

							<div class="mt-4">
								<label for="interval" class="mb-2 block font-medium">
									Auto Capture Interval (seconds): {captureInterval / 1000}
								</label>
								<input
									id="interval"
									type="range"
									min="0.1"
									max="10"
									step="0.1"
									value={captureInterval / 1000}
									oninput={updateCaptureInterval}
									class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200" />
							</div>
						{/if}
					</div>

					{#if screenshotGallery.length > 0}
						<div class="mt-8">
							<h2 class="mb-4 text-2xl font-bold">
								Screenshots ({screenshotGallery.length})
							</h2>
							<div
								class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
								{#each screenshotGallery as screenshot (screenshot.id)}
									<div class="overflow-hidden rounded-lg border">
										<img
											src={screenshot.src || '/placeholder.svg'}
											alt={`Screenshot at ${screenshot.timestamp}`}
											class="h-auto w-full" />
										<div
											class="flex items-center justify-between bg-gray-100 p-2">
											<span class="text-sm font-medium"
												>{screenshot.timestamp}</span>
											<button
												onclick={() =>
													downloadScreenshot(
														screenshot.src,
														screenshot.timestamp
													)}
												class="text-blue-600 hover:text-blue-800">
												Download
											</button>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				{:else}
					<div class="rounded-lg bg-gray-100 p-8 text-center">
						<p class="text-lg">Upload a video file to get started</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
<aside class="aside bg-base-200 p-4">
	<div class="avatar avatar-placeholder">
		<div class="bg-neutral text-neutral-content w-8 rounded-full">
			<span class="text-xs">UI</span>
		</div>
	</div>
</aside>
<aside class="aside-dock bg-base-200 p-4">
	<div class="avatar avatar-placeholder">
		<div class="bg-accent text-accent-content w-8 rounded-full">
			<span class="text-xs">DB</span>
		</div>
	</div>
</aside>
