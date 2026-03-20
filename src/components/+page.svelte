<!-- +page.svelte -->
<script>
    import Card from '../components/Card.svelte';
    import ChartLine from '../components/ChartLine.svelte';
    import Gauge from '../components/Gauge.svelte';
</script>

<div class="grid">
    <Card title="Performance">
        <ChartLine />
    </Card>

    <Card title="Usage">
        <Gauge value={70} />
    </Card>

    <Card title="Stats">
        <p>Some stats here...</p>
    </Card>
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding: 20px;
    }
</style>
