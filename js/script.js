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

    // Gráfico de barras para "Solar Generation - TWh"
    const svgBarra = d3.select("#grafico-barra")
        .append("svg")
        .attr("width", 600)
        .attr("height", 400);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Year))
        .range([50, 550]) // Ajustar para dejar espacio para las etiquetas
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d["Solar Generation - TWh"])])
        .range([350, 50]); // Ajustar para dejar espacio para las etiquetas

    svgBarra.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Year))
        .attr("y", d => yScale(d["Solar Generation - TWh"]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => 350 - yScale(d["Solar Generation - TWh"]))
        .attr("fill", "steelblue");

    // Añadir ejes
    svgBarra.append("g")
        .attr("transform", "translate(0, 350)") // Mover el eje a la parte inferior
        .call(d3.axisBottom(xScale));

    svgBarra.append("g")
        .attr("transform", "translate(50, 0)") // Mover el eje izquierdo
        .call(d3.axisLeft(yScale));

    // Añadir etiquetas a los ejes
    svgBarra.append("text")
        .attr("transform", "translate(300, 390)") // Centrar bajo el gráfico
        .style("text-anchor", "middle")
        .text("Año");

    svgBarra.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -200)
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("Generación Solar (TWh)");

    // Gráfico de líneas para "Wind Generation - TWh"
    const svgLinea = d3.select("#grafico-linea")
        .append("svg")
        .attr("width", 600)
        .attr("height", 400);

    const yScaleWind = d3.scaleLinear()
        .domain([0, d3.max(data, d => d["Wind Generation - TWh"])])
        .range([350, 50]);

    const line = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScaleWind(d["Wind Generation - TWh"]));

    svgLinea.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 2)
        .attr("d", line);

    // Añadir ejes
    svgLinea.append("g")
        .attr("transform", "translate(0, 350)")
        .call(d3.axisBottom(xScale));

    svgLinea.append("g")
        .attr("transform", "translate(50, 0)")
        .call(d3.axisLeft(yScaleWind));

    // Añadir etiquetas a los ejes del gráfico de líneas
    svgLinea.append("text")
        .attr("transform", "translate(300, 390)")
        .style("text-anchor", "middle")
        .text("Año");

    svgLinea.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -200)
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("Generación Eólica (TWh)");
});

// Simulador Energético
document.getElementById("form-simulador").addEventListener("submit", function(event) {
    event.preventDefault();

    const consumo = document.getElementById("consumo").value;

    // Aquí va la lógica para el cálculo energético (ejemplo básico)
    const resultado = consumo * 0.3; // Ejemplo: 30% puede ser energía renovable

    document.getElementById("resultado-simulador").textContent = `El ${resultado}% de tu consumo podría ser cubierto por energías renovables.`;
});
