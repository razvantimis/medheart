class NeuronalNetwork {
  nrInputNeurons = 7
  nrOutputNeurons = 2
  nrHiddenNeuronsLayer1 = 20
   
  weigthInHi = [
        [-9.573098, -1.4854251, -0.34228095, -2.188, 17.590433, -2.966979, -1.9279383, 4.57891, -49.276424, -4.6155014, 11.608291, 4.7270913, -2.7858176, 7.706456, -2.6397383, 6.35533, -1.1433047, -22.65124, 17.835024, -21.898973],
        [0.2483515, -1.5190632, -1.7150452, -2.5557055, -11.720865, -5.107694, 15.621923, 13.282229, 2.3397722, 7.376675, 23.802889, -2.2080932, -2.4761147, -2.7428408, -2.6668365, 5.87778, -4.3923755, 16.727673, -16.174446, 0.67657137],
        [-6.422541, -0.2777205, -0.749628, -0.9980169, -12.300958, -0.14952646, 12.776644, -12.798972, -4.9656396, -15.448471, 14.317688, 12.644759, -2.661813, -17.306833, -0.90581167, -28.593864, -0.4004268, -3.5342298, -12.460987, 4.161298],
        [23.185585, -1.0198706, -0.3207387, -1.5370146, -25.336412, -1.2390047, -22.578358, 3.8083327, -2.6644697, -22.265263, -12.301022, 1.0656025, 0.9732381, -24.744648, -1.4760087, 17.718428, 0.04497512, 22.717663, 17.311178, -4.1954823],
        [2.3458107, 0.13394673, -0.6536818, 0.6990805, 6.1917477, 2.370639, 13.494462, 1.4997334, 10.772226, 0.32872236, 7.845608, -2.9320097, 1.2877098, 6.02357, 0.56244326, 3.0599983, 2.3410704, 10.773295, -3.4313521, 5.315084],
        [-8.254946, 0.19694941, -1.1232246, 0.14780536, -5.8573914, -1.018553, -1.2071697, 0.6124702, 12.610225, 4.008475, 4.838472, 1.8393154, -0.22234412, 1.7743182, -0.2530344, 5.003095, 0.37119505, 0.47336456, -5.4045267, 1.3997903],
        [2.3872027, -0.49657783, -0.59451115, -0.65915066, 20.327553, -0.31158602, 17.183147, -1.4500426, 2.2190537, -29.141039, -20.317497, -10.486786, -0.14431284, -9.670832, -0.071316816, -24.396206, 2.323083, -13.577768, -2.0398955, 21.17665],
        [-4.947247, -1.2365482, -1.1491361, -0.6066291, -4.196211, 0.883142, -23.384312, -10.305964, 14.173188, 13.529718, -25.661648, -9.977982, -1.5754492, 13.865376, -1.1409775, 3.3092198, 2.1042404, -7.213176, -1.2133014, -5.0075407]
  ]

  weigthHiOut = [
        [15.9121, -15.905203],
        [0.796673, -0.30836272],
        [0.10060323, -0.50064325],
        [0.8345794, -1.4834586],
        [29.081535, -29.075089],
        [2.467528, -2.1201682],
        [14.971537, -14.976499],
        [-12.122942, 12.107453],
        [23.092579, -23.090641],
        [16.873798, -16.881227],
        [-27.263641, 27.253918],
        [8.482291, -8.444574],
        [1.0050452, -0.90902126],
        [-18.93505, 18.93499],
        [0.7532904, -1.1998148],
        [19.988972, -19.986906],
        [3.6635718, -3.7006602],
        [-25.721722, 25.72218],
        [-15.118883, 15.124275],
        [-22.774315, 22.777853],
        [3.7341385, -3.7119958]
  ]
  activationF(x) {
    return 1.0 / (1.0 + Math.exp(-x));
  }

  propagateForwardOnLayer(inValues,weigths) {
    let out = new Array(weigths[0].length);
    for (let i = 0; i < out.length; i++) {
			// initializam cu bias-ul
      let sum = weigths[weigths.length - 1][i];
      for (let j = 0; j < weigths.length - 1; j++) {
        sum = sum + inValues[j] * weigths[j][i];
      }
      out[i] = this.activationF(sum);
    }
    return out;
  }
  forwardPropagation(inValues) {
    if (inValues.length != this.nrInputNeurons) {
        // throw error
    }
    let result = {};
		// calculam iesirile din stratul hidden
    let hiddenOuts = this.propagateForwardOnLayer(inValues, this.weigthInHi);
    result.hiddenResults = hiddenOuts;

		// calculam iesirile din stratul out
    let outputs = this.propagateForwardOnLayer(hiddenOuts, this.weigthHiOut);
    result.outputs = outputs;
    return result;
  }
    /**
	 * Face predictia
	 * @param inValues
	 * @return returneaza probabilitatea 
	 */
  predict(inValues) {
  
    
    let data = this.normalization(inValues);
    let rez = this.forwardPropagation(data);
    let outputs = rez.outputs;
    let maxPoz = 0;
    
    for (let i = 0; i < outputs.length; i++) {
      if (outputs[i] > outputs[maxPoz]) {
        maxPoz = i;
      }
    }
    
    let ret = 0.0;
    if(maxPoz == 1) {
      ret = outputs[maxPoz];
    }else{
      ret = (1 - outputs[maxPoz]);
    }

    return ret;
  }
  normalization(inValues){
    
    let ageMin = 18.0;
    let ageMax = 77.0;
    //let ageFrequent = 60.0;
	
  // (M=1)(F=0) min 0 max 1
    let genderMin = 0.0;
    let genderMax = 1.0;
    //let genderFrequent = 1.0;
	
	// --Value 1:typical angina
	// --Value 2: atypical anginal
	// --Value 3: non-anginal pain
	// --Value 4: asymptotic
	// min 1 max 4 . 4 type
    let chestPainTypeMin = 1.0;
    let chestPainTypeMax = 4.0;
    //let chestPainTypeFrequent = 4.0;

	// min 94 and max 200 real
    let restingBloodPressureMin = 90.0;
    let restingBloodPressureMax = 200.0;
    //let restingBloodPressureFrequent = 130.0;
	

    let cholesterolMin = 120.0;
    let cholesterolMax = 570.0;
    //let cholesterolFrequent = 210.0;
	
	// (fasting blood sugar > 120 mg/dl) (1 = true; 0 = false)
    let fastingBloodSugarMin = 0;
    let fastingBloodSugarMax = 1;
    //let fastingBloodSugarFrequent = 0;
	
  // --Value 0: normal
	// --Value 1:having ST-T wave abnormality (T wave inversions and/or ST)
	// --Value 2:showing probable or definite left ventricular Hypertrophy by
	// Estes’ criteria
	// EGG min 0 max 2
    let restingECGMin = 0;
    let restingECGMax = 2;
    //let restingECGFrequent = 0;
	
  // 40 - 200 bpm min 71 and max 202
    let maximumHeartRateMin = 70.0;
    let maximumHeartRateMax = 200.0;
    //let maximumHeartRateFrequent = 155.0;

	// (1=yes;0=no)
    let exerciseInducedAnginaMin = 0.0;
    let exerciseInducedAnginaMax = 1.0;
    //let exerciseInducedAnginaFrequent = 0.0;
	
    let oldPeakMin = 0.0;
    let oldPeakMax = 6.2;
    //let oldPeakFrequent = 0.3;
	
  // --Value 1: up sloping
	// --Value 2: flat
	// --Value 3:down sloping
	// min 1 max 3
    let slopMin = 1.0;
    let slopMax = 3.0;
    //let slopFrequent = 1;
	
  // --(0-3) min 0 , max 3
    let numberOfVesselsColoredMin = 0.0;
    let numberOfVesselsColoredMax = 3.0;
    //let numberOfVesselsColoredFrequent = 0.0;
	
	// Normal, fixed defect, reversible defect --3,6,7
    let thalMin = 3.0;
    let thalMax = 7.0;
    //let thalFrequent = 3.0;
	
    let max = [ageMax,genderMax, chestPainTypeMax,
      restingBloodPressureMax, cholesterolMax, fastingBloodSugarMax,
      restingECGMax, maximumHeartRateMax, exerciseInducedAnginaMax,
      oldPeakMax, slopMax, numberOfVesselsColoredMax, thalMax];
    let min = [ageMin,genderMin, chestPainTypeMin,
      restingBloodPressureMin, cholesterolMin, fastingBloodSugarMin,
      restingECGMin, maximumHeartRateMin, exerciseInducedAnginaMin,
      oldPeakMin, slopMin, numberOfVesselsColoredMin, thalMin ];
		
    // normalizam datele

    for (let j = 0; j < inValues.length; j++) {
      let aux = max[j] - min[j];
      inValues[j] = (inValues[j] - min[j]) / aux;	
    }
    return inValues;

  }

  doTest() {
    let inValues = [65.0, 0.0, 3.0, 155.0, 269.0, 0.0, 0.0, 148.0, 0.0, 0.8, 1.0, 0.0, 3.0];
    //let inValues = [65.0, 0.0, 3.0, 155.0, 269.0, 0.0, 0.0, 148.0, 0.0, 0.8, 1.0, 0.0, 3.0]; //predicted 0
    //let inValues = [46.0, 1.0, 3.0, 150.0, 231.0, 0.0, 0.0, 147.0, 0.0, 3.6, 2.0, 0.0, 3.0] // predicted 1
   
    inValues = this.normalization(inValues);
    let ret = this.predict(inValues);
    return ret;
  }
}

export default NeuronalNetwork;