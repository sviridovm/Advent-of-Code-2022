class Range {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

     fullOverlap(range) {
        if(range.min >= this.min && range.max <= this.max) {
            return true;
        }
        return false;
    }

        partialOverlap(range) {
            let minOverlap = this.min <= range.min && this.max >= range.min;
            let maxOverlap = this.min <= range.max && this.max >= range.max;
            if(minOverlap || maxOverlap) {
                return true;
            }
            return false;
        }
}





module.exports = Range;