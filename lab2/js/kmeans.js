    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */

	Object.size = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};

    function kmeans(data, k) {
        
        //init variables
        var cycle = 0;
        var distance = []; 
        var breakCondition = true;
		var cycleTracker = [];
		var kList = [];
		var trackList = [];
		
		//	Initial Step
		//_________________________________________________________

		//get dimenson of dataSet
		
		var dimension = Object.size(data[0]);
		var key = Object.keys(data[0]);
		
		


		//Get random line as initial k
		for(var cou=0; cou<k; cou++) 
		{
			cycleTracker[cou] = [];
			trackList[cou] = [];
			var random =  data[ Math.floor(Math.random()* data.length)];
			var values = []
			var temp = 0;
			Object.keys(random).forEach(function(d){
				values[temp] = parseFloat(random[d]);	
				temp++;
			
			})

			kList[cou] = values;
			console.log( "klist :  " +kList);
		}
	
	
		//store index to which the line i closest
		var closestToIndex = {};
		
		
		do
		{
			
			var count = 0;
			//do for each line
	        data.forEach(function(d){ 
				
				var distance = []; 
				var smallestDistIndex = 0;
				
				//calculate distance to kCenter point
				for(var i=0; i<k; i++){
					distance[i] = 0;
					var temp = 0;
					Object.keys(d).forEach(function(dim){
						distance[i] +=  Math.sqrt( Math.pow(( kList[i][temp] - d[dim] ) , 2));										
						temp++;
					})
					if(distance[i] < distance[smallestDistIndex])
						smallestDistIndex = i;
				}

				
				closestToIndex[count] = smallestDistIndex;
				
				trackList[smallestDistIndex][count] = d;
				
				count++;
			})

			


			// Step 2
			//_________________________________________________________
		
			for(var i=0; i<k; i++) {
				var sumDist = [];
				for(var n = 0; n < dimension; n++){sumDist[n] = 0;}
				var numberOfElements = 0;
				//calculate new K centroids for each cluster
				trackList[i].forEach(function(d){
					var temp = 0;
					Object.keys(d).forEach(function(dim){
						sumDist[temp] += parseFloat(d[dim]);
						temp++;
					})

					numberOfElements += 1;

				})

				//NaN failsafe
				if(numberOfElements == 0){
					numberOfElements=1;
				}
				for(var n = 0; n < dimension; n ++){
					kList[i][n] = sumDist[n]/numberOfElements;
				}
				
			}



			//Step3
			//________________________________________________________
			//check qualit of cluster using sum of square distances
			
			for(var i=0; i<k; i++) {
				var sumOfSquare = [];
				for(var n = 0; n < dimension; n++){sumOfSquare[n] = 0;}
		
				trackList[i].forEach(function(d){
					var temp = 0;
					Object.keys(d).forEach(function(dim){
						sumOfSquare[temp] += Math.pow( parseFloat(d[dim]) - kList[i][temp] ,2)
						temp++;
					})
				})
				
				cycleTracker[i][cycle] = sumOfSquare;
			}
			


			if(cycle != 0 )
			{
				var dist = [];
				for(var i=0; i<k; i++) {
					for(var n=0; n<dimension; n++) {
						dist[i] += Math.abs(cycleTracker[i][cycle-1][n] - cycleTracker[i][cycle][n]);		  
					}				 
				}
				
				
				//Step 4 Validate distance?
				//_______
				var c = 0;
			
				for(var i=0; i<k; i++) {
					if(isNaN(dist[i]) || dist[i] < 0)dist[i] = 0;
					if(dist[i] < 0.01){
						c++;
					}
				}
				
				//if no one has a differance greater than 0.01 it's ok
				if( c == k){
					breakCondition = false;
				}
				else{
					breakCondition = true;
				}
				
			}
			
			cycle++;	

		}
		while(breakCondition)
		console.log(kList);

		return closestToIndex;
		
		
    };