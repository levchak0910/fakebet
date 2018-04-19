const _ = require("lodash");
const mongoose = require("libs/mongo");

const BetSlipSchema = new mongoose.Schema({
    bookie: {name: String, coefficient: String},
    dateNum: Number,
    date: String,
    guest: String,
    home: String,
    league: String,
    type: String,
    score: String
});

const BetSchema = new mongoose.Schema({
    rate: Number,
    userId: mongoose.Schema.Types.ObjectId,
    bets: [BetSlipSchema]
}, {
    timestamps: true,
    versionKey: false,
    strict: false
});

BetSchema.methods.getData = function() {
    let {rate, bets, _id, createdAt} = this;
    // todo del _id from bets
    return {rate, bets, _id, createdAt};
};

module.exports = mongoose.model("Bet", BetSchema);