/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = { left:80, right:20, top:50, bottom:100 };

var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.json("/data/revenues.json").then(function(data){
    data.forEach(e => {
        e.revenue = +e.revenue;
        e.profit = +e.profit;
    });
    renderBar(data); // Passing the data to the renderBar function for rendering the bar Chart
});

function renderBar(data){ 
    // The function to create the bar chart 
    console.log(data);
    g.append("text")
        .attr("class","X-Axis-lable")
        .attr("x",width/2.5)
        .attr("y",height+40)
        .text("Months");

    g.append("text")
        .attr("class","Y-Axis-lable")
        .attr("x",-(height/2))
        .attr("y",-50)
        .attr("transform","rotate(-90)")
        .text("The revenue");

    var yscale = d3.scaleLinear()
                    .domain([0,d3.max(data,function(d){ return d.revenue; })])
                    .range([height,0]);

    console.log(yscale(30000)); //checking the Y-scale

    var xscale = d3.scaleBand()
                    .domain(data.map(function(d){return d.month; }))
                    .range([0,width])
                    .paddingInner(0.3)
                    .paddingOuter(0.3);

    console.log(xscale("January")); // Checking the X-Scale

    var leftAxisCall = d3.axisLeft(yscale)

    var bottomAxisCall = d3.axisBottom(xscale)

    g.append("g")
            .attr("class","bottom-Axis")
            .attr("transform","translate(0,"+height+")")
            .call(bottomAxisCall);

    g.append("g")
        .attr("class","left-Axis")
        //.attr("transform","translate(50,0)")
        .call(leftAxisCall);

    var bar = g.selectAll("rect")  // Creating the rect for the bars
        .data(data)
        .enter()
        .append("rect")
            .attr("width",xscale.bandwidth)
            .attr("height",function(d){
                return height - yscale(d.revenue);
            })
            .attr("x",function(d){
                return xscale(d.month);
            })
            .attr("y",function(d){
                return yscale(d.revenue);
            })
            .attr("fill","grey");
    
}