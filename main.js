// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      let randomBase = () => {
        let takeOne = Math.floor(Math.random() * dna.length)
        return dna[takeOne];
      }

      let currentBase = randomBase();
      let basePosition = this.dna.indexOf(currentBase);
      let newBase = returnRandBase();
      let newDna;

      if (this.dna[basePosition] === newBase) {
        //continues to iterate until the base changes
        do {
          newBase = returnRandBase();
        }
        while (this.dna[basePosition] === newBase);
        newDna = newBase;
      }
      else if (this.dna[basePosition] !== newBase) {
        newDna = newBase;
      }
      this.dna[basePosition] = newDna;
      return this.dna;
    },
    compareDNA(pAequor) {
      let comparisonNum = 0;
      for (i = 0; i < pAequor['dna'].length; i++) {
        if (this.specimenNum === pAequor.specimenNum) {
          return 'Same specimen numbers!'
        }
        else if (this.dna[i] === pAequor.dna[i]) {
          comparisonNum += 1;
        }
      }
      console.log(comparisonNum);
      let percentage = ((comparisonNum / 15) * 100).toFixed(2);
      return `Specimen 1 and 2 have ${percentage}% DNA in common.`
    },
    willLikelySurvive() {
      let survivalCount = 0;
      let survivalPercent;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          survivalCount += 1;
        }
      }
      survivalPercent = (survivalCount / this.dna.length) * 100 / 100;
      if (survivalPercent >= 60 / 100) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}

//creating 30 pAequor that will likely survive
const survivors = [];
let pAequorNum = 1;
while (survivors.length < 30) {
  let newRandPAequor = pAequorFactory(pAequorNum, mockUpStrand());
  if (newRandPAequor.willLikelySurvive() === true) {
    survivors.push(newRandPAequor);
  }
  pAequorNum++;
}

console.log(survivors);