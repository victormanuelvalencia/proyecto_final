// Cargar el archivo CSV y generar las visualizaciones
d3.csv("data/modern-renewable-energy-consumption.csv").then(function(data) {
    // Convertir los campos relevantes a números
    data.forEach(function(d) {
        d["Geo Biomass Other - TWh"] = +d["Geo Biomass Other - TWh"];
        d["Solar Generation - TWh"] = +d["Solar Generation - TWh"];
        d["Wind Generation - TWh"] = +d["Wind Generation - TWh"];
        d["Hydro Generation - TWh"] = +d["Hydro Generation - TWh"];
        d.Year = +d.Year;
    });

    // Definir ancho dinámico basado en el contenedor
    function getWidth(selector) {
        return d3.select(selector).node().getBoundingClientRect().width;
    }

    // Función para actualizar el gráfico de barras para "Solar Generation - TWh"
    function drawBarChart() {
        const width = getWidth("#grafico-barra");
        const height = 400;

        const svgBarra = d3.select("#grafico-barra")
            .html("") // Limpiar el contenido previo
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.Year))
            .range([50, width - 50])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d["Solar Generation - TWh"])])
            .range([height - 50, 50]);

        svgBarra.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.Year))
            .attr("y", d => yScale(d["Solar Generation - TWh"]))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - 50 - yScale(d["Solar Generation - TWh"]))
            .attr("fill", "steelblue");

        svgBarra.append("g")
            .attr("transform", `translate(0, ${height - 50})`)
            .call(d3.axisBottom(xScale));

        svgBarra.append("g")
            .attr("transform", "translate(50, 0)")
            .call(d3.axisLeft(yScale));

        svgBarra.append("text")
            .attr("transform", `translate(${width / 2}, ${height - 10})`)
            .style("text-anchor", "middle")
            .text("Año");

        svgBarra.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", 15)
            .style("text-anchor", "middle")
            .text("Generación Solar (TWh)");
    }

    // Función para actualizar el gráfico de líneas para "Wind Generation - TWh"
    function drawLineChart() {
        const width = getWidth("#grafico-linea");
        const height = 400;

        const svgLinea = d3.select("#grafico-linea")
            .html("") // Limpiar el contenido previo
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.Year))
            .range([50, width - 50]);

        const yScaleWind = d3.scaleLinear()
            .domain([0, d3.max(data, d => d["Wind Generation - TWh"])])
            .range([height - 50, 50]);

        const line = d3.line()
            .x(d => xScale(d.Year))
            .y(d => yScaleWind(d["Wind Generation - TWh"]));

        svgLinea.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "orange")
            .attr("stroke-width", 2)
            .attr("d", line);

        svgLinea.append("g")
            .attr("transform", `translate(0, ${height - 50})`)
            .call(d3.axisBottom(xScale));

        svgLinea.append("g")
            .attr("transform", "translate(50, 0)")
            .call(d3.axisLeft(yScaleWind));

        svgLinea.append("text")
            .attr("transform", `translate(${width / 2}, ${height - 10})`)
            .style("text-anchor", "middle")
            .text("Año");

        svgLinea.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", 15)
            .style("text-anchor", "middle")
            .text("Generación Eólica (TWh)");
    }

    // Funciones para otros gráficos similares...
    function drawBiomassBarChart() {
        const width = getWidth("#grafico-barra-biomass");
        const height = 400;

        const svgBarraBiomass = d3.select("#grafico-barra-biomass")
            .html("")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.Year))
            .range([50, width - 50])
            .padding(0.1);

        const yScaleBiomass = d3.scaleLinear()
            .domain([0, d3.max(data, d => d["Geo Biomass Other - TWh"])])
            .range([height - 50, 50]);

        svgBarraBiomass.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.Year))
            .attr("y", d => yScaleBiomass(d["Geo Biomass Other - TWh"]))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - 50 - yScaleBiomass(d["Geo Biomass Other - TWh"]))
            .attr("fill", "green");

        svgBarraBiomass.append("g")
            .attr("transform", `translate(0, ${height - 50})`)
            .call(d3.axisBottom(xScale));

        svgBarraBiomass.append("g")
            .attr("transform", "translate(50, 0)")
            .call(d3.axisLeft(yScaleBiomass));

        svgBarraBiomass.append("text")
            .attr("transform", `translate(${width / 2}, ${height - 10})`)
            .style("text-anchor", "middle")
            .text("Año");

        svgBarraBiomass.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", 15)
            .style("text-anchor", "middle")
            .text("Generación de Biomasa (TWh)");
    }

    function drawHydroLineChart() {
        const width = getWidth("#grafico-linea-hydro");
        const height = 400;

        const svgLineaHydro = d3.select("#grafico-linea-hydro")
            .html("")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.Year))
            .range([50, width - 50]);

        const yScaleHydro = d3.scaleLinear()
            .domain([0, d3.max(data, d => d["Hydro Generation - TWh"])])
            .range([height - 50, 50]);

        const lineHydro = d3.line()
            .x(d => xScale(d.Year))
            .y(d => yScaleHydro(d["Hydro Generation - TWh"]));

        svgLineaHydro.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", lineHydro);

        svgLineaHydro.append("g")
            .attr("transform", `translate(0, ${height - 50})`)
            .call(d3.axisBottom(xScale));

        svgLineaHydro.append("g")
            .attr("transform", "translate(50, 0)")
            .call(d3.axisLeft(yScaleHydro));

        svgLineaHydro.append("text")
            .attr("transform", `translate(${width / 2}, ${height - 10})`)
            .style("text-anchor", "middle")
            .text("Año");

        svgLineaHydro.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", 15)
            .style("text-anchor", "middle")
            .text("Generación Hidroeléctrica (TWh)");
    }

    // Llama a las funciones iniciales
    drawBarChart();
    drawLineChart();
    drawBiomassBarChart();
    drawHydroLineChart();

    // Actualizar las gráficas al redimensionar la ventana
})

// Simulador Energético
document.getElementById("form-simulador").addEventListener("submit", function(event) {
    event.preventDefault();

    const consumo = document.getElementById("consumo").value;

    // Aquí va la lógica para el cálculo energético (ejemplo básico)
    const resultado = (consumo * 0.3).toFixed(1); // Redondea a 1 decimal

    document.getElementById("resultado-simulador").textContent = `El ${resultado}% de tu consumo podría ser cubierto por energías renovables.`;
});
