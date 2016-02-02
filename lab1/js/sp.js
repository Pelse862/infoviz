function sp(){

    var self = this; // for internal d3 functions

    var spDiv = $("#sp");

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = spDiv.width() - margin.right - margin.left,
        height = spDiv.height() - margin.top - margin.bottom;

    //initialize color scale
  
    var color = d3.scale.category20();

    //initialize tooltip
    var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("#sp").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Load data
    d3.csv("data/OECD-better-life-index-hi.csv", function(error, data) {
        self.data = data;
        
        //define the domain of the scatter plot axes
        //...
        x.domain([0, d3.max(data, function(d)
        { 
            return d["Personal earnings"]; 
        })]);  
        y.domain([0, d3.max(data, function(d)
        { 
            return d["Self-reported health"];
        })]);
        
        draw();

    });

    function draw()
    {
        
        // Add x axis and title.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width-300)
            .attr("y", -6)
                .text("Personal earnings");
        // Add y axis and title.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("dy", ".71em")
            .attr("x", -300)
                .text("Self-reported health");

        // Add the scatter dots.
        svg.selectAll(".dot")
            .data(self.data)
            .enter().append("circle")
            .attr("class", "dot")
            //Define the x and y coordinate data values for the dots
            .attr("cx", function(d) {
                return x(d["Personal earnings"]); //Load data
            })
            .attr("cy", function(d) {
                return y(d["Self-reported health"]); //Load data
            })
            .attr("r", 5.5)
            .style("fill", function(d) { return color(d["Country"]);})
            
            //...
            //tooltip
            .on("mousemove", function(d) {
                 div.transition()       
                .duration(200)      
                .style("opacity", .9);      
            div .html( d["Country"] + "<br/>"  + "is its namo" )  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");        
            })
            .on("mouseout", function(d) {
                 div.transition()       
                .duration(500)      
                .style("opacity", 0);   
            })
            .on("click",  function(d) {
                sp1.selectDot(d["Country"]); 
                selFeature(d["Country"]);  
            });
    }

    //method for selecting the dot from other components
    this.selectDot = function(value){
         d3.selectAll(".dot")
        .style("opacity", function(d) {
            if(value.indexOf(d["Country"]) != -1)
                return 1.0;  
            else 
                return 0.15;
        });
       
        return value;
        
    };
    
    //method for selecting features of other components
    function selFeature(value){
        pc1.selectLine(value);
    }

}




