import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ tasks }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (tasks.length > 0) {
      drawChart();
    }
  }, [tasks]);
  const drawChart = () => {
    const taskCounts = {};
    tasks.forEach((task) => {
      const dueDate = task.dueDate;
      if (taskCounts[dueDate]) {
        taskCounts[dueDate]++;
      } else {
        taskCounts[dueDate] = 1;
      }
    });
  
    // Convert taskCounts object into an array of objects
    const data = Object.keys(taskCounts).map((dueDate) => ({
      dueDate,
      count: taskCounts[dueDate],
    }));
  
    // Set up the pie layout
    const pie = d3.pie().value((d) => d.count);
  
    // Generate the arc data for each slice
    const arc = d3.arc().innerRadius(0).outerRadius(150);
  
    // Set up color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    // Calculate the angles and arcs for each slice
    const arcs = pie(data);
  
    // Clear any existing chart
    d3.select(chartRef.current).select("svg").remove();
  
    // Create the SVG element
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", 400)
      .attr("height", 400);
  
    // Create a group for the pie chart
    const pieGroup = svg.append("g").attr("transform", "translate(200, 200)");
  
    // Draw the slices
    const slices = pieGroup
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => color(i));
  
    // Format the date labels
    const formatDate = d3.timeFormat("%Y-%m-%d"); // Customize the date format as per your requirements
  
    // Add text labels to the slices
    const textLabels = pieGroup
      .selectAll("text")
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", (d) => {
        const centroid = arc.centroid(d);
        const x = centroid[0] * 1.5; // Adjust the multiplier to change the position of the labels
        const y = centroid[1] * 1.5; // Adjust the multiplier to change the position of the labels
        return `translate(${x}, ${y})`;
      })
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .text((d) => formatDate(new Date(d.data.dueDate)));
  
    // Ensure labels stay within SVG boundaries
    textLabels.each(function () {
      const text = d3.select(this);
      const bbox = text.node().getBBox();
      const labelWidth = bbox.width;
      const labelHeight = bbox.height;
      const centerX = 200;
      const centerY = 200;
      const radius = 150;
      const labelX = parseFloat(text.attr("x"));
      const labelY = parseFloat(text.attr("y"));
  
      const distance = Math.sqrt(Math.pow(labelX - centerX, 2) + Math.pow(labelY - centerY, 2));
  
      if (distance + Math.max(labelWidth, labelHeight) / 2 > radius) {
        const angle = Math.atan2(labelY - centerY, labelX - centerX);
        const newLabelX = Math.cos(angle) * (radius - labelWidth / 2);
        const newLabelY = Math.sin(angle) * (radius - labelHeight / 2);
        text.attr("x", newLabelX).attr("y", newLabelY);
      }
    });
  };
  
  return <div ref={chartRef}></div>;
};

export default PieChart;
