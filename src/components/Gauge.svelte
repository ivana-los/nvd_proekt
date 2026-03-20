<!-- Gauge.svelte -->
<script>
    export let value = 75;
</script>

<svg width="120" height="120">
    <circle
            cx="60" cy="60" r="50"
            stroke="#222"
            stroke-width="10"
            fill="none"
    />
    <circle
            cx="60" cy="60" r="50"
            stroke="#ff6a00"
            stroke-width="10"
            fill="none"
            stroke-dasharray="314"
            stroke-dashoffset="{314 - (314 * value) / 100}"
    />
</svg>