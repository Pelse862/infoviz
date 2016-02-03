    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
   
    function kmeans(data, k) {
        
        //...
		
		//	Initial Step
		//_________________________________________________________
		var kList = {};
		var trackList = [];
		trackList[0] = [];
		trackList[1] = [];
		
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
		
		console.log(trackList);
	
    };