import React, { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

const BarChart = ({ trueData, falseData }) => {
  const data = [trueData.length, falseData.length];
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    svg.selectAll('*').remove(); 

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = scaleBand()
      .domain(['Completed', 'Not Completed'])
      .range([0, width])
      .padding(0.1);

    const yScale = scaleLinear().domain([0, Math.max(...data)]).range([height, 0]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .style('fill', (d, i) => (i === 0 ? 'steelblue' : 'orange'))
      .attr('x', (d, i) => xScale(i === 0 ? 'Completed' : 'Not Completed'))
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d));

    g.selectAll('.bar-text')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'bar-text')
      .attr('x', (d, i) => xScale(i === 0 ? 'Completed' : 'Not Completed') + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d) - 5)
      .attr('text-anchor', 'middle')
      .text((d) => (d === 0 ? '' : d));

    g.append('g').attr('transform', `translate(0, ${height})`).call(xAxis);
    g.append('g').call(yAxis);
  }, [data]);

  return <svg ref={svgRef} width={400} height={200}></svg>;
};

export default BarChart;
