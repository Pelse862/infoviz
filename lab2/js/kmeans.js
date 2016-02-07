    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   
    function kmeans(data, k) {
        
        //...
        var cycle = 0;
        var breakCondition = true;
		var cycleTracker = [];
		for(var i=0; i<k; i++) {
			cycleTracker[i] = [];
		}

		do{
			//	Initial Step
			//_________________________________________________________
			var kList = {};
			var trackList = [];
			for(var i=0; i<k; i++) {
				trackList[i] = [];
			}
			//store index to which the line i closest
			var closestToIndex = {};
			
			//get random line as initial k
			for(var i=0; i<k; i++) {
				kList[i] = data[Math.floor(Math.random() * data.length) + 0];
			}
			
			
			var count = 0;
			//do for each line
	        data.forEach(function(d){
				
				var distance = {}; 
				var smallestDistIndex = 0;
				
				//calculate distance to kCenter point
				for(var i=0; i<k; i++){
					distance[i] =  Math.sqrt( Math.pow(( kList[i].A - d.A ) , 2) +
														Math.pow(( kList[i].B - d.B ) , 2) +
														Math.pow(( kList[i].C - d.C ) , 2) );
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
				

				kList[i].A = sumDistA/trackList[i].length;
				kList[i].B = sumDistB/trackList[i].length;
				kList[i].C = sumDistC/trackList[i].length;
				
			}


			//Step3
			//________________________________________________________
			//check qualit of cluster using sum of square distances
			
		
			for(var i=0; i<k; i++) {
				var sumOfSquareA = 0;
				var sumOfSquareB = 0;
				var sumOfSquareC = 0;
		
				trackList[i].forEach(function(d){
					sumOfSquareA += Math.pow( parseFloat(d.A) - kList[i].A ,2)
				
					sumOfSquareB += Math.pow( parseFloat(d.B) - kList[i].B ,2)
					sumOfSquareC += Math.pow( parseFloat(d.C) - kList[i].C ,2)
				})
				cycleTracker[i][cycle] = [sumOfSquareA,sumOfSquareB,sumOfSquareC];

			}
	
			if(cycle != 0 ){
				var dist = {};
				for(var i=0; i<k; i++) {
					dist[i]= (cycleTracker[i][cycle-1][0] - cycleTracker[i][cycle][0])+
							 (cycleTracker[i][cycle-1][1] - cycleTracker[i][cycle][1])+  
							 ( cycleTracker[i][cycle-1][2] - cycleTracker[i][cycle][2]);
							 
				}
				
				var c = 0;
				console.log(dist);
				for(var i=0; i<k; i++) {
					if(dist[i] < k){
						c++;
					}
				}
				
		
				if( c == k){
					breakCondition = false;
				}
				else{
					breakCondition = true;
				}
				
			}
			console.log(cycle);
			cycle++;
			

		}while(breakCondition)

    };