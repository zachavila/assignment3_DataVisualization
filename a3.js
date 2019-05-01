/*Zachary Avila
Professor Koop
Data Visualization
11/2/2018
 */

function createVis(data, divId, projection, w, h)
{
    //Create SVG element
    var mapSvg = d3.select(divId).append("svg")



        .attr("width", w)
        .attr("height", h);
    var path = d3.geoPath().projection(projection);

    // data.features
    //.data(data.features)
    //creates map
    mapSvg.append("path")
        .datum(data[0])
        .attr("d", path)
        .style("stroke", "black")
        .style("fill", "white");

   places = data[1]
    console.log(data[1])

    //draws circles based on longitude and latitude
    mapSvg.selectAll("circle")
        .data(data[1])
        .enter().append("circle")
        .attr("r", 2)
        .style("fill", "red")
        //.attr("cx",function(d) { return d.longitude; })
        //.attr("cy",function(d) { return d.latitude; })
        .attr("transform", function(d) {if([d.district]<=402 && [d.district]!= -999){return "translate(" + projection([d.longitude, d.latitude]) + ")"}})

}
function createExtra(data, divId, projection, w, h)
{
    //Create SVG element
    var mapSvg = d3.select(divId).append("svg")



        .attr("width", w)
        .attr("height", h);
    var path = d3.geoPath().projection(projection);

    // data.features
    //.data(data.features)

    //creates map
    mapSvg.append("path")
        .datum(data[0])
        .attr("d", path)
        .style("stroke", "black")
        .style("fill", "white");
    places = data[1]
    console.log(data[1])
        //gets number of bikes /10 to get a rough estimate
    var cValue = function(d) { return +d.availableBikes.substring(0, 1);},
        color = d3.scaleOrdinal(d3.schemeCategory10)

    //draws circles on map
    mapSvg.selectAll("circle")
        .data(data[1])
        .enter().append("circle")
        .attr("r", 2)
        .style("fill", function(d) { return color(cValue(d));})
        //.attr("cx",function(d) { return d.longitude; })
        //.attr("cy",function(d) { return d.latitude; })
        .attr("transform", function(d) {if([d.district]<=402 && [d.district]!= -999){return "translate(" + projection([d.longitude, d.latitude]) + ")"}})

//creates legend
    var legend = mapSvg.selectAll('.legend')
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
        .attr("x", w - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    // draw legend text
    legend.append("text")
        .attr("x", w - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})

}

function scatterplot(data){

    var margin = {top: 20, right: 15, bottom: 60, left: 60}
        , width = 960 - margin.left - margin.right
        , height = 650 - margin.top - margin.bottom;
    svg = margin;
    var x = d3.scaleLinear()
        .domain([0, d3.max(data[1], function(d) { return +d.availableBikes; })])
        .range([ 0, width ]);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data[1], function(d) { return +d.availableDocks; })])
        .range([ height, 0 ]);



    var chart = d3.select("#scatterplot")
        .append('svg:svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .attr('class', 'chart')

    //axis text
    chart.append("text")
        .attr("transform",
            "translate(" + (450) + " ," + (height+50) + ")")
        .style("text-anchor", "middle")
        .text("Available Bikes");
    chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -5)
        .attr("x",-250)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Available Docks");

    var main = chart.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'main')


    // draw the x axis
    var xAxis = d3.axisBottom()
        .scale(x);

    //draw the y axis
    var yAxis = d3.axisLeft()
        .scale(y);

    main.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .attr('class', 'main axis date')
        .call(xAxis);




    main.append('g')
        .attr('transform', 'translate(0,0)')
        .attr('class', 'main axis date')
        .call(yAxis);
    var cValue = function(d) { return +d.district.substring(0, 1);},
        color = d3.scaleOrdinal(d3.schemeCategory10)

    var g = main.append("svg:g");
    //draw points
    g.selectAll("scatter-dots")
        .data(data[1])
        .enter().append("svg:circle")
        .attr("cx", function (d,i) { if([d.district]<=402 && [d.district]!= -999){return x(d.availableBikes); }else {return -111111}} )
        .attr("cy", function (d) { if([d.district]<=402 && [d.district]!= -999){return y(d.availableDocks); }} )
        .style("fill", function(d) { if([d.district]<=402 && [d.district]!= -999){return color(cValue(d))};})
        .attr("r", 4);
    //draw legend
    var legend = g.selectAll('.legend')
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    // draw legend text
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})

}
function createCHmap(data, divId, projection, w, h)
{
    var Data1 = data[1];
    var districts = [];
    var percentages = [];
    //get total percentages
    for(i = 0; i < Data1.length; i++){
        if(districts.length == 0){
            districts.push({"district": Data1[i].district, "availableBikes": (Data1[i].availableBikes), "totalDocks":(Data1[i].totalDocks)});
        }
        else{
            for(var j = 0; j < districts.length; j++){
                    if(Data1[i].district == districts[j].district){
                        districts[j].availableBikes = +(Data1[i].availableBikes)+(+(districts[j].availableBikes));
                        districts[j].totalDocks = +(Data1[i].totalDocks)+(+(districts[j].totalDocks));
                    }}}
            districts.push({"district": Data1[i].district, "availableBikes": Data1[i].availableBikes, "totalDocks": Data1[i].totalDocks});
    }
    for(k = 0; k<districts.length; k++){
        percentages.push([districts[k].availableBikes/districts[k].totalDocks, +(districts[k].district)]);
    }

    //Create SVG element
    var mapSvg = d3.select(divId).append("svg")
        .attr("width", w)
        .attr("height", h);
    var path = d3.geoPath().projection(projection);
    //adds color value

    cValue = d3.scaleDiverging(d3.interpolateYlOrRd)
        .domain([0, .5, 1]);

//fills based on percentage over and below 50%
    mapSvg.selectAll("path")
        .data(data[0].features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function(d,i){
            // here we decided what color we should have as the district
            for(var j = 0; j<percentages.length; j++)
            {
                if(+(d.properties.communityDistrict) == percentages[j][1])
                {
                    return cValue(percentages[j][0])
                }
            }
        });

    var legend = mapSvg.selectAll('.legend')
        .data(cValue.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
        .attr("x", w - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", cValue);

    // draw legend text
    legend.append("text")
        .attr("x", w - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})




}

function processData(data) {
    //appropriate districts
    var districts = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 164, 301, 302, 303, 306, 307, 308, 309, 355, 401, 402];

    var w = 800;
    var h = 800;
    console.log(data[0]);
    //console.log(data[0].features[0].properties.communityDistrict)

//filters out unwanted districts
    var dist = data[0].features.filter(function (d) {
        if(districts.includes(d.properties.communityDistrict)){
            return data[0].features;
        }
    })

data[0].features = dist


    console.log(data[0])
    var projection1 = d3.geoMercator()
        .fitSize([w,h],data[0])

    //calls functions
    createVis(data, "#station-map", projection1, w, h);
    scatterplot(data);
    createCHmap(data, "#availability-map", projection1, w, h);
    createExtra(data, "#extracredit", projection1, w, h);
}

// this loads the data and calls the createVis function
Promise.all([d3.json("https://gitcdn.xyz/repo/dakoop/fb4d65af84db0ee3f2233e02cdeb1874/raw/9a819d894ff29f786b61b7c3d0fa18f84b244362/nyc-community-districts.geojson"),
    d3.csv("https://gitcdn.xyz/repo/dakoop/fb4d65af84db0ee3f2233e02cdeb1874/raw/bb31d4c41bda64891455a68741accdfef40aeef3/bikeStationData.json")]).then(processData)

