const helpers = {
    ifRecorded: function(status, options) {
        if (status == 'recorded') {
            return options.fn(this)
        }
        return options.inverse(this)
    },

    ifUnrecorded: function(status, options) {
        if (status == 'unrecorded') {
            return options.fn(this)
        }
        return options.inverse(this)
    },

    thresholdJudge: function(value, max, min, options) {
        if (value >= min && value <= max) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    },
    ifMissing: function(status, options) {
        if (status == 0) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    },
    checkBadge: function(eRate, options) {
        if (eRate >= 0.8) {
            return options.fn(this);

        }
        return options.inverse(this);
    },
}




module.exports.helpers = helpers