    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   
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

		//Get random line as initial k
		for(var cou=0; cou<k; cou++) 
		{
			cycleTracker[cou] = [];
			trackList[cou] = [];
			var random =  data[ Math.floor(Math.random()* data.length)];
			kList.push( [ parseFloat(random.A), parseFloat(random.B), parseFloat(random.C)] );

		}
	
		console.log(kList);
		//store index to which the line i closest
		var closestToIndex = {};
		

		do
		{
			
			var count = 0;
			//do for each line
	        data.forEach(function(d){ 
				
				distance = {}; 
				var smallestDistIndex = 0;
				
				//calculate distance to kCenter point
				for(var i=0; i<k; i++){
					distance[i] =  Math.sqrt( Math.pow(( kList[i][0] - d.A ) , 2) +
														Math.pow(( kList[i][1]  - d.B ) , 2) +
														Math.pow(( kList[i][2]  - d.C ) , 2) );
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
				var sumDistA = 0;
				var sumDistB = 0;
				var sumDistC = 0;
				var numberOfElements = 0;
				//calculate new K centroids for each cluster
				trackList[i].forEach(function(d){
					sumDistA += parseFloat(d.A);

					sumDistB += parseFloat(d.B);
					sumDistC +=  parseFloat(d.C);
					numberOfElements += 1;

				})

				//NaN failsafe
				if(numberOfElements == 0){
					numberOfElements=1;
				
				}

				kList[i][0] = sumDistA/numberOfElements;
				kList[i][1]= sumDistB/numberOfElements;
				kList[i][2] = sumDistC/numberOfElements;
				
			}



			//Step3
			//________________________________________________________
			//check qualit of cluster using sum of square distances
			
			for(var i=0; i<k; i++) {
				var sumOfSquareA = 0;
				var sumOfSquareB = 0;
				var sumOfSquareC = 0;
		
				trackList[i].forEach(function(d){
					sumOfSquareA += Math.pow( parseFloat(d.A) - kList[i][0] ,2)
					sumOfSquareB += Math.pow( parseFloat(d.B) - kList[i][1] ,2)
					sumOfSquareC += Math.pow( parseFloat(d.C) - kList[i][2] ,2)
				})

				cycleTracker[i][cycle] = [sumOfSquareA,sumOfSquareB,sumOfSquareC];

			}
			
			if(cycle != 0 )
			{
				var dist = {};
				for(var i=0; i<k; i++) {

					dist[i]= Math.abs(cycleTracker[i][cycle-1][0] - cycleTracker[i][cycle][0])+
							 (cycleTracker[i][cycle-1][1] - cycleTracker[i][cycle][1])+  
							 (cycleTracker[i][cycle-1][2] - cycleTracker[i][cycle][2]);
							 
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
		console.log(cycleTracker)


		return closestToIndex;
		
		
    };