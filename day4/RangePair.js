const Range = require('./Range');

class RangePair {

    
    constructor(range1, range2) {
        this.range1 = range1;
        this.range2 = range2;
        
    }

    fullOverlap() {
        let firstRangeOverlap = this.range1.fullOverlap(this.range2);
        let secondRangeOverlap = this.range2.fullOverlap(this.range1);
        if(firstRangeOverlap || secondRangeOverlap) {
            return true;
        }
        return false;
    }

    partialOverlap() {
        let firstRangeOverlap = this.range1.partialOverlap(this.range2);
        let secondRangeOverlap = this.range2.partialOverlap(this.range1);
        if(firstRangeOverlap || secondRangeOverlap) {
            return true;
        }
        return false;
    }

}

module.exports = RangePair;
