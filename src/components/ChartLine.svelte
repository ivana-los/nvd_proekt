<!-- ChartLine.svelte -->
<script>
    import { Line } from 'svelte-chartjs';

    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [{
            label: "Sales",
            data: [10, 30, 20, 50, 40],
            borderColor: "#ff6a00",
            backgroundColor: "rgba(255,106,0,0.2)",
            tension: 0.4
        }]
    };
</script>

<Line {data} />