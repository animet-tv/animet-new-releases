const axios = require("axios");
const HelperService = require('./helper-service');
const OldMessage = require('./models/messages.model');
const BotController = require('./bot-controller');
const { delay } = require("bluebird");

const COOLDOWN_RATE = 2500;
let checkRecentlyAddedForNewReleases = async() => {
    try {
        let result;
        HelperService.fetchRecentlyAdded(async(err, recentlyAdded) => {
            if (err) {
                console.log(err);
            } 

            if (recentlyAdded) {
                OldMessage.getOldMessage((err, oldMessage) => {
                    if (err) {
                        res.sendStatus(404);
                        throw err;
                    }


                    if (oldMessage && oldMessage.length > 0) {
                        _oldMessage = oldMessage[0].messages;
                        _recentlyAdded = recentlyAdded;
                        result = _oldMessage.filter(o1 => !_recentlyAdded.some(o2 => o1.id === o2.id));

                        
                        var onlyInA = _oldMessage.filter(comparer(_recentlyAdded));
                        var onlyInB = _recentlyAdded.filter(comparer(_oldMessage));
                        
                        result = onlyInA.concat(onlyInB);
                        
                        let sendNewMessages = (async(result) => {
                            // send messages by cooldown
                            for (let i = 0; i < result.length; i++) {
                                BotController.sendMessage(result[i]);
                                // wait so messages don't get spammed and so it doest get rate limited
                                await delay(COOLDOWN_RATE);
                            }
                        })
                        
                        if (result.length > 0) {
                            BotController.sendMessageReleaseAlert();
                            sendNewMessages(result);
    
                            // delete old message 
                            OldMessage.deleteMany({}, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                                console.log('deleted OldMessage');
                            })
    
                            // append new concat old message 
                            let newOldMessage = new OldMessage ({
                                messages: _oldMessage.concat(_recentlyAdded)
                            });
                            newOldMessage.save();
                            console.log('saved new OldMessage');
                        } else {
                            console.log('no new titles detected');
                        }
                    } else {
                        console.log('OldMessage collection empty');
                        let newRecentlyAddedArray = [];
                        recentlyAdded.forEach(el => {
                            newRecentlyAddedArray.push({
                                title: el.title,
                                id: el.id,
                                episodeNumber: el.episodeNumber,
                                img_url: el.img_url
                            });
                        });

                        let newOldMessage = new OldMessage({
                            messages: newRecentlyAddedArray
                        });

                        newOldMessage.save();
                    }
                })  
            }
        });

    } catch (error) {
        console.log(error);
    }
}

function comparer(otherArray){
    return function(current){
      return otherArray.filter(function(other){
        return other.value == current.value && other.display == current.display
      }).length == 0;
    }
  }
  

module.exports = {
    checkRecentlyAddedForNewReleases,
}